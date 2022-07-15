const { Market } = require('../../models/MarketAndBranch/Market');
const { Discount } = require('../../models/Sales/Discount');
const { SaleConnector } = require('../../models/Sales/SaleConnector');
const { SaleProduct } = require('../../models/Sales/SaleProduct');

module.exports.getProfitData = async (req, res) => {
  try {
    const { market, startDate, endDate } = req.body;

    const saleconnectors = await SaleConnector.find({
      market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .select('payments products discounts createdAt id')
      .populate('discounts', 'discount discountuzs')
      .populate({
        path: 'products',
        select:
          'totalprice unitprice totalpriceuzs unitpriceuzs pieces createdAt discount price',
        populate: {
          path: 'price',
          select: 'incomingprice',
        },
      });

    let profitData = [];

    saleconnectors.map((item) => {
      let obj = {
        id: item.id,
        createdAt: item.createdAt,
        totalincomingprice: item.products.reduce((prev, product) => {
          return (
            prev +
            (product.price ? product.price.incomingprice : 0) * product.pieces
          );
        }, 0),
        totalsellingprice: item.products.reduce((prev, product) => {
          return prev + product.totalprice;
        }, 0),
        discount: item.discounts.reduce((prev, discount) => {
          return prev + discount.discount;
        }, 0),
      };

      profitData.push({
        ...obj,
        profit: obj.totalsellingprice - obj.totalincomingprice - obj.discount,
      });
    });

    res.status(201).json({
      count: profitData.length,
      profitData,
    });
  } catch (error) {
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};
