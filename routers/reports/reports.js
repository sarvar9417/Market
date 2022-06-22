const { Market } = require('../../models/MarketAndBranch/Market');
const { Incoming } = require('../../models/Products/Incoming');
const { Product } = require('../../models/Products/Product');
const { ProductData } = require('../../models/Products/Productdata');
const { ProductPrice } = require('../../models/Products/ProductPrice');
const { Debt } = require('../../models/Sales/Debt');
const { Discount } = require('../../models/Sales/Discount');
const { Payment } = require('../../models/Sales/Payment');
const { SaleConnector } = require('../../models/Sales/SaleConnector');
const { SaleProduct } = require('../../models/Sales/SaleProduct');

module.exports.getSalesReport = async (req, res) => {
  try {
    const { market, startDate, endDate } = req.body;

    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(401)
        .json({ message: `Diqqat! Do'kon haqida malumotlar topilmadi!` });
    }

    const sales = await SaleConnector.find({
      market,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .select(
        '-isArchive -updatedAt -user -market -__v -debts -dailyconnectors'
      )
      .populate('payments');

    let totalSales = {
      totalsale: 0,
      totalcash: 0,
      totalcard: 0,
      totaltransfer: 0,
      salecount: 0,
      cashcount: 0,
      cardcount: 0,
      transfercount: 0,
    };

    sales.map((sale) => {
      totalSales.salecount++;

      sale.payments.some((item) => item.cash > 0) > 0 && totalSales.cashcount++;
      sale.payments.some((item) => item.card > 0) > 0 && totalSales.cardcount++;
      sale.payments.some((item) => item.transfer > 0) > 0 &&
        totalSales.transfercount++;

      sale.payments.map((payment) => {
        totalSales.totalsale += payment.payment;
        totalSales.totalcash += payment.cash;
        totalSales.totalcard += payment.card;
        totalSales.totaltransfer += payment.transfer;
      });
    });
    res.status(201).json(totalSales);
  } catch (error) {
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getProductsReport = async (req, res) => {
  try {
    const { market } = req.body;

    const marke = await Market.findById(market);

    if (!marke) {
      return res
        .status(401)
        .json({ message: `Diqqat! Do'kon haqida malumotlar topilmadi!` });
    }

    const saleproduct = await SaleProduct.find({ market }).select(
      'product market pieces'
    );

    const incomingproduct = await Incoming.find({ market }).select(
      'product pieces market'
    );

    const productsCount = await ProductData.find({ market }).count();

    const product = await Product.find({ market })
      .select('total market price')
      .populate('price', 'incomingprice sellingprice');

    let salesprodcutspieces = 0;
    let salesproducts = [];
    saleproduct.map((item) => {
      salesprodcutspieces += item.pieces;
      if (!salesproducts.includes(item.product.toString())) {
        salesproducts.push(item.product.toString());
      }
    });

    let incomeproducts = [];
    let incomeproductspieces = 0;
    incomingproduct.map((income) => {
      incomeproductspieces += income.pieces;
      if (!incomeproducts.includes(income.product.toString())) {
        incomeproducts.push(income.product.toString());
      }
    });

    let productstotalprice = 0;
    let productspieces = product.reduce((prev, prod) => {
      productstotalprice += prod.price.incomingprice * prod.total;
      return prev + prod.total;
    }, 0);

    res.status(201).json({
      salesproducts: salesproducts.length,
      salesprodcutspieces,
      incomeproducts: incomeproducts.length,
      incomeproductspieces,
      products: productsCount,
      productspieces,
      productstotalprice,
    });
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getIncomingsReport = async (req, res) => {
  try {
    const { market, startDate, endDate } = req.body;

    const marke = await Market.findById(market);

    if (!marke) {
      return res
        .status(401)
        .json({ message: `Diqqat! Do'kon haqida malumotlar topilmadi!` });
    }

    const incomings = await Incoming.find({
      market,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    }).select('market totalprice');

    const totalIncomingsPrice = incomings.reduce((sum, item) => {
      return sum + item.totalprice;
    }, 0);

    res
      .status(201)
      .json({ incomingsCount: incomings.length, totalIncomingsPrice });
  } catch (error) {
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getDebtAndDiscountReports = async (req, res) => {
  try {
    const { market, startDate, endDate } = req.body;

    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(401)
        .json({ message: `Diqqat! Do'kon haqida malumotlar topilmadi!` });
    }

    const debts = await SaleConnector.find({
      market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .select('-isArchive -updatedAt -user -__v -dailyconnectors')
      .populate('products', 'totalprice')
      .populate('payments', 'payment paymentuzs')
      .populate('discounts', 'discount discountuzs')
      .populate('client', 'name');

    const discounts = await Discount.find({
      market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    }).select('-isArchive -updatedAt -user -market -__v -products');

    const reports = {
      debtcount: 0,
      debttotal: 0,
      discountcount: 0,
      discounttotal: 0,
    };

    debts.map((debt) => {
      const totalprice = debt.products.reduce((summ, product) => {
        return summ + product.totalprice;
      }, 0);

      const discounts = debt.discounts.reduce((summ, product) => {
        return summ + product.discount;
      }, 0);

      const payments = debt.payments.reduce((summ, product) => {
        return summ + product.payment;
      }, 0);

      const d =
        Math.round(totalprice * 10000) / 10000 -
        Math.round(payments * 10000) / 10000 -
        Math.round(discounts * 10000) / 10000;

      if (d > 0.01 || d < -0.01) {
        reports.debtcount += 1;
        reports.debttotal += d;
      }
    });

    discounts.map((discount) => {
      reports.discounttotal += discount.discount;
      reports.discountcount += 1;
    });
    res.status(201).json(reports);
  } catch (error) {
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};
