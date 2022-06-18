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
const ObjectId = require('mongodb').ObjectId;

//Product registerall
module.exports.registerAll = async (req, res) => {
  try {
    const products = req.body.products;
    const market = req.body.market;

    const { currentPage, countPage, search } = req.body;

    const all = [];
    for (const product of products) {
      const { error } = validateProductExcel(product);
      if (error) {
        return res.status(400).json({
          error: error.message,
        });
      }
      const { name, code, unit, incomingprice, sellingprice, total } = product;

      const marke = await Market.findById(market);

      if (!marke) {
        return res.status(400).json({
          message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
        });
      }

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

      const produc = await Product.findOne({
        category: categor._id,
        market,
        code,
      });

      if (produc) {
        return res.status(400).json({
          message: `Diqqat! ${code} kodli mahsulot avval yaratilgan.`,
        });
      }

      const newProduct = new Product({
        name,
        code,
        category: categor._id,
        total: total ? Math.round(total * 10000) / 10000 : 0,
        market,
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
      await Category.findByIdAndUpdate(product.category, {
        $push: {
          products: product._id,
        },
      });

      await ProductPrice.findByIdAndUpdate(product.price, {
        product: product._id,
      });

      // Create Product to filials
      const marke = await Market.findById(market).select('filials');
      for (const f of marke.filials) {
        const filialproduct = new FilialProduct({
          product: product._id,
          category: product.category,
          unit: product.unit,
          market: f,
        });

        const pric = await ProductPrice.findById(product.price);
        const newPrice = new ProductPrice({
          incomingprice: Math.round(pric.sellingprice * 10000) / 10000,
          market: f,
        });

        await newPrice.save();
        filialproduct.price = newPrice._id;

        await filialproduct.save();
      }
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
      code: productcode,
      name: productname,
      market,
    })
      .sort({ _id: -1 })
      .select('name code total unit market category')
      .populate('price', 'incomingprice sellingprice')
      .populate('unit', 'name')
      .skip(currentPage * countPage)
      .limit(countPage);

    const count = await Product.find({
      code: productcode,
      name: productname,
      market,
    }).count();

    res.status(201).json({
      products: allproducts,
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

    const product = await Product.findOne({
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

    const newProduct = new Product({
      name,
      code,
      category: categor._id,
      market,
      unit,
      total,
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

    await Category.findByIdAndUpdate(categor._id, {
      $push: {
        products: newProduct._id,
      },
    });

    for (const f of marke.filials) {
      const filialproduct = new FilialProduct({
        product: newProduct._id,
        category: newProduct.category,
        unit: newProduct.unit,
        market: f,
      });

      const newPrice = new ProductPrice({
        incomingprice: sellingprice,
        market: f,
      });
      await newPrice.save();
      filialproduct.price = newPrice._id;

      await filialproduct.save();
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
      code: productcode,
      name: productname,
      market,
    })
      .sort({ _id: -1 })
      .select('name code total unit market category')
      .populate('price', 'incomingprice sellingprice')
      .populate('unit', 'name')
      .skip(currentPage * countPage)
      .limit(countPage);

    const count = await Product.find({
      code: productcode,
      name: productname,
      market,
    }).count();

    res.status(201).json({
      products,
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
    product.name = name;
    product.code = code;
    product.unit = unit;
    product.total = total;

    if (code.slice(0, 3) !== categor.code) {
      await Category.findByIdAndUpdate(product.category, {
        $pull: {
          products: new ObjectId(_id),
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
          products: _id,
        },
      });
      product.category = updateCategory._id;
    }

    await product.save();

    const productcode = new RegExp(
      '.*' + search ? search.code : '' + '.*',
      'i'
    );
    const productname = new RegExp(
      '.*' + search ? search.name : '' + '.*',
      'i'
    );

    const products = await Product.find({
      code: productcode,
      name: productname,
      market,
    })
      .sort({ _id: -1 })
      .select('name code total unit market category')
      .populate('price', 'incomingprice sellingprice')
      .populate('unit', 'name')
      .skip(currentPage * countPage)
      .limit(countPage);

    const count = await Product.find({
      code: productcode,
      name: productname,
      market,
    }).count();

    res.status(201).json({
      products,
      count,
    });
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

//Product delete
module.exports.delete = async (req, res) => {
  try {
    const { _id, category, market, name, producttype } = req.body;

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

    const producttyp = await ProductType.findById(producttype);

    if (producttype && !producttyp) {
      return res.status(400).json({
        message: "Diqqat! Xizmat turi ma'lumotlari topilmadi.",
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

    const categoryUpdate = await Category.findByIdAndUpdate(category, {
      $pull: {
        products: new ObjectId(_id),
      },
    });

    const producttypeUpdate = await ProductType.findByIdAndUpdate(producttype, {
      $pull: {
        products: new ObjectId(_id),
      },
    });

    res.send(product);
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
      .sort({ _id: -1 })
      .select('name code unit category producttype brand price total')
      .populate('category', 'name code')
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

    // const sinov = await Product.aggregate([
    //   { $match: { market: ObjectId(market) } },
    //   {
    //     $lookup: {
    //       from: 'categories', // DB dagi collecyion nomi
    //       localField: 'category', // qo'shilgan schemaga qanday nom bilan yozulgani
    //       foreignField: '_id', // qaysi propertysi qo'shilgani
    //       as: 'category', // qanday nom bilan chiqishi
    //       pipeline: [
    //         { $match: { code: code } },
    //         { $project: { code: 1, name: 1 } },
    //       ],
    //     },
    //   },
    //   { $unwind: '$category' },
    //   {
    //     $group: {
    //       _id: '$_id',
    //       category: { $first: '$category' },
    //       code: { $first: '$code' },
    //     },
    //   },
    // ]);
    // console.log(sinov);

    const products = await Product.find({
      code: code,
      name: name,
      market,
    })
      .sort({ code: 1 })
      .select('name code total unit market category')
      .populate('price', 'incomingprice sellingprice')
      .populate('unit', 'name')
      .skip(currentPage * countPage)
      .limit(countPage);

    const count = await Product.find({
      code: code,
      name: name,
      market,
    }).count();

    res.status(201).json({
      products,
      count,
    });
  } catch (error) {
    res.status(401).json({ message: 'Serverda xatolik yuz berdi...' });
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
      code: code,
      name: name,
      market,
    })
      .sort({ _id: -1 })
      .select('name code total unit')
      .populate('price', 'incomingprice sellingprice')
      .populate('unit', 'name');

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

    const products = await Product.find({
      market,
    })
      .sort({ code: 1 })
      .select('name code unit')
      .populate('unit', 'name')
      .populate('price', 'incomingprice');

    res.send(products);
  } catch (error) {
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

    const categorycode = new RegExp(
      '.*' + search ? search.categorycode : '' + '.*',
      'i'
    );
    const productcode = new RegExp(
      '.*' + search ? search.productcode : '' + '.*',
      'i'
    );
    const producttype = new RegExp(
      '.*' + search ? search.producttype : '' + '.*',
      'i'
    );
    const productname = new RegExp(
      '.*' + search ? search.productname : '' + '.*',
      'i'
    );
    const brandname = new RegExp('.*' + search ? search.brand : '' + '.*', 'i');

    const products = await Product.find({
      code: productcode,
      name: productname,
      market,
    })
      .sort({ _id: -1 })
      .select('name market category producttype brand code total unit')
      .populate({
        path: 'category',
        match: { code: categorycode },
        select: 'code',
      })
      .populate({
        path: 'producttype',
        match: { name: producttype },
        select: 'name',
      })
      .populate({ path: 'brand', match: { name: brandname }, select: 'name' })
      .populate('unit', 'name');

    const filter = products.filter((item) => {
      return (
        ((search.categorycode.length > 0 && item.category !== null) ||
          search.categorycode.length === 0) &&
        ((search.producttype.length > 0 &&
          item.producttype &&
          item.producttype !== null) ||
          search.producttype.length === 0) &&
        ((search.brand.length > 0 && item.brand && item.brand !== null) ||
          search.brand.length === 0)
      );
    });
    const count = filter.length;

    res.status(201).json({
      products: filter.splice(countPage * currentPage, countPage),
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
    const products = await Product.find({
      market,
    })
      .sort({ _id: -1 })
      .select('name code total unit market price')
      .populate('price', 'sellingprice')
      .populate('unit', 'name');

    res.status(201).json(products);
  } catch (error) {
    res.status(401).json({ message: 'Serverda xatolik yuz berdi...' });
  }
};
