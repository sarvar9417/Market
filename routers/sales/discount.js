const { Market } = require('../../models/MarketAndBranch/Market');
const { Discount } = require('../../models/Sales/Discount');
const { SaleConnector } = require('../../models/Sales/SaleConnector');
const { Client } = require('../../models/Sales/Client');

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

    const client = new RegExp(
      '.*' + search ? search.clientname : '' + '.*',
      'i'
    );

    const count = await Discount.find({
      market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    }).count();

    const discounts = await Discount.find({
      market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .select('-isArchive -updatedAt -user -market -__v -products')
      .sort({ _id: -1 })
      .populate({
        path: 'saleconnector',
        select: 'client',
        populate: {
          path: 'client',
          select: 'name',
          match: { name: client },
        },
      });

    const discount = discounts.reduce((summ, discount) => {
      return summ + discount.discount;
    }, 0);

    const discountuzs = discounts.reduce((summ, discount) => {
      return summ + discount.discountuzs;
    }, 0);

    const totalprice = discounts.reduce((summ, discount) => {
      return summ + discount.totalprice;
    }, 0);

    const totalpriceuzs = discounts.reduce((summ, discount) => {
      return summ + discount.totalpriceuzs;
    }, 0);

    res
      .status(200)
      .send({
        discounts,
        count,
        total: { discount, discountuzs, totalprice, totalpriceuzs },
      });
  } catch (error) {
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

    const client = new RegExp(
      '.*' + search ? search.clientname : '' + '.*',
      'i'
    );

    const discounts = await Discount.find({
      market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .select('-isArchive -updatedAt -user -market -__v -products')
      .sort({ _id: -1 })
      .populate({
        path: 'saleconnector',
        select: 'client',
        populate: {
          path: 'client',
          select: 'name',
          match: { name: client },
        },
      });
    res.status(200).send(discounts);
  } catch (error) {
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};
