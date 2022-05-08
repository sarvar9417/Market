const {
  Incoming,
  validateIncoming,
  validateIncomingAll,
} = require('../../models/Products/Incoming')
const { Market } = require('../../models/MarketAndBranch/Market')
const { ProductType } = require('../../models/Products/ProductType')
const { Category } = require('../../models/Products/Category')
const { Unit } = require('../../models/Products/Unit')
const { Product } = require('../../models/Products//Product')
const { Brand } = require('../../models/Products/Brand')
const { IncomingConnector } = require('../../models/Products/IncomingConnector')

//Incoming registerall
module.exports.registerAll = async (req, res) => {
  try {
    const products = req.body.products
    const market = req.body.market
    const user = req.body.user
    const all = []

    for (const newproduct of products) {
      const { error } = validateIncomingAll(newproduct)
      if (error) {
        return res.status(400).json({
          error: error.message,
        })
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
      } = newproduct

      const marke = await Market.findById(market)

      if (!marke) {
        return res.status(400).json({
          message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
        })
      }

      const categor = await Category.findById(category._id)

      if (!categor) {
        return res.status(400).json({
          message: `Diqqat! ${category.code} kodli kategoriya mavjud emas.`,
        })
      }

      const productstyp = await Category.findById(producttype._id)

      if (!productstyp) {
        return res.status(400).json({
          message: `Diqqat! ${producttype.name} nomli mahsulot turi tizimda mavjud emas.`,
        })
      }

      const bran = await Brand.findById(brand._id)

      if (!bran) {
        return res.status(400).json({
          message: `Diqqat! ${brand.name} nomli brand turi tizimda mavjud emas.`,
        })
      }

      const produc = await Product.findById(product._id)

      if (!produc) {
        return res.status(400).json({
          message: `Diqqat! ${product.code} kodli mahsulot avval yaratilmagan.`,
        })
      }

      const unitt = await Unit.findById(unit._id)

      if (!unitt) {
        return res.status(400).json({
          message: `Diqqat! ${unit.name} o'lchov birligi tizimda mavjud emas.`,
        })
      }

      const newProduct = new Incoming({
        product: product._id,
        category: category._id,
        producttype: producttype._id,
        brand: brand._id,
        supplier: supplier._id,
        unit: unit._id,
        pieces,
        unitprice,
        totalprice,
        unit: unit._id,
        market,
        user,
      })

      all.push(newProduct)
    }

    let p = []
    let t = 0

    all.map(async (product) => {
      await product.save()

      const produc = await Product.findById(product.product)
      produc.total = produc.total + product.pieces
      produc.incomingprice = product.unitprice
      await produc.save()

      p.push(product._id)
      t += product.totalprice
    })

    const newIncomingConnector = new IncomingConnector({
      total: t,
      incoming: [...p],
      supplier: products[0].supplier._id,
      market,
      user,
    })

    await newIncomingConnector.save()

    res.send(all)
  } catch (error) {
    console.log(error)
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}

//Incoming register
module.exports.register = async (req, res) => {
  try {
    const { error } = validateIncoming(req.body)
    if (error) {
      return res.status(400).json({
        error: error.message,
      })
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
    } = req.body

    const marke = await Market.findById(market)

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      })
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
    })
    await newIncoming.save()

    const produc = await Product.findById(product)

    produc.total += parseInt(pieces)
    produc.incomingprice = parseFloat(unitprice)
    await produc.save()

    res.send(newIncoming)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}

//Incoming update
module.exports.update = async (req, res) => {
  try {
    const marke = await Market.findById(req.body.market)

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      })
    }

    const old = await Incoming.findById(req.body._id)

    if (!old) {
      return res.status(400).json({
        message: "Diqqat! Ushbu kirim mahsuloti tizimda ro'yxatga olinmagan.",
      })
    }

    const produc = await Product.findById(req.body.product)

    produc.total -= old.pieces
    produc.total += req.body.pieces
    await produc.save()

    const update = await Incoming.findByIdAndUpdate(req.body._id, {
      ...req.body,
    })

    res.send(update)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}

//Incoming getall
module.exports.get = async (req, res) => {
  try {
    const { market, beginDay, endDay } = req.body
    const marke = await Market.findById(market)

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      })
    }

    const incomings = await IncomingConnector.find({
      market,
      createdAt: {
        $gte: beginDay,
        $lt: endDay,
      },
    })
      .select('-isArchive, -updatedAt, -market')
      .populate('incoming', '-isArchive, -updatedAt, -market -user -supplier')
      .populate('supplier', 'name')
      .populate('user', 'lastname firstname')

    res.send(incomings)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}

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
