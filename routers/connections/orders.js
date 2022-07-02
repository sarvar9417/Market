const { Market } = require('../../models/MarketAndBranch/Market');
const { OrderConnector } = require('../../models/Orders/OrderConnector');
const { OrderProduct } = require('../../models/Orders/OrderProduct');

module.exports.register = async (req, res) => {
  try {
    const { orders, market, startDate, endDate } = req.body;
    const marke = await Market.findById(market);

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }
    let products = [];
    let totalprice = 0;
    for (const order of orders) {
      const newOrderProduct = new OrderProduct({
        ...order,
      });

      await newOrderProduct.save();
      products.push(newOrderProduct._id);
      totalprice += order.orderpieces * order.productprice.incomingprice;
    }

    const id = await OrderConnector.find({
      customermarket: market,
    }).count();

    const newOrderConnector = new OrderConnector({
      id: id + 1,
      totalprice,
      position: 'sending',
      products,
      customermarket: market,
      receivermarket: marke.mainmarket,
    });

    await newOrderConnector.save();
    const orderConnectors = await OrderConnector.find({
      customermarket: market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .sort({ _id: -1 })
      .select('products totalprice id position createdAt');

    res.status(201).send(orderConnectors);
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getorders = async (req, res) => {
  try {
    const { market, startDate, endDate } = req.body;
    const marke = await Market.findById(market);

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }

    const orderConnectors = await OrderConnector.find({
      customermarket: market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .sort({ _id: -1 })
      .select('products totalprice id position createdAt');

    res.status(201).send(orderConnectors);
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};
