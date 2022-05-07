const {
  Product,
  validateProduct,
  validateProductExcel,
} = require('../../models/Products/Product')
const { Market } = require('../../models/MarketAndBranch/Market')
const { Category } = require('../../models/Products/Category')
const { ProductType } = require('../../models/Products/ProductType')
const { Unit } = require('../../models/Products/Unit')
const ObjectId = require('mongodb').ObjectId

//Product registerall
module.exports.registerAll = async (req, res) => {
  try {
    const products = req.body.products
    const market = req.body.market
    const all = []
    for (const product of products) {
      const { error } = validateProductExcel(product)
      if (error) {
        return res.status(400).json({
          error: error.message,
        })
      }

      const { name, code, unit, category, categorycode } = product

      const marke = await Market.findById(market)

      if (!marke) {
        return res.status(400).json({
          message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
        })
      }

      const categor = await Category.findOne({
        code: categorycode,
        market,
      })

      if (!categor) {
        return res.status(400).json({
          message: `Diqqat! ${categorycode} kodli kategoriya mavjud emas.`,
        })
      }

      const produc = await Product.findOne({
        market,
        code,
      })

      if (produc) {
        return res.status(400).json({
          message: `Diqqat! ${code} kodli mahsulot avval yaratilgan.`,
        })
      }

      let u = null
      if (unit) {
        const unitt = await Unit.findOne({
          market,
          name: unit,
        })

        if (!unitt) {
          return res.status(400).json({
            message: `Diqqat! ${unit} o'lchov birligi tizimda mavjud emas.`,
          })
        }
        u = unitt._id
      }

      const newProduct = new Product({
        name,
        code,
        category: categor._id,
        market,
        unit: u,
      })

      all.push(newProduct)
    }

    all.map(async (product) => {
      await product.save()

      const updateCategory = await Category.findByIdAndUpdate(
        product.category._id,
        {
          $push: {
            products: product._id,
          },
        },
      )
    })

    res.send(all)
  } catch (error) {
    console.log(error)
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}

//Product register
module.exports.register = async (req, res) => {
  try {
    const { error } = validateProduct(req.body)
    if (error) {
      return res.status(400).json({
        error: error.message,
      })
    }

    const { name, producttype, code, category, market, unit } = req.body

    const product = await Product.findOne({
      market,
      code,
      category,
    })

    if (product) {
      return res.status(400).json({
        message: `Diqqat! ${name} mahsuloti avval yaratilgan.`,
      })
    }

    const marke = await Market.findById(market)

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      })
    }

    const categor = await Category.findById(category)

    if (!categor) {
      return res.status(400).json({
        message: "Diqqat! Kategoriya ma'lumotlari topilmadi.",
      })
    }

    const Producttype = await ProductType.findById(producttype)

    if (!Producttype && producttype) {
      return res.status(400).json({
        message: `Diqqat! Ko'rsatilgan mahsulot turi mavjud emas.`,
      })
    }

    const unitt = await Unit.findById(unit)

    if (!unitt) {
      return res.status(400).json({
        message: `Diqqat! Ko'rsatilgan o'lchov birligi tizimda mavjud emas.`,
      })
    }

    const newProduct = new Product({
      name,
      code,
      category,
      market,
      unit,
    })

    if (Producttype) {
      newProduct.producttype = Producttype._id
    }
    await newProduct.save()

    const updateCategory = await Category.findByIdAndUpdate(categor._id, {
      $push: {
        products: newProduct._id,
      },
    })

    if (Producttype) {
      const updateProductType = await ProductType.findByIdAndUpdate(
        Producttype._id,
        {
          $push: {
            products: newProduct._id,
          },
        },
      )
    }

    res.send(newProduct)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}

//Product update
module.exports.update = async (req, res) => {
  try {
    const { _id, name, code, category, producttype, market, unit } = req.body

    const marke = await Market.findById(market)

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      })
    }

    const categor = await Category.findById(category)

    if (!categor) {
      return res.status(400).json({
        message: "Diqqat! Bo'lim ma'lumotlari topilmadi.",
      })
    }

    const product = await Product.findById(_id)

    if (!product) {
      return res.status(400).json({
        message: `Diqqat! ${name} mahsuloti avval yaratilmagan.`,
      })
    }

    const c = await Product.findOne({ market, code })

    if (c && c._id.toString() !== _id) {
      return res.status(400).json({
        message: `Diqqat! ${code} kodli mahsulot tizimda avval ro'yxatga olinmagan.`,
      })
    }

    product.name = name
    product.code = code
    product.unit = unit

    if (product.category !== category) {
      const removeCategory = await Category.findByIdAndUpdate(
        product.category,
        {
          $pull: {
            products: new ObjectId(product._id),
          },
        },
      )

      const updateCategory = await Category.findByIdAndUpdate(category, {
        $push: {
          products: _id,
        },
      })
    }

    if (!product.producttype && producttype) {
      const productTypeUpdate1 = await ProductType.findByIdAndUpdate(
        producttype,
        {
          $push: {
            products: new ObjectId(product._id),
          },
        },
      )
      product.producttype = producttype
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
          },
        )

        const productTypeUpdate1 = await ProductType.findByIdAndUpdate(
          producttype,
          {
            $push: {
              products: new ObjectId(product._id),
            },
          },
        )
        product.producttype = producttype
      } else {
        if (product.producttype && !producttype) {
          product.producttype = null
        }
      }
    }

    await product.save()

    res.send(product)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}

//Product delete
module.exports.delete = async (req, res) => {
  try {
    const { _id, category, market, name, producttype } = req.body

    const marke = await Market.findById(market)

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      })
    }

    const categor = await Category.findById(category)

    if (!categor) {
      return res.status(400).json({
        message: "Diqqat! Bo'lim ma'lumotlari topilmadi.",
      })
    }

    const producttyp = await ProductType.findById(producttype)

    if (producttype && !producttyp) {
      return res.status(400).json({
        message: "Diqqat! Xizmat turi ma'lumotlari topilmadi.",
      })
    }

    const tovar = await Product.findById(_id)

    if (tovar.total > 0) {
      return res.status(400).json({
        message:
          "Diqqat! Mahsulot omborda mavjudligi sababli ushbu mahsulotni o'chirishni imkoni mavjud emas.",
      })
    }

    const product = await Product.findByIdAndDelete(_id)

    if (!product) {
      return res.status(400).json({
        message: `Diqqat! ${name} mahsuloti avval yaratilmagan.`,
      })
    }

    const categoryUpdate = await Category.findByIdAndUpdate(category, {
      $pull: {
        products: new ObjectId(_id),
      },
    })

    const producttypeUpdate = await ProductType.findByIdAndUpdate(producttype, {
      $pull: {
        products: new ObjectId(_id),
      },
    })

    res.send(product)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}

//Product getall
module.exports.getAll = async (req, res) => {
  try {
    const { market } = req.body

    const marke = await Market.findById(market)

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      })
    }

    const products = await Product.find({
      market,
    })
      .select('name code unit')
      .populate('category', 'name code')
      .populate('producttype', 'name')
      .populate('unit', 'name')

    res.send(products)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}

//Product getallcategory
module.exports.getAllCategory = async (req, res) => {
  try {
    const { market, category } = req.body

    const marke = await Market.findById(market)

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      })
    }

    const categor = await Category.findById(category)

    if (!categor) {
      return res.status(400).json({
        message: "Diqqat! Bo'lim ma'lumotlari topilmadi.",
      })
    }

    const products = await Product.find({
      market,
      category,
    })
      .populate('category', 'name')
      .populate('market', 'name')
      .populate('producttype', 'name')

    res.send(products)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}

//Product deleteall
module.exports.deleteAll = async (req, res) => {
  try {
    const { market } = req.body

    const marke = await Market.findById(market)

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      })
    }

    const products = await Product.find({
      market,
    })

    let all = []
    for (const product of products) {
      const del = await Product.findByIdAndDelete(product._id)

      const categoryUpdate = await Category.findByIdAndUpdate(
        product.category,
        {
          $pull: {
            products: new ObjectId(product._id),
          },
        },
      )

      const producttypeUpdate = await ProductType.findByIdAndUpdate(
        product.producttype,
        {
          $pull: {
            products: new ObjectId(product._id),
          },
        },
      )

      for (const productconnector of product.productconnectors) {
        const del = await ProductConnector.findByIdAndDelete(productconnector)
      }

      all.push(del)
    }

    res.send(all)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}
