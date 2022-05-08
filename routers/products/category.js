const { Category, validateCategory } = require('../../models/Products/Category')
const { Market } = require('../../models/MarketAndBranch/Market')
const { Product } = require('../../models/Products/Product')
const { ProductType } = require('../../models/Products/ProductType')

//Category register
module.exports.registerAll = async (req, res) => {
  try {
    const categorys = req.body
    const all = []
    for (const d of categorys) {
      const { error } = validateCategory(d)
      if (error) {
        return res.status(400).json({
          error: error.message,
        })
      }

      const { name, probirka, market } = d

      const marke = await Market.findOne({ name: market })

      if (!marke) {
        return res.status(400).json({
          message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
        })
      }

      const category = await Category.findOne({
        market: marke._id,
        name,
      })

      if (category) {
        return res.status(400).json({
          message: `Diqqat! ${name} bo'limi avval yaratilgan.`,
        })
      }

      const newCategory = new Category({
        name,
        probirka,
        market: marke._id,
      })
      await newCategory.save()
      all.push(newCategory)
    }

    res.send(all)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}

//Category register
module.exports.register = async (req, res) => {
  try {
    const { error } = validateCategory(req.body)
    if (error) {
      return res.status(400).json({
        error: error.message,
      })
    }
    const { name, market, code } = req.body

    const category = await Category.findOne({
      market,
      code,
      name,
    })

    if (category) {
      return res.status(400).json({
        message: "Diqqat! Ushbu bo'lim avval yaratilgan.",
      })
    }

    const marke = await Market.findById(market)

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      })
    }

    const newCategory = new Category({
      name,
      market,
      code,
    })
    await newCategory.save()

    res.send(newCategory)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}

//Category update
module.exports.update = async (req, res) => {
  try {
    const { name, market, code } = req.body

    const marke = await Market.findById(market)

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      })
    }

    const old = await Category.findOne({
      market,
      code,
    })

    if (old) {
      return res.status(400).json({
        message: "Diqqat! Ushbu bo'lim avval yaratilgan.",
      })
    }

    const category = await Category.findById(req.body._id)

    if (!category) {
      return res.status(400).json({
        message: "Diqqat! Ushbu bo'lim topilmadi.",
      })
    }

    category.name = name
    category.code = code
    await category.save()

    res.send(category)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}

//Category getall
module.exports.getAll = async (req, res) => {
  try {
    const { market } = req.body
    const marke = await Market.findById(market)

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      })
    }

    const categorys = await Category.find({
      market,
    })
      .select('name code')
      .sort({ _id: -1 })

    res.send(categorys)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}

//Category delete
module.exports.delete = async (req, res) => {
  try {
    const { _id } = req.body

    const category = await Category.findById(_id)

    if (category.products.length > 0) {
      return res.status(400).json({
        message:
          "Diqqat! Ushbu bo'limda mahsulotlar mavjud bo'lganligi sababli bo'limni o'chirish mumkin emas.",
      })
    }

    await Category.findByIdAndDelete(_id)

    res.send(category)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}
