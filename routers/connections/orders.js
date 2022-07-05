const { Market } = require('../../models/MarketAndBranch/Market');
const { ProductData } = require('../../models/Products/Productdata');
const { ProductPrice } = require('../../models/Products/ProductPrice');
const { Unit } = require('../../models/Products/Unit');
const { OrderConnector } = require('../../models/Orders/OrderConnector');
const { OrderProduct } = require('../../models/Orders/OrderProduct');
const { Product } = require('../../models/Products/Product');

module.exports.register = async (req, res) => {
  try {
    const { orders, market, startDate, endDate } = req.body;
    const marke = await Market.findById(market);

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }

    const id = await OrderConnector.find({
      customermarket: market,
    }).count();

    const newOrderConnector = new OrderConnector({
      id: id + 1,
      position: 'sending',
      customermarket: market,
      receivermarket: marke.mainmarket,
    });

    await newOrderConnector.save();

    let products = [];
    let totalprice = 0;
    for (const order of orders) {
      const newOrderProduct = new OrderProduct({
        ...order,
        connector: newOrderConnector._id,
      });

      await newOrderProduct.save();
      products.push(newOrderProduct._id);
      totalprice += order.orderpieces * order.price.incomingprice;
    }

    newOrderConnector.products = products;
    newOrderConnector.totalprice = totalprice;

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

module.exports.getordersmarket = async (req, res) => {
  try {
    const { market, startDate, endDate } = req.body;
    const marke = await Market.findById(market);

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }
    const orderConnectors = await OrderConnector.find({
      receivermarket: market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .sort({ _id: -1 })
      .select(
        'products totalprice id position createdAt customermarket receivermarket'
      )
      .populate('customermarket', 'mainmarket name');

    res.status(201).send(orderConnectors);
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getorderproducts = async (req, res) => {
  try {
    const { orderConnector, countPage, currentPage, search, market } = req.body;
    const marke = await Market.findById(market);

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }

    const productcode = new RegExp(
      '.*' + search ? search.code : '' + '.*',
      'i'
    );
    const productname = new RegExp(
      '.*' + search ? search.name : '' + '.*',
      'i'
    );
    const allproducts = await OrderProduct.find({
      customermarket: market,
      connector: orderConnector,
    })
      .sort({ _id: -1 })
      .select('product orderpieces productdata price unit')
      .populate({
        path: 'productdata',
        select: 'name code',
        match: { name: productname, code: productcode },
      })
      .populate('price', 'incomingprice')
      .populate('unit', 'name');

    let filter = allproducts.filter((product) => {
      return product.productdata !== null;
    });

    const count = filter.length;
    filter = filter.splice(currentPage * countPage, countPage);

    res.status(201).json({
      orders: filter,
      count,
    });
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getorderproductsmarket = async (req, res) => {
  try {
    const { orderConnector, countPage, currentPage, search, market } = req.body;
    const marke = await Market.findById(market);
    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }

    const productcode = new RegExp(
      '.*' + search ? search.code : '' + '.*',
      'i'
    );
    const productname = new RegExp(
      '.*' + search ? search.name : '' + '.*',
      'i'
    );
    const allproducts = await OrderProduct.find({
      receivermarket: market,
      connector: orderConnector,
    })
      .sort({ _id: -1 })
      .select(
        'product orderpieces productdata price unit sendingpieces incomingpieces returnpieces incomingprice'
      )
      .populate({
        path: 'productdata',
        select: 'name code',
        match: { name: productname, code: productcode },
      })
      .populate('price', 'incomingprice')
      .populate('unit', 'name')
      .populate('product', 'total');

    let filter = allproducts.filter((product) => {
      return product.productdata !== null;
    });

    const count = filter.length;
    filter = filter.splice(currentPage * countPage, countPage);

    const orderConnecto = await OrderConnector.findById(orderConnector);
    res.status(201).json({
      orders: filter,
      count,
      position: orderConnecto.position,
    });
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.updateorderproductsmarket = async (req, res) => {
  try {
    const { orderConnector, countPage, currentPage, search, market, order } =
      req.body;
    const marke = await Market.findById(market);
    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }

    await OrderProduct.findByIdAndUpdate(order._id, { ...order });
    const productcode = new RegExp(
      '.*' + search ? search.code : '' + '.*',
      'i'
    );
    const productname = new RegExp(
      '.*' + search ? search.name : '' + '.*',
      'i'
    );
    const allproducts = await OrderProduct.find({
      receivermarket: market,
      connector: orderConnector,
    })
      .sort({ _id: -1 })
      .select(
        'product orderpieces productdata price unit sendingpieces incomingpieces returnpieces incomingprice'
      )
      .populate({
        path: 'productdata',
        select: 'name code',
        match: { name: productname, code: productcode },
      })
      .populate('price', 'incomingprice')
      .populate('unit', 'name')
      .populate('product', 'total');

    let filter = allproducts.filter((product) => {
      return product.productdata !== null;
    });

    const count = filter.length;
    filter = filter.splice(currentPage * countPage, countPage);

    const orderConnecto = await OrderConnector.findById(orderConnector);
    res.status(201).json({
      orders: filter,
      count,
      position: orderConnecto.position,
    });
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.updateordersconnector = async (req, res) => {
  try {
    const { startDate, endDate, orderConnector, position, market } = req.body;
    const marke = await Market.findById(market);

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }

    await OrderConnector.findByIdAndUpdate(orderConnector, {
      position,
    });

    const orderConnectors = await OrderConnector.find({
      receivermarket: market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .sort({ _id: -1 })
      .select(
        'products totalprice id position createdAt customermarket receivermarket'
      )
      .populate('customermarket', 'mainmarket name');

    res.status(201).send({ orders: orderConnectors, position });
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};
