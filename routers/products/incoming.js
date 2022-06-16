const {
  Incoming,
  validateIncoming,
  validateIncomingAll,
} = require('../../models/Products/Incoming');
const { Market } = require('../../models/MarketAndBranch/Market');
const { ProductType } = require('../../models/Products/ProductType');
const { Category } = require('../../models/Products/Category');
const { Unit } = require('../../models/Products/Unit');
const { Product } = require('../../models/Products//Product');
const { Brand } = require('../../models/Products/Brand');
const {
  IncomingConnector,
} = require('../../models/Products/IncomingConnector');
const { ProductPrice } = require('../../models/Products/ProductPrice');
const { Supplier } = require('../../models/Supplier/Supplier');
const router = require('./category_products');
const ObjectId = require('mongodb').ObjectId;
//Incoming registerall
module.exports.registerAll = async (req, res) => {
  try {
    const { market, startDate, endDate, products, user } = req.body;
    const all = [];
    for (const newproduct of products) {
      delete newproduct.oldprice;
      const { error } = validateIncomingAll(newproduct);
      if (error) {
        return res.status(400).json({
          error: error.message,
        });
      }

      const { product, unit, supplier, pieces, unitprice, totalprice } =
        newproduct;

      const marke = await Market.findById(market);

      if (!marke) {
        return res.status(400).json({
          message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
        });
      }

      const produc = await Product.findById(product._id);

      if (!produc) {
        return res.status(400).json({
          message: `Diqqat! ${product.code} kodli mahsulot avval yaratilmagan.`,
        });
      }

      const unitt = await Unit.findById(unit._id);

      if (!unitt) {
        return res.status(400).json({
          message: `Diqqat! ${unit.name} o'lchov birligi tizimda mavjud emas.`,
        });
      }

      const newProduct = new Incoming({
        product: product._id,
        supplier: supplier._id,
        unit: unit._id,
        pieces,
        unitprice: Math.round(unitprice * 100) / 100,
        totalprice: Math.round(totalprice * 100) / 100,
        unit: unit._id,
        market,
        user,
      });

      all.push(newProduct);
    }

    let p = [];
    let t = 0;

    const newIncomingConnector = new IncomingConnector({
      supplier: products[0].supplier._id,
      market,
      user,
    });

    await newIncomingConnector.save();

    for (const product of all) {
      await product.save();
      const produc = await Product.findById(product.product);
      produc.total = produc.total + product.pieces;
      await produc.save();

      const productprice = await ProductPrice.find({
        product: produc._id,
      });
      const price =
        productprice.length > 0 &&
        productprice[productprice.length - 1].sellingprice
          ? Math.round(
              productprice[productprice.length - 1].sellingprice * 100
            ) / 100
          : 0;
      const newProductPrice = new ProductPrice({
        // procient: productprice.procient,
        product: product.product,
        incomingprice: Math.round(product.unitprice * 100) / 100,
        sellingprice: price,
        market,
      });

      await newProductPrice.save();
      product.incomingconnector = newIncomingConnector._id;
      await product.save();
      produc.price = newProductPrice._id;
      await produc.save();
      p.push(product._id);
      t += Math.round(product.totalprice * 100) / 100;
    }

    (newIncomingConnector.total = t), (newIncomingConnector.incoming = p);

    await newIncomingConnector.save();

    const connectors = await IncomingConnector.find({
      market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .sort({ _id: -1 })
      .select('supplier incoming total createdAt')
      .populate('supplier', 'name')
      .populate('incoming', 'pieces');

    res.status(201).send(connectors);
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

//Incoming register
module.exports.register = async (req, res) => {
  try {
    const { error } = validateIncoming(req.body);
    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
    const {
      totalprice,
      unitprice,
      pieces,
      product,
      category,
      unit,
      supplier,
      user,
      file,
      market,
    } = req.body;

    const marke = await Market.findById(market);

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }

    const newIncoming = new Incoming({
      totalprice,
      unitprice,
      pieces,
      product,
      category,
      unit,
      supplier,
      user,
      file,
      market,
    });
    await newIncoming.save();

    const produc = await Product.findById(product);

    produc.total += parseInt(pieces);
    produc.incomingprice = Math.round(unitprice * 100) / 100;
    await produc.save();

    res.send(newIncoming);
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

//Incoming update
module.exports.update = async (req, res) => {
  try {
    const { market, startDate, endDate, product } = req.body;
    const marke = await Market.findById(market);
    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }

    const old = await Incoming.findById(product._id);

    if (!old) {
      return res.status(400).json({
        message: "Diqqat! Ushbu kirim mahsuloti tizimda ro'yxatga olinmagan.",
      });
    }

    const incomingconnector = await IncomingConnector.findById(
      product.incomingconnector
    );

    incomingconnector.total = incomingconnector.total - old.totalprice;
    incomingconnector.total = incomingconnector.total + product.totalprice;

    await incomingconnector.save();

    const produc = await Product.findById(product.product._id);

    produc.total -= old.pieces;
    produc.total += product.pieces;
    await produc.save();

    const update = await Incoming.findByIdAndUpdate(product._id, {
      ...product,
    });

    const connectors = await IncomingConnector.find({
      market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .sort({ _id: -1 })
      .select('supplier incoming total createdAt')
      .populate('supplier', 'name')
      .populate('incoming', 'pieces');

    res.status(201).send(connectors);
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const { market, startDate, endDate, product } = req.body;
    const marke = await Market.findById(market);
    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }

    const old = await Incoming.findById(product._id);

    if (!old) {
      return res.status(400).json({
        message: "Diqqat! Ushbu kirim mahsuloti tizimda ro'yxatga olinmagan.",
      });
    }

    if (product.incomingconnector) {
      const incomingconnector = await IncomingConnector.findById(
        product.incomingconnector
      );

      incomingconnector.total = incomingconnector.total - product.totalprice;

      await incomingconnector.save();

      await IncomingConnector.findByIdAndUpdate(product.incomingconnector, {
        $pull: {
          incoming: new ObjectId(product._id),
        },
      });
    } else {
      const incomingconnectors = await IncomingConnector.find().populate({
        path: 'incoming',
        match: { _id: product._id },
        select: '_id',
      });
      incomingconnectors.forEach(async (connector) => {
        if (connector.incoming.length > 0) {
          const incomingconnector = await IncomingConnector.findById(
            connector._id
          );

          incomingconnector.total =
            incomingconnector.total - product.totalprice;

          await incomingconnector.save();

          await IncomingConnector.findByIdAndUpdate(connector._id, {
            $pull: {
              incoming: new ObjectId(product._id),
            },
          });
        }
      });
    }

    const produc = await Product.findById(product.product._id);

    produc.total -= old.pieces;
    await produc.save();

    await Incoming.findByIdAndDelete(product._id);
    const connectors = await IncomingConnector.find({
      market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .sort({ _id: -1 })
      .select('supplier incoming total createdAt')
      .populate('supplier', 'name')
      .populate('incoming', 'pieces');

    res.status(201).send(connectors);
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

//Incoming getall
module.exports.get = async (req, res) => {
  try {
    const { market, beginDay, endDay, currentPage, countPage } = req.body;
    const marke = await Market.findById(market);
    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }

    const count = await Incoming.find({
      market,
      createdAt: {
        $gte: beginDay,
        $lt: endDay,
      },
    }).count();

    const incomings = await Incoming.find({
      market,
      createdAt: {
        $gte: beginDay,
        $lt: endDay,
      },
    })
      .sort({ _id: -1 })
      .select('-isArchive -updatedAt -market -user -__v')
      .populate('supplier', 'name')
      .populate('product', 'name code')
      .populate('unit', 'name')
      .skip(currentPage * countPage)
      .limit(countPage);
    res.status(201).send({ incomings, count });
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

//Incoming getall
module.exports.getexcel = async (req, res) => {
  try {
    const { market, beginDay, endDay } = req.body;
    const marke = await Market.findById(market);
    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }

    const incomings = await Incoming.find({
      market,
      createdAt: {
        $gte: beginDay,
        $lt: endDay,
      },
    })
      .sort({ _id: -1 })
      .select('-isArchive -updatedAt -market -user -__v')
      .populate('supplier', 'name')
      .populate('product', 'name code')
      .populate('unit', 'name');
    res.status(201).send(incomings);
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

//Incoming registerall
module.exports.getConnectors = async (req, res) => {
  try {
    const { market, beginDay, endDay } = req.body;
    const connectors = await IncomingConnector.find({
      market,
      createdAt: {
        $gte: beginDay,
        $lt: endDay,
      },
    })
      .sort({ _id: -1, supplier: -1 })
      .select('supplier incoming total createdAt')
      .populate('supplier', 'name')
      .populate('incoming', 'pieces');

    res.send(connectors);
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

// Pagination
module.exports.getCount = async (req, res) => {
  try {
    const { market } = req.body;

    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(400)
        .json({ message: "Diqqat! Do'kon malumotlari topilmadi" });
    }

    const count = await Incoming.find({ market }).count();
    res.status(201).send({ count });
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};
