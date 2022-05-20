const {
  Product,
  validateProduct,
  validateProductExcel,
} = require("../../models/Products/Product");
const { Market } = require("../../models/MarketAndBranch/Market");
const { Category } = require("../../models/Products/Category");
const { ProductType } = require("../../models/Products/ProductType");
const { Unit } = require("../../models/Products/Unit");
const { Brand } = require("../../models/Products/Brand");
const { ProductPrice } = require("../../models/Products/ProductPrice");
const {
  FilialProduct,
  validateFilialProduct,
} = require("../../models/FilialProducts/FilialProduct");
const ObjectId = require("mongodb").ObjectId;

//Product registerall
module.exports.registerAll = async (req, res) => {
  try {
    const products = req.body.products;
    const market = req.body.market;
    const all = [];
    for (const product of products) {
      const { error } = validateProductExcel(product);
      if (error) {
        return res.status(400).json({
          error: error.message,
        });
      }
      const { name, code, unit, category, producttype, brand, price, total } =
        product;
      const marke = await Market.findById(market);

      if (!marke) {
        return res.status(400).json({
          message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
        });
      }
      let categor = await Category.findOne({
        code: category,
        market,
      });

      if (!categor) {
        const newcategory = new Category({
          code: category,
          market,
        });
        await newcategory.save();
        categor = newcategory;
      }

      let producttyp = await ProductType.findOne({
        name: producttype,
        market,
      });

      if (!producttyp) {
        const newproducttype = new ProductType({
          name: producttype,
          category: categor._id,
          market,
        });
        await newproducttype.save();
        producttyp = newproducttype;
      }

      const produc = await Product.findOne({
        category: categor._id,
        producttype: producttyp._id,
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
        producttype: producttyp._id,
        market,
      });

      // Create Price

      const newPrice = new ProductPrice({
        sellingprice: price ? price : 0,
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

      // Total
      if (total) {
        newProduct.total = total;
      }

      // Create brand
      if (brand) {
        const bran = await Brand.findOne({
          name: brand,
          market,
        });

        if (!bran) {
          const newbrand = new Brand({
            name: brand,
            market,
          });
          await newbrand.save();

          newProduct.brand = newbrand._id;
        } else {
          newProduct.brand = bran._id;
        }
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

      await ProductType.findByIdAndUpdate(product.producttype, {
        $push: {
          products: product._id,
        },
      });

      await ProductPrice.findByIdAndUpdate(product.price, {
        product: product._id,
      });

      // Create Product to filials
      const marke = await Market.findById(market).select("filials");
      for (const f of marke.filials) {
        const filialproduct = new FilialProduct({
          product: product._id,
          producttype: product.producttype,
          category: product.category,
          unit: product.unit,
          brand: product.brand,
          market: f,
        });

        const pric = await ProductPrice.findById(product.price);
        const newPrice = new ProductPrice({
          incomingprice: pric.sellingprice,
          market: f,
        });

        await newPrice.save();
        filialproduct.price = newPrice._id;

        await filialproduct.save();
      }
    }

    const productss = await Product.find({
      market,
    })
      .sort({ _id: -1 })
      .select("name code unit category producttype brand price total")
      .populate("category", "name code")
      .populate("producttype", "name")
      .populate("unit", "name")
      .populate("brand", "name")
      .populate("price", "sellingprice");

    res.send(productss);
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
  }
};

//Product register
module.exports.register = async (req, res) => {
  try {
    const { error } = validateProduct(req.body);
    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    const {
      name,
      producttype,
      code,
      category,
      market,
      unit,
      brand,
      total,
      price,
    } = req.body;

    const product = await Product.findOne({
      market,
      code,
      category,
    });

    if (product) {
      return res.status(400).json({
        message: `Diqqat! ${name} mahsuloti avval yaratilgan.`,
      });
    }

    const marke = await Market.findById(market);

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }

    const categor = await Category.findById(category);

    if (!categor) {
      return res.status(400).json({
        message: "Diqqat! Kategoriya ma'lumotlari topilmadi.",
      });
    }

    const Producttype = await ProductType.findById(producttype);

    if (!Producttype && producttype) {
      return res.status(400).json({
        message: `Diqqat! Ko'rsatilgan mahsulot turi mavjud emas.`,
      });
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
      category,
      market,
      brand,
      unit,
      total,
      producttype: Producttype._id,
    });

    const newPrice = new ProductPrice({
      sellingprice: price ? price : 0,
      market,
    });


    await newPrice.save()

    newProduct.price = newPrice._id
    await newProduct.save()

    await Category.findByIdAndUpdate(categor._id, {
      $push: {
        products: newProduct._id,
      },
    });

    if (Producttype) {
      await ProductType.findByIdAndUpdate(Producttype._id, {
        $push: {
          products: newProduct._id,
        },
      });
    }

    for (const f of marke.filials) {
      const filialproduct = new FilialProduct({
        product: newProduct._id,
        producttype: newProduct.producttype,
        category: newProduct.category,
        unit: newProduct.unit,
        brand: newProduct.brand,
        market: f,
      });

      const newPrice = new ProductPrice({
        incomingprice: price,
        market: f,
      });

      await newPrice.save();
      filialproduct.price = newPrice._id;

      await filialproduct.save();
    }

    res.send(newProduct);
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
  }
};

//Product update
module.exports.update = async (req, res) => {
  try {
    const { _id, name, code, category, producttype, market, unit } = req.body;

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

    const product = await Product.findById(_id);

    if (!product) {
      return res.status(400).json({
        message: `Diqqat! ${name} mahsuloti avval yaratilmagan.`,
      });
    }

    const c = await Product.findOne({ market, code });

    if (c && c._id.toString() !== _id) {
      return res.status(400).json({
        message: `Diqqat! ${code} kodli mahsulot tizimda avval ro'yxatga olinmagan.`,
      });
    }

    product.name = name;
    product.code = code;
    product.unit = unit;

    if (product.category !== category) {
      const removeCategory = await Category.findByIdAndUpdate(
        product.category,
        {
          $pull: {
            products: new ObjectId(product._id),
          },
        }
      );

      const updateCategory = await Category.findByIdAndUpdate(category, {
        $push: {
          products: _id,
        },
      });
    }

    if (!product.producttype && producttype) {
      const productTypeUpdate1 = await ProductType.findByIdAndUpdate(
        producttype,
        {
          $push: {
            products: new ObjectId(product._id),
          },
        }
      );
      product.producttype = producttype;
    } else {
      if (
        product.producttype &&
        producttype &&
        product.producttype !== producttype
      ) {
        const productTypeUpdate = await ProductType.findByIdAndUpdate(
          product.producttype,
          {
            $pull: {
              products: new ObjectId(product._id),
            },
          }
        );

        const productTypeUpdate1 = await ProductType.findByIdAndUpdate(
          producttype,
          {
            $push: {
              products: new ObjectId(product._id),
            },
          }
        );
        product.producttype = producttype;
      } else {
        if (product.producttype && !producttype) {
          product.producttype = null;
        }
      }
    }

    await product.save();

    res.send(product);
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
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
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
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
      .select("name code unit category producttype brand price total")
      .populate("category", "name code")
      .populate("unit", "name")
      .populate("brand", "name")
      .populate("price", "sellingprice");

    res.send(products);
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
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
      .select("name code unit category price")
      .populate("category", "name code")
      .populate("unit", "name")
      .populate("price", "sellingprice");

    res.send(products);
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
  }
};

//Product getall by type
module.exports.getAllType = async (req, res) => {
  try {

    const { market, typeid } = req.body
    const marke = await Market.findById(market)
    const type = await ProductType.findById(typeid)

    if (!type || !marke) {
      return res.status(400).json({
        message: "Diqqat! Ma'lumotlar topilmadi.",
      });
    }

    const products = await Product.find({
      market,

      producttype: typeid,
    }).sort({ _id: -1 })
      .select("name code unit category price")
      .populate("category", "name code")
      .populate("unit", "name")
      .populate("price", "sellingprice")
    res.send(products)
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
  }
};

//Product getall by brand
module.exports.getAllBrand = async (req, res) => {
  try {

    const { market, typeid } = req.body

    const marke = await Market.findById(market)
    const bran = await Brand.findById(typeid)


    if (!bran || !marke) {
      return res.status(400).json({
        message: "Diqqat! Ma'lumotlar topilmadi.",
      });
    }

    const products = await Product.find({
      market,

      brand: typeid,
    }).select('name code category producttype price unit')
      .populate("category", "code")
      .populate("producttype", "name")
      .populate("price", "sellingprice")
      .populate("unit", "name")
    res.send(products)
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
  }
};

//Product getall by category
module.exports.getAllCategory = async (req, res) => {
  try {

    const { market, typeid } = req.body
    const marke = await Market.findById(market)
    const categor = await Category.findById(typeid)

    if (!categor || !marke) {
      return res.status(400).json({
        message: "Diqqat! Bo'lim ma'lumotlari topilmadi.",
      });
    }

    const products = await Product.find({
      market,
      category: typeid,
    }).sort({ _id: -1 })
      .select("name code unit category price")
      .populate("category", "name code")
      .populate("unit", "name")
      .populate("price", "sellingprice")
    res.send(products)
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
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
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
  }
};
