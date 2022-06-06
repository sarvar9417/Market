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

//Incoming registerall
module.exports.registerAll = async (req, res) => {
  try {
    const { market, beginDay, endDay, products, user } = req.body;
    const all = [];
    for (const newproduct of products) {
      const { error } = validateIncomingAll(newproduct);
      if (error) {
        return res.status(400).json({
          error: error.message,
        });
      }

      const {
        product,
        unit,
        category,
        producttype,
        brand,
        supplier,
        pieces,
        unitprice,
        totalprice,
      } = newproduct;

      const marke = await Market.findById(market);

      if (!marke) {
        return res.status(400).json({
          message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
        });
      }

      const categor = await Category.findById(category._id);

      if (!categor) {
        return res.status(400).json({
          message: `Diqqat! ${category.code} kodli kategoriya mavjud emas.`,
        });
      }

      const productstyp = await ProductType.findById(producttype._id);

      if (!productstyp) {
        return res.status(400).json({
          message: `Diqqat! ${producttype.name} nomli mahsulot turi tizimda mavjud emas.`,
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
        category: category._id,
        producttype: producttype._id,
        supplier: supplier._id,
        unit: unit._id,
        pieces,
        unitprice: Math.round(unitprice * 100) / 100,
        totalprice: Math.round(totalprice * 100) / 100,
        unit: unit._id,
        market,
        user,
      });

      if (brand) {
        const bran = await Brand.findById(brand._id);

        if (!bran) {
          return res.status(400).json({
            message: `Diqqat! ${brand.name} nomli brand turi tizimda mavjud emas.`,
          });
        }
        newProduct.brand = brand._id;
      }

      all.push(newProduct);
    }
    let p = [];
    let t = 0;

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
        procient: productprice.procient,
        product: product.product,
        incomingprice: Math.round(product.unitprice * 100) / 100,
        sellingprice: price,
        market,
      });

      await newProductPrice.save();

      produc.price = newProductPrice._id;
      await produc.save();
      p.push(product._id);
      t += Math.round(product.totalprice * 100) / 100;
    }

    const newIncomingConnector = new IncomingConnector({
      total: t,
      incoming: p,
      supplier: products[0].supplier._id,
      market,
      user,
    });

    await newIncomingConnector.save();

    const connectors = await IncomingConnector.find({
      market,
      createdAt: {
        $gte: beginDay,
        $lt: endDay,
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
    const marke = await Market.findById(req.body.market);

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }

    const old = await Incoming.findById(req.body._id);

    if (!old) {
      return res.status(400).json({
        message: "Diqqat! Ushbu kirim mahsuloti tizimda ro'yxatga olinmagan.",
      });
    }

    const produc = await Product.findById(req.body.product);

    produc.total -= old.pieces;
    produc.total += req.body.pieces;
    await produc.save();

    const update = await Incoming.findByIdAndUpdate(req.body._id, {
      ...req.body,
    });

    res.send(update);
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
      .skip(currentPage * countPage)
      .limit(countPage)
      .select('-isArchive -updatedAt -market -user -__v')
      .populate('supplier', 'name')
      .populate('category', 'code')
      .populate('producttype', 'name')
      .populate('product', 'name code')
      .populate('unit', 'name')
      .populate('brand', 'name');
    res.status(201).send({ incomings, count });
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
      .sort({ _id: -1 })
      .select('supplier incoming total createdAt')
      .populate('supplier', 'name')
      .populate('incoming', 'pieces');

    res.send(connectors);
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

//Incoming delete
// module.exports.delete = async (req, res) => {
//   try {
//     const { _id } = req.body

//     const incoming = await Incoming.findById(_id)

//     if (incoming.products.length > 0) {
//       return res.status(400).json({
//         message:
//           "Diqqat! Ushbu bo'limda mahsulotlar mavjud bo'lganligi sababli bo'limni o'chirish mumkin emas.",
//       })
//     }

//     await Incoming.findByIdAndDelete(_id)

//     res.send(incoming)
//   } catch (error) {
//     res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
//   }
// }

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
