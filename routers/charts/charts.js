const { Market } = require('../../models/MarketAndBranch/Market');
const { Incoming } = require('../../models/Products/Incoming');
const { SaleProduct } = require('../../models/Sales/SaleProduct');

module.exports.getIncomingData = async (req, res) => {
  try {
    const { market } = req.body;

    const marke = await Market.findById(market);

    if (!marke) {
      return res
        .status(401)
        .json({ message: "Diqqat! Do'kon ma'lumotlari topilmadi." });
    }

    const startDate = new Date(
      new Date(new Date(new Date().setMonth(0)).setDate(1)).setHours(3, 0, 0, 0)
    );
    const currenDate = new Date();

    const incomings = await Incoming.find({
      market,
      createdAt: {
        $gte: startDate,
        $lte: currenDate,
      },
    }).select('totalprice market createdAt');

    res.status(201).json(incomings);
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getSellingData = async (req, res) => {
  try {
    const { market } = req.body;

    const marke = await Market.findById(market);

    if (!marke) {
      return res
        .status(401)
        .json({ message: "Diqqat! Do'kon ma'lumotlari topilmadi." });
    }

    const startDate = new Date(
      new Date(new Date(new Date().setMonth(0)).setDate(1)).setHours(3, 0, 0, 0)
    );
    const currenDate = new Date();

    const selling = await SaleProduct.find({
      market,
      createdAt: {
        $gte: startDate,
        $lte: currenDate,
      },
    }).select('totalprice market createdAt');

    res.status(201).json(selling);
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};
