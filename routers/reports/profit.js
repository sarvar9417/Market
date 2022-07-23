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
          select: 'incomingprice incomingpriceuzs',
        },
      });

    let profitData = [];

    saleconnectors.map((item) => {
      let obj = {
        id: item.id,
        createdAt: item.createdAt,
        totalincomingprice:
          Math.round(
            item.products.reduce(
              (prev, product) =>
                prev +
                (product.price ? product.price.incomingprice : 0) *
                  product.pieces,
              0
            ) * 1000
          ) / 1000,
        totalincomingpriceuzs:
          Math.round(
            item.products.reduce(
              (prev, product) =>
                prev +
                (product.price ? product.price.incomingpriceuzs : 0) *
                  product.pieces,
              0
            ) * 1
          ) / 1,
        totalsellingprice:
          Math.round(
            item.products.reduce(
              (prev, product) => prev + product.totalprice,
              0
            ) * 1000
          ) / 1000,
        totalsellingpriceuzs:
          Math.round(
            item.products.reduce(
              (prev, product) => prev + product.totalpriceuzs,
              0
            ) * 1
          ) / 1,
        discount:
          Math.round(
            item.discounts.reduce(
              (prev, discount) => prev + discount.discount,
              0
            ) * 1000
          ) / 1000,
        discountuzs:
          Math.round(
            item.discounts.reduce(
              (prev, discount) => prev + discount.discountuzs,
              0
            ) * 1
          ) / 1,
      };

      profitData.push({
        ...obj,
        profit: obj.totalsellingprice - obj.totalincomingprice - obj.discount,
        profituzs:
          obj.totalsellingpriceuzs -
          obj.totalincomingpriceuzs -
          obj.discountuzs,
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
