const {
  ProductType,
  validateProductType,
} = require('../../models/Products/ProductType')
const { Market } = require('../../models/MarketAndBranch/Market')
const { Category } = require('../../models/Products/Category')
const { Product } = require('../../models/Products/Product')
const ObjectId = require('mongodb').ObjectId

// //ProductType registerall
// module.exports.registerAll = async (req, res) => {
//   try {
//     const productstype = req.body
//     const all = []
//     for (const s of productstype) {
//       const { error } = validateProductType(s)
//       if (error) {
//         return res.status(400).json({
//           error: error.message,
//         })
//       }

//       const { name, category, market } = s

//       const marke = await Market.findOne({ name: market })

//       if (!marke) {
//         return res.status(400).json({
//           message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
//         })
//       }

//       const departmen = await Category.findOne({
//         name: category,
//         market: marke._id,
//       })

//       if (!departmen) {
//         return res.status(400).json({
//           message: `Diqqat! ${category} xizmat turi mavjud emas.`,
//         })
//       }

//       const producttype = await ProductType.findOne({
//         market: marke._id,
//         name,
//         category: departmen._id,
//       })

//       if (producttype) {
//         return res.status(400).json({
//           message: `Diqqat! ${name} xizmat turi avval yaratilgan.`,
//         })
//       }

//       const newProductType = new ProductType({
//         name,
//         category: departmen._id,
//         market: marke._id,
//       })
//       await newProductType.save()

//       const updateCategory = await Category.findByIdAndUpdate(departmen._id, {
//         $push: {
//           producttypes: newProductType._id,
//         },
//       })
//       all.push(newProductType)
//     }

//     res.send(all)
//   } catch (error) {
//     res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
//   }
// }

//ProductType register

module.exports.register = async (req, res) => {
  try {
    const { error } = validateProductType(req.body)
    if (error) {
      return res.status(400).json({
        error: error.message,
      })
    }

    const { name, category, market } = req.body

    const product = await ProductType.findOne({
      market,
      name,
      category,
    })

    if (product) {
      return res.status(400).json({
        message: `Diqqat! ${name} xizmat turi avval yaratilgan.`,
      })
    }

    const marke = await Market.findById(market)

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      })
    }

    const departmen = await Category.findById(category)

    if (!departmen) {
      return res.status(400).json({
        message: "Diqqat! Bo'lim ma'lumotlari topilmadi.",
      })
    }

    const newProductType = new ProductType({
      name,
      category,
      market,
    })
    await newProductType.save()

    const updateCategory = await Category.findByIdAndUpdate(category, {
      $push: {
        producttypes: newProductType._id,
      },
    })

    res.send(newProductType)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}

//ProductType update
module.exports.update = async (req, res) => {
  try {
    const { _id, name, category, newcategory, market } = req.body

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

    const product = await ProductType.findById(_id)

    if (!product) {
      return res.status(400).json({
        message: `Diqqat! ${name} mahsulot turi avval yaratilmagan.`,
      })
    }

    const updateOldCategory = await Category.findByIdAndUpdate(categor._id, {
      $pull: {
        producttypes: _id,
      },
    })

    const updateNewCategory = await Category.findByIdAndUpdate(newcategory, {
      $push: {
        producttypes: _id,
      },
    })

    product.name = name
    product.category = category
    await product.save()

    for (const produc of product.products) {
      await Product.findByIdAndUpdate(produc, {
        category: newcategory,
      })
    }

    res.send(product)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}

//ProductType delete
module.exports.delete = async (req, res) => {
  try {
    const { _id, category, market, name } = req.body

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

    const productType = await ProductType.findById(_id)

    if (!productType) {
      return res.status(400).json({
        message: `Diqqat! ${name} xizmat turi avval yaratilmagan.`,
      })
    }

    if (productType.products.length > 0) {
      return res.status(400).json({
        message: `Diqqat! ${name} mahsulot turiga tegishli mahsulotlar mavjudligi sababli uni o'chirishning imkoni mavjud emas.`,
      })
    }

    await Category.findByIdAndUpdate(category, {
      $pull: {
        producttypes: _id,
      },
    })

    await ProductType.findByIdAndDelete(_id)

    productType.products.map(async (s) => {
      const id = new ObjectId(s).toString()
      let ss = await Product.findById(id)
      if (ss.producttype) {
        ss.producttype = null
      }

      await ss.save()
    })
    res.send(productType)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}

//ProductType getall
module.exports.getAll = async (req, res) => {
  try {
    const { market } = req.body

    const marke = await Market.findById(market)

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      })
    }

    const productstypes = await ProductType.find({
      market,
    })
      .select('name category')
      .populate('category', 'name')

    res.send(productstypes)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}

//ProductType getallcategory
module.exports.getAllCategory = async (req, res) => {
  try {
    const { market, category } = req.body

    const marke = await Market.findById(market)

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      })
    }

    const departmen = await Category.findById(category)

    if (!departmen) {
      return res.status(400).json({
        message: "Diqqat! Bo'lim ma'lumotlari topilmadi.",
      })
    }

    const productstype = await ProductType.find({
      market,
      category,
    })

    res.send(productstype)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
//ProductType deleteallcategory
module.exports.deleteAllCategory = async (req, res) => {
  try {
    const { category, market } = req.body

    const marke = await Market.findById(market)

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      })
    }

    const departmen = await Category.findById(category)

    if (!departmen) {
      return res.status(400).json({
        message: "Diqqat! Bo'lim ma'lumotlari topilmadi.",
      })
    }

    const productstype = await ProductType.find({
      market,
      category,
    })

    let all = []
    for (const product of productstype) {
      const del = await ProductType.findByIdAndDelete(product._id)

      const categoryUpdate = await Category.findByIdAndUpdate(category, {
        $pull: {
          producttypes: new ObjectId(product._id),
        },
      })

      product.products.map(async (s) => {
        const id = new ObjectId(s).toString()
        let ss = await Product.findById(id)
        if (ss.producttype) {
          ss.producttype = undefined
        }
        await ss.save()
      })

      all.push(del)
    }

    res.send(all)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}

//ProductType deleteall
module.exports.deleteAll = async (req, res) => {
  try {
    const { market } = req.body

    const marke = await Market.findById(market)

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      })
    }

    const productstype = await ProductType.find({
      market,
    })

    let all = []
    for (const product of productstype) {
      const del = await ProductType.findByIdAndDelete(product._id)
      all.push(del)

      const categoryUpdate = await Category.findByIdAndUpdate(
        product.category,
        {
          $pull: {
            producttypes: new ObjectId(product._id),
          },
        },
      )

      product.products.map(async (s) => {
        const id = new ObjectId(s).toString()
        let ss = await Product.findById(id)
        if (ss.producttype) {
          ss.producttype = undefined
        }
        await ss.save()
      })
    }

    res.send(all)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}
