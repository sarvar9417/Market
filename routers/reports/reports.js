const { Market } = require('../../models/MarketAndBranch/Market');
const { Incoming } = require('../../models/Products/Incoming');
const { Product } = require('../../models/Products/Product');
const { ProductPrice } = require('../../models/Products/ProductPrice');
const { Debt } = require('../../models/Sales/Debt');
const { Discount } = require('../../models/Sales/Discount');
const { Payment } = require('../../models/Sales/Payment');
const { SaleConnector } = require('../../models/Sales/SaleConnector');

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
    }).count();

    const payments = await Payment.find({
      market,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    }).select('market payment cash card transfer type');

    let paymentReport = {
      totalpayments: 0,
      totalcash: 0,
      totalcard: 0,
      totaltransfer: 0,
      paymentcount: 0,
      cashcount: 0,
      cardcount: 0,
      transfercount: 0,
    };
    payments.map((payment) => {
      payment.cash > 0 && paymentReport.cashcount++;
      payment.card > 0 && paymentReport.cardcount++;
      payment.transfer > 0 && paymentReport.transfercount++;
      paymentReport.paymentcount += 1;
      paymentReport.totalpayments += payment.payment;
      paymentReport.totalcash += payment.cash;
      paymentReport.totalcard += payment.card;
      paymentReport.totaltransfer += payment.transfer;
    });

    res.status(201).json({ ...paymentReport, salescount: sales });
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

    const products = await Product.find({ market }).select('total market');
    const totalproducts = products.reduce((prev, product) => {
      return prev + product.total;
    }, 0);

    const productsprice = await ProductPrice.find({ market }).select(
      'incomingprice'
    );
    const totalprice = productsprice.reduce((prev, price) => {
      return prev + price.incomingprice;
    }, 0);

    res
      .status(201)
      .json({ productscount: products.length, totalproducts, totalprice });
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

    const debts = await Debt.find({
      market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    }).select('-isArchive -updatedAt -user -market -__v -products');

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
      reports.debttotal += debt.debt;
      reports.debtcount += 1;
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
