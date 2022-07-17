const {
  Product,
  validateProduct,
  validateProductExcel,
} = require('../../models/Products/Product');
const { Market } = require('../../models/MarketAndBranch/Market');
const { Category } = require('../../models/Products/Category');
const { ProductType } = require('../../models/Products/ProductType');
const { Unit } = require('../../models/Products/Unit');
const { Brand } = require('../../models/Products/Brand');
const { ProductPrice } = require('../../models/Products/ProductPrice');
const {
  FilialProduct,
  validateFilialProduct,
} = require('../../models/FilialProducts/FilialProduct');
const { ProductData } = require('../../models/Products/Productdata');
const ObjectId = require('mongodb').ObjectId;

//Product registerall
module.exports.registerAll = async (req, res) => {
  try {
    const products = req.body.products;
    const market = req.body.market;

    const { currentPage, countPage, search } = req.body;

    const all = [];

    const marke = await Market.findById(market);

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }

    for (const product of products) {
      const productData = await ProductData.findOne({
        market: market._id,
        code: product.code,
      });

      if (productData) {
        return res.status(400).json({
          message: `Diqqat! ${product.code} kodli mahsulot avval yaratilgan.`,
        });
      }
    }

    for (const product of products) {
      const { error } = validateProductExcel(product);
      if (error) {
        return res.status(400).json({
          error: error.message,
        });
      }
      const { name, code, unit, incomingprice, sellingprice, total } = product;

      let categor = await Category.findOne({
        code: code.slice(0, 3),
        market,
      });

      if (!categor) {
        const newcategory = new Category({
          code: code.slice(0, 3),
          market,
        });
        await newcategory.save();
        categor = newcategory;
      }

      const newProductData = new ProductData({
        code,
        name,
        category: categor._id,
        market,
      });
      await newProductData.save();

      const newProduct = new Product({
        productdata: newProductData._id,
        category: categor._id,
        market,
        unit,
        total: Math.round(total * 10000) / 10000,
      });

      // Create Price

      const newPrice = new ProductPrice({
        incomingprice: incomingprice
          ? Math.round(incomingprice * 10000) / 10000
          : 0,
        sellingprice: sellingprice
          ? Math.round(sellingprice * 10000) / 10000
          : 0,
        market,
      });

      await newPrice.save();
      newProduct.price = newPrice._id;

      // Create unit
      const uni = await Unit.findOne({
        name: unit,
        market,
      });

      if (uni) {
        newProduct.unit = uni._id;
      } else {
        const newUnit = new Unit({
          name: unit,
          market,
        });
        await newUnit.save();
        newProduct.unit = newUnit._id;
      }

      all.push(newProduct);
    }

    for (const product of all) {
      await product.save();

      await ProductData.findByIdAndUpdate(product.productdata, {
        unit: product.unit,
        $push: {
          products: product._id,
        },
      });

      await Category.findByIdAndUpdate(product.category, {
        $push: {
          products: product._id,
        },
      });

      await ProductPrice.findByIdAndUpdate(product.price, {
        product: product._id,
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

    const allproducts = await Product.find({
      market,
    })
      .sort({ code: 1 })
      .select('total market category')
      .populate('price', 'incomingprice sellingprice')
      .populate({
        path: 'productdata',
        select: 'name code',
        match: { name: productname, code: productcode },
      })
      .populate('unit', 'name');

    let filter = allproducts.filter((product) => {
      return product.productdata !== null;
    });

    const count = filter.length;
    filter = filter.splice(currentPage * countPage, countPage);
    res.status(201).json({
      products: filter,
      count,
    });
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

//Product register
module.exports.register = async (req, res) => {
  try {
    const { currentPage, countPage, search } = req.body;
    const { error } = validateProduct(req.body.product);
    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    const { name, code, market, unit, total, incomingprice, sellingprice } =
      req.body.product;
    const marke = await Market.findById(market);

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }

    const product = await ProductData.findOne({
      market,
      code,
    });

    if (product) {
      return res.status(400).json({
        message: `Diqqat! ${code} kodli mahsulot avval yaratilgan.`,
      });
    }
    const category = code.slice(0, 3);

    let categor = await Category.findOne({ code: category, market });

    if (!categor) {
      categor = new Category({
        code: category,
        market,
      });
      await categor.save();
    }

    const unitt = await Unit.findById(unit);

    if (!unitt) {
      return res.status(400).json({
        message: `Diqqat! Ko'rsatilgan o'lchov birligi tizimda mavjud emas.`,
      });
    }

    const newProductData = new ProductData({
      code,
      name,
      category: categor._id,
      unit,
      market,
    });
    await newProductData.save();

    const newProduct = new Product({
      productdata: newProductData._id,
      category: categor._id,
      market,
      unit,
      total: Math.round(total * 100) / 100,
    });

    const newPrice = new ProductPrice({
      incomingprice: incomingprice
        ? Math.round(incomingprice * 10000) / 10000
        : 0,
      sellingprice: sellingprice ? Math.round(sellingprice * 10000) / 10000 : 0,
      market,
    });

    await newPrice.save();

    newProduct.price = newPrice._id;
    await newProduct.save();
    newPrice.product = newProduct._id;
    await newPrice.save();

    await ProductData.findByIdAndUpdate(newProductData._id, {
      $push: {
        products: newProduct._id,
      },
    });

    await Category.findByIdAndUpdate(categor._id, {
      $push: {
        products: newProductData._id,
      },
    });

    const productcode = new RegExp(
      '.*' + search ? search.code : '' + '.*',
      'i'
    );
    const productname = new RegExp(
      '.*' + search ? search.name : '' + '.*',
      'i'
    );

    const products = await Product.find({
      market,
    })
      .sort({ code: 1 })
      .select('total market category')
      .populate('price', 'incomingprice sellingprice')
      .populate({
        path: 'productdata',
        select: 'name code',
        match: { name: productname, code: productcode },
      })
      .populate('unit', 'name');

    let filter = products.filter((product) => {
      return product.productdata !== null;
    });

    const count = filter.length;
    filter = filter.splice(currentPage * countPage, countPage);
    res.status(201).json({
      products: filter,
      count,
    });
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

//Product update
module.exports.update = async (req, res) => {
  try {
    const {
      _id,
      name,
      code,
      category,
      market,
      unit,
      priceid,
      incomingprice,
      sellingprice,
      total,
      productdata,
    } = req.body.product;

    const { currentPage, countPage, search } = req.body;
    const marke = await Market.findById(market);

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }

    const categor = await Category.findById(category);

    const product = await Product.findById(_id);

    if (!product) {
      return res.status(400).json({
        message: `Diqqat! ${code} kodli mahsulot avval yaratilmagan.`,
      });
    }

    await ProductPrice.findByIdAndUpdate(priceid, {
      incomingprice: Math.round(incomingprice * 10000) / 10000,
      sellingprice: Math.round(sellingprice * 10000) / 10000,
    });
    product.unit = unit;
    product.total = total;

    const productData = await ProductData.findById(productdata);

    if (productData.market.toString() === market) {
      productData.name = name;
      productData.code = code;
      if (code.slice(0, 3) !== categor.code) {
        await Category.findByIdAndUpdate(productData.category, {
          $pull: {
            products: new ObjectId(productData._id),
          },
        });

        let updateCategory = await Category.findOne({
          market,
          code: code.slice(0, 3),
        });

        if (!updateCategory) {
          updateCategory = new Category({
            market,
            code: code.slice(0, 3),
          });

          await updateCategory.save();
        }
        updateCategory = await Category.findByIdAndUpdate(updateCategory._id, {
          $push: {
            products: productData._id,
          },
        });
        product.category = updateCategory._id;
        productData.category = updateCategory._id;
      }
    }

    await product.save();
    await productData.save();

    const productcode = new RegExp(
      '.*' + search ? search.code : '' + '.*',
      'i'
    );
    const productname = new RegExp(
      '.*' + search ? search.name : '' + '.*',
      'i'
    );

    const products = await Product.find({
      market,
    })
      .sort({ code: 1 })
      .select('total market category')
      .populate('price', 'incomingprice sellingprice')
      .populate({
        path: 'productdata',
        select: 'name code',
        match: { name: productname, code: productcode },
      })
      .populate('unit', 'name');

    let filter = products.filter((product) => {
      return product.productdata !== null;
    });

    const count = filter.length;
    filter = filter.splice(currentPage * countPage, countPage);
    res.status(201).json({
      products: filter,
      count,
    });
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

//Product delete
module.exports.delete = async (req, res) => {
  try {
    const {
      _id,
      category,
      market,
      name,
      productdata,
      search,
      currentPage,
      countPage,
    } = req.body;
    const marke = await Market.findById(market);

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }

    const categor = await Category.findById(category);

    if (!categor) {
      return res.status(400).json({
        message: "Diqqat! Bo'lim ma'lumotlari topilmadi.",
      });
    }

    const tovar = await Product.findById(_id);

    if (tovar.total > 0) {
      return res.status(400).json({
        message:
          "Diqqat! Mahsulot omborda mavjudligi sababli ushbu mahsulotni o'chirishni imkoni mavjud emas.",
      });
    }

    const product = await Product.findByIdAndDelete(_id);

    if (!product) {
      return res.status(400).json({
        message: `Diqqat! ${name} mahsuloti avval yaratilmagan.`,
      });
    }

    await ProductData.findByIdAndUpdate(productdata._id, {
      $pull: {
        products: new ObjectId(_id),
      },
    });

    const productData = await ProductData.findById(productdata);
    if (
      productData.products.length === 0 &&
      market === productData.market.toString()
    ) {
      await ProductData.findByIdAndDelete(productdata._id);
      await Category.findByIdAndUpdate(category, {
        $pull: {
          products: new ObjectId(productData._id),
        },
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

    const products = await Product.find({
      market,
    })
      .sort({ code: 1 })
      .select('total market category')
      .populate('price', 'incomingprice sellingprice')
      .populate({
        path: 'productdata',
        select: 'name code',
        match: { name: productname, code: productcode },
      })
      .populate('unit', 'name');

    let filter = products.filter((product) => {
      return product.productdata !== null;
    });

    const count = filter.length;
    filter = filter.splice(currentPage * countPage, countPage);
    res.status(201).json({
      products: filter,
      count,
    });
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

//Product getall
module.exports.getAll = async (req, res) => {
  try {
    const { market } = req.body;

    const marke = await Market.findById(market);

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }

    const products = await Product.find({
      market,
    })
      .sort({ code: 1 })
      .select('name code unit category producttype brand price total')
      .populate('category', 'name code')
      .populate('pro', 'name code')
      .populate('producttype', 'name')
      .populate('unit', 'name')
      .populate('brand', 'name')
      .populate('price', 'incomingprice sellingprice');

    res.send(products);
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getProducts = async (req, res) => {
  try {
    const { market, currentPage, countPage, search } = req.body;
    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(401)
        .json({ message: "Diqqat! Do'kon malumotlari topilmadi" });
    }

    const code = new RegExp('.*' + search ? search.code : '' + '.*', 'i');
    const name = new RegExp('.*' + search ? search.name : '' + '.*', 'i');
    const products = await Product.find({
      market,
    })
      .sort({ code: 1 })
      .select('total market category')
      .populate('price', 'incomingprice sellingprice')
      .populate({
        path: 'productdata',
        select: 'name code',
        match: { name: name, code: code },
      })
      .populate('unit', 'name');

    let filter = products.filter((product) => {
      return product.productdata !== null;
    });

    const count = filter.length;
    filter = filter.splice(currentPage * countPage, countPage);
    res.status(201).json({
      products: filter,
      count,
    });
  } catch (error) {
    res.status(401).send(error);
  }
};

//Product getallCategory
module.exports.getCategory = async (req, res) => {
  try {
    const { market, category } = req.body;

    const marke = await Market.findById(market);

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }

    const products = await Product.find({
      market,
      category,
    })
      .sort({ _id: -1 })
      .select('name code unit category price total')
      .populate('category', 'name code')
      .populate('unit', 'name')
      .populate('price', 'sellingprice');

    res.send(products);
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getAllProducttypes = async (req, res) => {
  try {
    const { market } = req.body;
    const marke = await Market.findById(market);

    if (!marke) {
      return res
        .status(401)
        .json({ message: "Diqqat! Do'kon malumotlari topilmadi." });
    }

    const producttypes = await ProductType.find({ market }).select(
      'name category market'
    );

    res.status(201).json(producttypes);
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

// Product getProductExcel
module.exports.getProductExcel = async (req, res) => {
  try {
    const { market, search } = req.body;
    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(401)
        .json({ message: "Diqqat! Do'kon malummotlari topilmadi." });
    }
    const code = new RegExp('.*' + search ? search.code : '' + '.*', 'i');
    const name = new RegExp('.*' + search ? search.name : '' + '.*', 'i');

    const products = await Product.find({
      market,
    })
      .sort({ _id: -1 })
      .select('total unit price productdata')
      .populate('price', 'incomingprice sellingprice')
      .populate('unit', 'name')
      .populate({
        path: 'productdata',
        select: 'name code',
        match: { name: name, code: code },
      });

    res.status(201).json(products);
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

//Product getallCategory
module.exports.getAllIncoming = async (req, res) => {
  try {
    const { market } = req.body;

    const marke = await Market.findById(market);

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }

    const allproducts = await Product.find({
      market,
    })
      .sort({ code: 1 })
      .select('total market category')
      .populate('price', 'incomingprice sellingprice')
      .populate({
        path: 'productdata',
        select: 'name code',
      })
      .populate('unit', 'name');

    const products = allproducts.filter((product) => {
      return product.productdata !== null;
    });

    res.send(products);
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

//Product getall by type
module.exports.getAllType = async (req, res) => {
  try {
    const { market, typeid } = req.body;
    const marke = await Market.findById(market);
    const type = await ProductType.findById(typeid);

    if (!type || !marke) {
      return res.status(400).json({
        message: "Diqqat! Ma'lumotlar topilmadi.",
      });
    }

    const products = await Product.find({
      market,

      producttype: typeid,
    })
      .sort({ _id: -1 })
      .select('name code unit category price total')
      .populate('category', 'name code')
      .populate('unit', 'name')
      .populate('price', 'sellingprice');
    res.send(products);
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

//Product getall by brand
module.exports.getAllBrand = async (req, res) => {
  try {
    const { market, typeid } = req.body;

    const marke = await Market.findById(market);
    const bran = await Brand.findById(typeid);

    if (!bran || !marke) {
      return res.status(400).json({
        message: "Diqqat! Ma'lumotlar topilmadi.",
      });
    }

    const products = await Product.find({
      market,

      brand: typeid,
    })
      .select('name code category producttype price unit total')
      .populate('category', 'code')
      .populate('producttype', 'name')
      .populate('price', 'sellingprice')
      .populate('unit', 'name');
    res.send(products);
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

//Product getall by category
module.exports.getAllCategory = async (req, res) => {
  try {
    const { market, typeid } = req.body;
    const marke = await Market.findById(market);
    const categor = await Category.findById(typeid);

    if (!categor || !marke) {
      return res.status(400).json({
        message: "Diqqat! Bo'lim ma'lumotlari topilmadi.",
      });
    }

    const products = await Product.find({
      market,
      category: typeid,
    })
      .sort({ _id: -1 })
      .select('name code unit category price total')
      .populate('category', 'name code')
      .populate('unit', 'name')
      .populate('price', 'sellingprice');
    res.send(products);
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

//Product deleteall
module.exports.deleteAll = async (req, res) => {
  try {
    const { market } = req.body;

    const marke = await Market.findById(market);

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }

    const products = await Product.find({
      market,
    });

    let all = [];
    for (const product of products) {
      const del = await Product.findByIdAndDelete(product._id);

      const categoryUpdate = await Category.findByIdAndUpdate(
        product.category,
        {
          $pull: {
            products: new ObjectId(product._id),
          },
        }
      );

      const producttypeUpdate = await ProductType.findByIdAndUpdate(
        product.producttype,
        {
          $pull: {
            products: new ObjectId(product._id),
          },
        }
      );

      for (const productconnector of product.productconnectors) {
        const del = await ProductConnector.findByIdAndDelete(productconnector);
      }

      all.push(del);
    }

    res.send(all);
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

//Product for Inventory
module.exports.getProductsInventory = async (req, res) => {
  try {
    const { market, currentPage, countPage, search } = req.body;

    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(401)
        .json({ message: "Diqqat! Do'kon malumotlari topilmadi" });
    }

    const productcode = new RegExp(
      '.*' + search ? search.productcode : '' + '.*',
      'i'
    );

    const productname = new RegExp(
      '.*' + search ? search.productname : '' + '.*',
      'i'
    );

    const products = await Product.find({
      market,
    })
      .sort({ code: 1 })
      .select('total market category')
      .populate('price', 'incomingprice sellingprice')
      .populate({
        path: 'productdata',
        select: 'name code',
        match: { name: productname, code: productcode },
      })
      .populate('unit', 'name');

    let filter = products.filter((product) => {
      return product.productdata !== null;
    });

    const count = filter.length;

    filter = filter.splice(currentPage * countPage, countPage);
    res.status(201).json({
      products: filter,
      count,
    });
  } catch (error) {
    res.status(401).json({ message: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getproductsale = async (req, res) => {
  try {
    const { market } = req.body;

    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(401)
        .json({ message: "Diqqat! Do'kon malumotlari topilmadi" });
    }

    const products = await Product.aggregate([
      { $match: { market: ObjectId(market) } },
      {
        $lookup: {
          from: 'productdatas', // DB dagi collecyion nomi
          localField: 'productdata', // qo'shilgan schemaga qanday nom bilan yozulgani
          foreignField: '_id', // qaysi propertysi qo'shilgani
          as: 'productdata', // qanday nom bilan chiqishi
          pipeline: [{ $project: { code: 1, name: 1 } }],
        },
      },
      {
        $lookup: {
          from: 'productprices', // DB dagi collection nomi
          localField: 'price', // qo'shilgan schemaga qanday nom bilan yozulgani
          foreignField: '_id', // qaysi propertysi qo'shilgani
          as: 'price', // qanday nom bilan chiqishi
          pipeline: [{ $project: { sellingprice: 1, incomingprice: 1 } }],
        },
      },
      {
        $lookup: {
          from: 'units', // DB dagi collecyion nomi
          localField: 'unit', // qo'shilgan schemaga qanday nom bilan yozulgani
          foreignField: '_id', // qaysi propertysi qo'shilgani
          as: 'unit', // qanday nom bilan chiqishi
          pipeline: [{ $project: { name: 1 } }],
        },
      },
      { $unwind: '$price' },
      { $unwind: '$productdata' },
      { $unwind: '$unit' },
      {
        $group: {
          _id: '$_id',
          productdata: { $first: '$productdata._id' },
          name: { $first: '$productdata.name' },
          code: { $first: '$productdata.code' },
          unit: { $first: '$unit' },
          total: { $first: '$total' },
          market: { $first: '$market' },
          price: { $first: '$price' },
        },
      },
      {
        $sort: { code: 1 },
      },
    ]);

    res.status(201).json(products);
  } catch (error) {
    res.status(401).json({ message: 'Serverda xatolik yuz berdi...' });
  }
};

//Product register
module.exports.updateAllProducts = async (req, res) => {
  try {
    let allproducts = await Product.find({});
    allproducts.map(async (product) => {
      if (product.code) {
        const productData = new ProductData({
          market: product.market,
          name: product.name,
          code: product.code,
          category: product.category,
          unit: product.unit,
        });

        await productData.save();

        await ProductData.findByIdAndUpdate(productData._id, {
          $push: {
            products: new ObjectId(product._id),
          },
        });

        await Product.findByIdAndUpdate(product._id, {
          productdata: productData._id,
          $unset: { name: true, code: true },
        });

        await Category.findByIdAndUpdate(product.category, {
          $push: {
            products: new ObjectId(productData._id),
          },
        });

        await Category.findByIdAndUpdate(product.category, {
          $pull: {
            products: new ObjectId(product._id),
          },
        });
      }
    });

    res.status(201).json({
      message: 'tayyor',
    });
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};
