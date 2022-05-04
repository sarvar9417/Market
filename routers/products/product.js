const { Product, validateProduct } = require('../../models/Products/Product')
const { Market } = require('../../models/MarketAndBranch/Market')
const { Category } = require('../../models/Products/Category')
const { ProductType } = require('../../models/Products/ProductType')
const { Unit } = require('../../models/Products/Unit')
const ObjectId = require('mongodb').ObjectId

//Product registerall
module.exports.registerAll = async (req, res) => {
  try {
    const products = req.body
    const all = []
    for (const s of products) {
      const { error } = validateProduct(s)
      if (error) {
        return res.status(400).json({
          error: error.message,
        })
      }

      const { name, code, unit, producttype, category, market } = s

      const marke = await Market.findOne({ name: market })

      if (!marke) {
        return res.status(400).json({
          message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
        })
      }

      const categor = await Category.findOne({
        code: category,
        market: marke._id,
      })

      if (!categor) {
        return res.status(400).json({
          message: `Diqqat! ${category} kategoriyasi mavjud emas.`,
        })
      }

      const Producttype = await ProductType.findOne({
        name: producttype,
        category: categor._id,
        market: marke._id,
      })

      if (!Producttype && producttype) {
        return res.status(400).json({
          message: `Diqqat! ${category} kategoriyasida ${producttype} mahsulot turi mavjud emas.`,
        })
      }

      const product = await Product.findOne({
        market: marke._id,
        code,
        category: categor._id,
      })

      if (product) {
        return res.status(400).json({
          message: `Diqqat! ${name} mahsuloti avval yaratilgan.`,
        })
      }

      if (unit) {
        const unitt = await Unit.findOne({
          market: marke._id,
          name: unit,
        })

        if (!unitt) {
          return res.status(400).json({
            message: `Diqqat! ${unit} o'lchov birligi tizimda mavjud emas.`,
          })
        }
      }

      const newProduct = new Product({
        name,
        code,
        category: categor._id,
        market: marke._id,
        unit,
      })

      if (Producttype) {
        newProduct.producttype = Producttype._id
      }

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

      if (product.producttype) {
        const updateProductType = await ProductType.findByIdAndUpdate(
          product.producttype._id,
          {
            $push: {
              products: product._id,
            },
          },
        )
      }
    })

    res.send(all)
  } catch (error) {
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

    const {
      name,
      producttype,
      code,
      category,
      market,
      price,
      doctorProcient,
      counterAgentProcient,
      counterDoctorProcient,
    } = req.body

    const product = await Product.findOne({
      market,
      name,
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
        message: "Diqqat! Bo'lim ma'lumotlari topilmadi.",
      })
    }

    const Producttype = await ProductType.findById(producttype)

    if (!Producttype && producttype) {
      return res.status(400).json({
        message: `Diqqat! ${producttype} mahsulot turi mavjud emas.`,
      })
    }

    const newProduct = new Product({
      name,
      code,
      category: categor._id,
      market: marke._id,
      price,
      doctorProcient,
      counterAgentProcient,
      counterDoctorProcient,
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
      .populate('category', 'name')
      .populate('market', 'name')
      .populate('producttype', 'name')

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

//Product update
module.exports.update = async (req, res) => {
  try {
    const {
      _id,
      name,
      code,
      category,
      producttype,
      market,
      price,
      doctorProcient,
      counterAgentProcient,
      counterDoctorProcient,
    } = req.body

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

    product.name = name
    product.code = code
    product.price = price
    product.doctorProcient = doctorProcient
    product.counterAgentProcient = counterAgentProcient
    product.counterDoctorProcient = counterDoctorProcient

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
          product.producttype = undefined
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

    for (const productconnector of product.productconnector) {
      const del = await ProductConnector.findByIdAndDelete(productconnector)
    }

    res.send(product)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}

//Product deleteallcategory
module.exports.deleteAllCategory = async (req, res) => {
  try {
    const { category, market, producttype } = req.body

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

    let all = []
    for (const product of products) {
      const del = await Product.findByIdAndDelete(product._id)

      const categoryUpdate = await Category.findByIdAndUpdate(category, {
        $pull: {
          products: new ObjectId(product._id),
        },
      })

      const producttypeUpdate = await ProductType.findByIdAndUpdate(
        producttype,
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
