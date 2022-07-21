const { Expense } = require('../../models/Expense/Expense');
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
        $lt: endDate,
      },
    })
      .select(
        '-isArchive -updatedAt -user -market -__v -debts -dailyconnectors'
      )
      .populate(
        'payments',
        'cash cashuzs card carduzs transfer transferuzs payment paymentuzs'
      )
      .populate('products', 'totalprice totalpriceuzs');

    const cashcount = sales.reduce(
      (summ, sale) =>
        summ + sale.payments.filter((payment) => payment.cash > 0).length,
      0
    );

    const cardcount = sales.reduce(
      (summ, sale) =>
        summ + sale.payments.filter((payment) => payment.card > 0).length,
      0
    );

    const transfercount = sales.reduce(
      (summ, sale) =>
        summ + sale.payments.filter((payment) => payment.transfer > 0).length,
      0
    );

    const totalsale = sales.reduce(
      (summ, sale) =>
        summ +
        sale.products.reduce((summ, product) => summ + product.totalprice, 0),
      0
    );

    const totalsaleuzs = sales.reduce(
      (summ, sale) =>
        summ +
        sale.products.reduce(
          (summ, product) => summ + product.totalpriceuzs,
          0
        ),
      0
    );

    const totalcash = sales.reduce(
      (summ, sale) =>
        summ + sale.payments.reduce((summ, payment) => summ + payment.cash, 0),
      0
    );
    const totalcashuzs = sales.reduce(
      (summ, sale) =>
        summ +
        sale.payments.reduce((summ, payment) => summ + payment.cashuzs, 0),
      0
    );
    const totalcard = sales.reduce(
      (summ, sale) =>
        summ + sale.payments.reduce((summ, payment) => summ + payment.card, 0),
      0
    );
    const totalcarduzs = sales.reduce(
      (summ, sale) =>
        summ +
        sale.payments.reduce((summ, payment) => summ + payment.carduzs, 0),
      0
    );
    const totaltransfer = sales.reduce(
      (summ, sale) =>
        summ +
        sale.payments.reduce((summ, payment) => summ + payment.transfer, 0),
      0
    );
    const totaltransferuzs = sales.reduce(
      (summ, sale) =>
        summ +
        sale.payments.reduce((summ, payment) => summ + payment.transferuzs, 0),
      0
    );

    let totalSales = {
      totalsale,
      totalcash,
      totalcard,
      totalsaleuzs,
      totalcashuzs,
      totalcarduzs,
      totaltransfer,
      totaltransferuzs,
      salecount: sales.length,
      cashcount,
      cardcount,
      transfercount,
      cashexpense: 0,
      cardexpense: 0,
      transferexpense: 0,
    };

    const expense = await Expense.find({
      market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    }).select('sum comment type market createdAt');

    expense.map((item) => {
      if (item.type === 'cash') {
        totalSales.cashexpense += item.sum;
      }
      if (item.type === 'card') {
        totalSales.cardexpense += item.sum;
      }
      if (item.type === 'transfer') {
        totalSales.transferexpense += item.sum;
      }
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

    const connectors = await SaleConnector.find({
      market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .select('-isArchive -updatedAt -user -__v -dailyconnectors')
      .populate('products', 'totalprice totalpriceuzs')
      .populate('payments', 'payment paymentuzs')
      .populate('discounts', 'discount discountuzs');

    const reports = {
      debtcount: 0,
      debttotal: 0,
      debttotaluzs: 0,
      discountcount: 0,
      discounttotal: 0,
      discounttotaluzs: 0,
    };

    connectors.map((connector) => {
      const totalprice = connector.products.reduce((summ, product) => {
        return summ + product.totalprice;
      }, 0);

      const totalpriceuzs = connector.products.reduce((summ, product) => {
        return summ + product.totalpriceuzs;
      }, 0);

      const discounts = connector.discounts.reduce((summ, product) => {
        return summ + product.discount;
      }, 0);

      reports.discounttotal += discounts;

      const discountsuzs = connector.discounts.reduce((summ, product) => {
        return summ + product.discountuzs;
      }, 0);
      reports.discounttotaluzs += Math.round(discountsuzs * 1) / 1;
      reports.discountcount += connector.discounts.length;

      const payments = connector.payments.reduce((summ, product) => {
        return summ + product.payment;
      }, 0);

      const paymentsuzs = connector.payments.reduce((summ, product) => {
        return summ + product.paymentuzs;
      }, 0);

      const d =
        Math.round(totalprice * 1000) / 1000 -
        Math.round(payments * 1000) / 1000 -
        Math.round(discounts * 1000) / 1000;

      const duzs =
        Math.round(totalpriceuzs * 1) / 1 -
        Math.round(paymentsuzs * 1) / 1 -
        Math.round(discountsuzs * 1) / 1;

      if (d > 0.01 || d < -0.01) {
        reports.debtcount += 1;
        reports.debttotal += d;
        reports.debttotaluzs += duzs;
      }
    });
    res.status(201).json(reports);
  } catch (error) {
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getNetProfit = async (req, res) => {
  try {
    const { market, startDate, endDate } = req.body;

    const marke = await Market.findById(market);
    if (!marke) {
      res
        .status(401)
        .json({ message: `Diqqat! Do'kon haqida malumotlar topilmadi!` });
    }

    const connectors = await SaleConnector.find({
      market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .select('products discounts')
      .populate({
        path: 'products',
        select: 'totalprice totalpriceuzs price pieces',
        populate: {
          path: 'price',
          select: 'incomingprice incomingpriceuzs',
        },
      })
      .populate('discounts', 'discount discountuzs');

    const totalprice = connectors.reduce(
      (summ, connector) =>
        summ +
        connector.products.reduce(
          (summ, product) => summ + product.totalprice,
          0
        ),
      0
    );

    const totalpriceuzs = connectors.reduce(
      (summ, connector) =>
        summ +
        connector.products.reduce(
          (summ, product) => summ + product.totalpriceuzs,
          0
        ),
      0
    );

    const totalincoming = connectors.reduce(
      (summ, connector) =>
        summ +
        connector.products.reduce(
          (summ, product) =>
            summ + product.price.incomingprice * product.pieces,
          0
        ),
      0
    );

    const totalincominguzs = connectors.reduce(
      (summ, connector) =>
        summ +
        connector.products.reduce(
          (summ, product) =>
            summ + product.price.incomingpriceuzs * product.pieces,
          0
        ),
      0
    );

    const discounts = connectors.reduce(
      (summ, connector) =>
        summ +
        connector.discounts.reduce(
          (summ, discount) => summ + discount.discount,
          0
        ),
      0
    );

    const discountsuzs = connectors.reduce(
      (summ, connector) =>
        summ +
        connector.discounts.reduce(
          (summ, discount) => summ + discount.discountuzs,
          0
        ),
      0
    );

    const income = {
      income:
        Math.round((totalprice - discounts - totalincoming) * 1000) / 1000,
      incomeuzs:
        Math.round((totalpriceuzs - discountsuzs - totalincominguzs) * 1) / 1,
    };
    res.status(200).send(income);
  } catch (error) {
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};
