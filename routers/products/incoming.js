const { Incoming, validateIncoming } = require('../../models/Products/Incoming')
const { Market } = require('../../models/MarketAndBranch/Market')
const { Product } = require('../../models/Products/Product')
const { ProductType } = require('../../models/Products/ProductType')
const { Category } = require('../../models/Products/Category')

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
module.exports.getAll = async (req, res) => {
  try {
    const { market } = req.body
    const marke = await Market.findById(market)

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      })
    }

    const incomings = await Incoming.find({
      market,
    })
      .select('-isArchive, -updatedAt')
      .populate('product', 'name code')
      .populate('category', 'name code')
      .populate('unit', 'name')
      .populate('supplier', 'name')

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
