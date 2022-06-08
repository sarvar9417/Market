const { Market } = require('../../models/MarketAndBranch/Market');
const { Debt } = require('../../models/Sales/Debt');
const { SaleConnector } = require('../../models/Sales/SaleConnector');
const { Client } = require('../../models/Sales/Client');
const { SaleProduct } = require('../../models/Sales/SaleProduct');
const { Discount } = require('../../models/Sales/Discount');
const { Payment } = require('../../models/Sales/Payment');

module.exports.get = async (req, res) => {
  try {
    const { market, search, startDate, endDate, currentPage, countPage } =
      req.body;

    const marke = await Market.findById(market);
    if (!marke) {
      return res.status(400).json({
        message: `Diqqat! Do'kon haqida malumotlar topilmadi!`,
      });
    }

    const debts = await SaleConnector.find({
      market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .select(
        '-isArchive -updatedAt -user -market -__v -debts -dailyconnectors'
      )
      .sort({ _id: -1 })
      .populate('products', 'totalprice')
      .populate('payments', 'payment paymentuzs')
      .populate('discounts', 'discount discountuzs')
      .populate('client', 'name');

    const alldebts = [];

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
        Math.round(totalprice * 100) / 100 -
        Math.round(payments * 100) / 100 -
        Math.round(discounts * 100) / 100;

      if (d !== 0) {
        debt.debt = Math.round(d * 100) / 100;
        alldebts.push({
          _id: debt._id,
          id: debt.id,
          client: debt.client,
          createdAt: debt.createdAt,
          debt: Math.round(d * 100) / 100,
        });
      }
    });
    const count = alldebts.length;
    res.status(200).send({
      debts: alldebts.splice(countPage * currentPage, countPage),
      count,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getexcel = async (req, res) => {
  try {
    const { market, search, startDate, endDate } = req.body;
    const marke = await Market.findById(market);
    if (!marke) {
      return res.status(400).json({
        message: `Diqqat! Do'kon haqida malumotlar topilmadi!`,
      });
    }

    const debts = await SaleConnector.find({
      market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .select(
        '-isArchive -updatedAt -user -market -__v -debts -dailyconnectors'
      )
      .sort({ _id: -1 })
      .populate('products', 'totalprice')
      .populate('payments', 'payment paymentuzs')
      .populate('discounts', 'discount discountuzs')
      .populate('client', 'name');

    const alldebts = [];

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
        Math.round(totalprice * 100) / 100 -
        Math.round(payments * 100) / 100 -
        Math.round(discounts * 100) / 100;

      if (d !== 0) {
        debt.debt = Math.round(d * 100) / 100;
        alldebts.push({
          _id: debt._id,
          id: debt.id,
          client: debt.client,
          createdAt: debt.createdAt,
          debt: Math.round(d * 100) / 100,
        });
      }
    });

    res.status(200).send(alldebts);
  } catch (error) {
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};
