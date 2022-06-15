const { Market } = require('../../models/MarketAndBranch/Market');
const { Incoming } = require('../../models/Products/Incoming');
const { Product } = require('../../models/Products/Product');
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
    }).select('market payment cash card transfer');

    const paymentReport = payments.reduce(
      (prev, item) => {
        return {
          ...prev,
          totalpayments: prev.totalpayments + item.payment,
          totalcash: prev.totalcash + item.cash,
          totalcard: prev.totalcard + item.card,
          totaltransfer: prev.totaltransfer + item.transfer,
        };
      },
      {
        totalpayments: 0,
        totalcash: 0,
        totalcard: 0,
        totaltransfer: 0,
        salescount: sales,
      }
    );

    res.status(201).json(paymentReport);
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

    const products = await Product.find({
      market,
    })
    .select('total price')
    .populate('price', 'incomingprice')
    
    const productsReport = products.reduce(
      (prev, item) => {
        return {
          ...prev,
          totalproducts: prev.totalproducts + item.total,
          totalprice: prev.totalprice + item.price.incomingprice,
        };
      },
      {
        productscount: products.length,
        totalproducts: 0,
        totalprice: 0,
      }
    );
    res.status(201).json(productsReport);
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

module.exports.getMarketImg = async (req, res) => {
  try {
    const { market } = req.body;

    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(401)
        .json({ message: `Diqqat! Do'kon haqida malumotlar topilmadi!` });
    }

    res.status(201).json(marke.image);
  } catch (error) {
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};
