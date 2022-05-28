const { Market } = require("../../models/MarketAndBranch/Market");
const { User } = require("../../models/Users");
const { SaleConnector } = require("../../models/Sales/SaleConnector");
const { Discount } = require("../../models/Sales/Discount");
const { Debt } = require("../../models/Sales/Debt");
const {
  validateSaleProduct,
  SaleProduct,
} = require("../../models/Sales/SaleProduct");
const { Client } = require("../../models/Sales/Client");
const { Packman } = require("../../models/Sales/Packman");
const { Payment } = require("../../models/Sales/Payment");
const { checkPayments } = require("./saleproduct/checkData");
const { Product } = require("../../models/Products/Product");
const { Category } = require("../../models/Products/Category");
const { DailySaleConnector } = require("../../models/Sales/DailySaleConnector");

module.exports.register = async (req, res) => {
  try {
    const {
      saleproducts,
      client,
      packman,
      discount,
      payment,
      debt,
      market,
      user,
    } = req.body;

    const marke = await Market.findById(market);
    if (!marke) {
      return res.status(400).json({
        message: `Diqqat! Do'kon haqida malumotlar topilmadi!`,
      });
    }

    const use = await User.findById(user);

    if (!use) {
      return res.status(400).json({
        message: `Diqqat! Avtorizatsiyadan o'tilmagan!`,
      });
    }

    const totalprice = saleproducts.reduce((summ, saleproduct) => {
      return summ + saleproduct.totalprice;
    }, 0);

    const totalpriceuzs = saleproducts.reduce((summ, saleproduct) => {
      return summ + saleproduct.totalpriceuzs;
    }, 0);

    if (checkPayments(totalprice, payment, discount, debt)) {
      return res.status(400).json({
        message: `Diqqat! To'lov hisobida xatolik yuz bergan!`,
      });
    }

    let all = [];

    // Create SaleProducts
    for (const saleproduct of saleproducts) {
      const {
        totalprice,
        unitprice,
        totalpriceuzs,
        unitpriceuzs,
        pieces,
        _id,
      } = saleproduct;
      const { error } = validateSaleProduct({
        totalprice,
        totalpriceuzs,
        unitprice,
        unitpriceuzs,
        pieces,
        product: _id,
      });

      const product = await Product.findById(_id);
      if (product.total < pieces) {
        return res.status(400).json({
          error: `Diqqat! ${product.name} mahsuloti onmborda yetarlicha mavjud emas. Qolgan mahsulot soni ${product.total} ta`,
        });
      }
      if (error) {
        return res.status(400).json({
          error: error.message,
        });
      }

      const newSaleProduct = new SaleProduct({
        totalprice,
        totalpriceuzs,
        unitprice,
        unitpriceuzs,
        pieces,
        product: _id,
        market,
        user,
      });

      all.push(newSaleProduct);
    }

    const saleconnector = new SaleConnector({
      user,
      market,
    });

    await saleconnector.save();

    const dailysaleconnector = new DailySaleConnector({
      user,
      market,
      saleconnector: saleconnector._id,
    });

    await dailysaleconnector.save();

    saleconnector.dailyconnectors.push(dailysaleconnector._id);

    let products = [];

    for (const saleproduct of all) {
      await saleproduct.save();
      products.push(saleproduct._id);

      const updateproduct = await Product.findById(saleproduct.product);
      updateproduct.total -= saleproduct.pieces;
      await updateproduct.save();
    }

    if (discount.discount > 0) {
      const newDiscount = new Discount({
        discount: discount.discount,
        discountuzs: discount.discountuzs,
        comment: discount.comment,
        procient: discount.procient,
        market,
        totalprice,
        totalpriceuzs,
        user,
        saleconnector: saleconnector._id,
        products,
      });
      await newDiscount.save();
      saleconnector.discounts.push(newDiscount._id);
      dailysaleconnector.discount = newDiscount._id;
    }

    if (debt.debt > 0) {
      const newDebt = new Debt({
        comment: debt.comment,
        debt: debt.debt,
        debtuzs: debt.debtuzs,
        totalprice,
        totalpriceuzs,
        market,
        user,
        saleconnector: saleconnector._id,
        products,
      });
      await newDebt.save();
      saleconnector.debts.push(newDebt._id);
      dailysaleconnector.debt = newDebt._id;
    }

    if (payment.totalprice > 0) {
      const newPayment = new Payment({
        payment: payment.card + payment.cash + payment.transfer,
        paymentuzs: payment.carduzs + payment.cashuzs + payment.transferuzs,
        card: payment.card,
        cash: payment.cash,
        transfer: payment.transfer,
        carduzs: payment.carduzs,
        cashuzs: payment.cashuzs,
        transferuzs: payment.transferuzs,
        type: payment.type,
        totalprice,
        totalpriceuzs,
        market,
        user,
        saleconnector: saleconnector._id,
        products,
      });
      await newPayment.save();
      saleconnector.payments.push(newPayment._id);
      dailysaleconnector.payment = newPayment._id;
    }

    if (packman) {
      saleconnector.packman = packman._id;
      dailysaleconnector.packman = packman._id;
    }

    if (client.name || client._id) {
      if (client._id) {
        saleconnector.client = client._id;
        dailysaleconnector.client = client._id;
      } else {
        const newClient = new Client({
          market,
          name: client.name,
        });
        await newClient.save();
        if (packman) {
          await Packman.findByIdAndUpdate(packman._id, {
            $push: {
              clients: newClient._id,
            },
          });
        }
        saleconnector.client = newClient._id;
        dailysaleconnector.client = newClient._id;
      }
    }

    const id = await SaleConnector.find().count();
    saleconnector.id = 1000000 + id;
    saleconnector.products = [...products];
    await saleconnector.save();

    dailysaleconnector.id = 1;
    dailysaleconnector.products = [...products];
    await dailysaleconnector.save();

    const connector = await DailySaleConnector.findById(dailysaleconnector._id)
      .select("-isArchive -updatedAt -user -market -__v")
      .populate({
        path: "products",
        select: "totalprice unitprice totalpriceuzs unitpriceuzs pieces",
        options: { sort: { created_at: -1 } },
        limit: 1,
        populate: {
          path: "product",
          select: "category name",
          populate: { path: "category", select: "code" },
        },
      })
      .populate("payment", "payment paymentuzs")
      .populate("discount", "discount discountuzs")
      .populate("debt", "debt debtuzs")
      .populate("client", "name")
      .populate("packman", "name")
      .populate("saleconnector", "id");

    res.status(201).send(connector);
  } catch (error) {
    res.status(400).json({ error: "Serverda xatolik yuz berdi..." });
  }
};

module.exports.addproducts = async (req, res) => {
  try {
    const {
      saleconnectorid,
      saleproducts,
      client,
      packman,
      discount,
      payment,
      debt,
      market,
      user,
    } = req.body;

    const marke = await Market.findById(market);
    if (!marke) {
      return res.status(400).json({
        message: `Diqqat! Do'kon haqida malumotlar topilmadi!`,
      });
    }

    const use = await User.findById(user);

    if (!use) {
      return res.status(400).json({
        message: `Diqqat! Avtorizatsiyadan o'tilmagan!`,
      });
    }

    const totalprice = saleproducts.reduce((summ, saleproduct) => {
      return summ + saleproduct.totalprice;
    }, 0);

    const totalpriceuzs = saleproducts.reduce((summ, saleproduct) => {
      return summ + saleproduct.totalpriceuzs;
    }, 0);

    if (checkPayments(totalprice, payment, discount, debt)) {
      return res.status(400).json({
        message: `Diqqat! To'lov hisobida xatolik yuz bergan!`,
      });
    }

    let all = [];

    // Create SaleProducts
    for (const saleproduct of saleproducts) {
      const {
        totalprice,
        unitprice,
        totalpriceuzs,
        unitpriceuzs,
        pieces,
        _id,
      } = saleproduct;
      const { error } = validateSaleProduct({
        totalprice,
        totalpriceuzs,
        unitprice,
        unitpriceuzs,
        pieces,
        product: _id,
      });

      const product = await Product.findById(_id);
      if (product.total < pieces) {
        return res.status(400).json({
          error: `Diqqat! ${product.name} mahsuloti onmborda yetarlicha mavjud emas. Qolgan mahsulot soni ${product.total} ta`,
        });
      }
      if (error) {
        return res.status(400).json({
          error: error.message,
        });
      }

      const newSaleProduct = new SaleProduct({
        totalprice,
        totalpriceuzs,
        unitprice,
        unitpriceuzs,
        pieces,
        product: _id,
        market,
        user,
      });

      all.push(newSaleProduct);
    }

    const saleconnector = await SaleConnector.findById(saleconnectorid);

    const dailysaleconnector = new DailySaleConnector({
      user,
      market,
      saleconnector: saleconnector._id,
    });

    await dailysaleconnector.save();

    saleconnector.dailyconnectors.push(dailysaleconnector._id);

    let products = [];

    for (const saleproduct of all) {
      await saleproduct.save();
      products.push(saleproduct._id);

      const updateproduct = await Product.findById(saleproduct.product);
      updateproduct.total -= saleproduct.pieces;
      await updateproduct.save();
    }

    if (discount.discount > 0) {
      const newDiscount = new Discount({
        discount: discount.discount,
        discountuzs: discount.discountuzs,
        comment: discount.comment,
        procient: discount.procient,
        market,
        totalprice,
        totalpriceuzs,
        user,
        saleconnector: saleconnector._id,
        products,
      });
      await newDiscount.save();
      saleconnector.discounts.push(newDiscount._id);
      dailysaleconnector.discount = newDiscount._id;
    }

    if (debt.debt > 0) {
      const newDebt = new Debt({
        comment: debt.comment,
        debt: debt.debt,
        debtuzs: debt.debtuzs,
        totalprice,
        totalpriceuzs,
        market,
        user,
        saleconnector: saleconnector._id,
        products,
      });
      await newDebt.save();
      saleconnector.debts.push(newDebt._id);
      dailysaleconnector.debt = newDebt._id;
    }

    if (payment.totalprice > 0) {
      const newPayment = new Payment({
        payment: payment.card + payment.cash + payment.transfer,
        paymentuzs: payment.carduzs + payment.cashuzs + payment.transferuzs,
        card: payment.card,
        cash: payment.cash,
        transfer: payment.transfer,
        carduzs: payment.carduzs,
        cashuzs: payment.cashuzs,
        transferuzs: payment.transferuzs,
        type: payment.type,
        totalprice,
        totalpriceuzs,
        market,
        user,
        saleconnector: saleconnector._id,
        products,
      });
      await newPayment.save();
      saleconnector.payments.push(newPayment._id);
      dailysaleconnector.payment = newPayment._id;
    }

    if (packman) {
      saleconnector.packman = packman._id;
      dailysaleconnector.packman = packman._id;
    }

    if (client.name || client._id) {
      if (client._id) {
        saleconnector.client = client._id;
        dailysaleconnector.client = client._id;
      } else {
        const newClient = new Client({
          market,
          name: client.name,
        });
        await newClient.save();
        if (packman) {
          await Packman.findByIdAndUpdate(packman._id, {
            $push: {
              clients: newClient._id,
            },
          });
        }
        saleconnector.client = newClient._id;
        dailysaleconnector.client = newClient._id;
      }
    }

    saleconnector.products.push([...products]);
    await saleconnector.save();

    dailysaleconnector.id = saleconnector.dailyconnectors.length;
    dailysaleconnector.products = [...products];
    await dailysaleconnector.save();

    const connector = await DailySaleConnector.findById(dailysaleconnector._id)
      .select("-isArchive -updatedAt -user -market -__v")
      .populate({
        path: "products",
        select: "totalprice unitprice totalpriceuzs unitpriceuzs pieces",
        options: { sort: { created_at: -1 } },
        limit: 1,
        populate: {
          path: "product",
          select: "category name",
          populate: { path: "category", select: "code" },
        },
      })
      .populate("payment", "payment paymentuzs")
      .populate("discount", "discount discountuzs")
      .populate("debt", "debt debtuzs")
      .populate("client", "name")
      .populate("packman", "name")
      .populate("saleconnector", "id");

    res.status(201).send(connector);
  } catch (error) {
    res.status(400).json({ error: "Serverda xatolik yuz berdi..." });
  }
};

module.exports.check = async (req, res) => {
  try {
    const { market } = req.body;

    const marke = await Market.findById(market);
    if (!marke) {
      return res.status(400).json({
        message: `Diqqat! Do'kon haqida malumotlar topilmadi!`,
      });
    }
    const count = await SaleConnector.find().count();
    res.status(200).send({ count });
  } catch (error) {
    res.status(400).json({ error: "Serverda xatolik yuz berdi..." });
  }
};

module.exports.getsaleconnectors = async (req, res) => {
  try {
    const { market, countPage, currentPage } = req.body;

    const marke = await Market.findById(market);
    if (!marke) {
      return res.status(400).json({
        message: `Diqqat! Do'kon haqida malumotlar topilmadi!`,
      });
    }
    const saleconnectors = await SaleConnector.find()
      .select("-isArchive -updatedAt -user -market -__v")
      .sort({ _id: -1 })
      .skip(currentPage * countPage)
      .limit(countPage)
      .populate({
        path: "products",
        select:
          "totalprice unitprice totalpriceuzs unitpriceuzs pieces createdAt",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "product",
          select: "category name",
          populate: { path: "category", select: "code" },
        },
      })
      .populate("payments", "payment paymentuzs")
      .populate("discounts", "discount discountuzs procient")
      .populate("debts", "debt debtuzs")
      .populate("client", "name")
      .populate("packman", "name");

    res.status(200).send(saleconnectors);
  } catch (error) {
    res.status(400).json({ error: "Serverda xatolik yuz berdi..." });
  }
};
