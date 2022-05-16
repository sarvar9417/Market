const { FilialProduct } = require('../../models/FilialProducts/FilialProduct')
const {
  Market,
  validateMarket,
} = require('../../models/MarketAndBranch/Market')

module.exports.register = async (req, res) => {
  try {
    const { error } = validateMarket(req.body)

    if (error) {
      return res.status(400).json({
        message: error.message,
      })
    }
    const {
      name,
      organitionName,
      image,
      phone1,
      phone2,
      phone3,
      bank,
      bankNumber,
      inn,
      address,
      orientation,
      director,
      mfo,
      market,
    } = req.body

    const branch = await Market.find({ name, market })

    if (branch.length > 0) {
      return res.status(400).json({
        message:
          "Diqqat! Ushbu nomdagi filifal mavjud. Iltimos filial nomida o'zgartirish qilib keyin kiriting.",
      })
    }

    const newMarket = new Market({
      name,
      organitionName,
      image,
      phone1,
      phone2,
      phone3,
      bank,
      bankNumber,
      inn,
      address,
      orientation,
      director,
      mfo,
      market,
    })

    await newMarket.save()

    await Market.findByIdAndUpdate(market, {
      $push: {
        filials: newMarket._id,
      }
    })

    // Create Product to filials
    const marke = await Market.findById(market).select('filials')
    for (const f of marke.filials) {
      const filialproduct = new FilialProduct({
        product: product._id,
        producttype: product.producttype,
        category: product.category,
        unit: product.unit,
        brand: product.brand,
        market: f
      })

      const pric = await ProductPrice.findById(product.price)
      const newPrice = new ProductPrice({
        incomingprice: pric.sellingprice,
        market: f,
      });

      await newPrice.save();
      filialproduct.price = newPrice._id;

      await filialproduct.save()
    }


    res.status(201).send(newMarket)
  } catch (error) {
    res.status(501).json({ message: error })
  }
}

module.exports.update = async (req, res) => {
  try {
    const { branch } = req.body

    if (!branch.market) {
      return res.status(400).json({
        message: "Do'kon asosiy do'kon ma'lumotlari topilmadi",
      })
    }

    const update = await Market.findByIdAndUpdate(branch._id, { ...branch })
    res.status(201).send(update)
  } catch (error) {
    res.status(501).json({ message: error })
  }
}

module.exports.getMarket = async (req, res) => {
  try {
    const { branchId } = req.body
    if (!branchId) {
      return res.status(400).json({
        message: "Diqqat! Filial ID si ko'rsatilmagan.",
      })
    }

    const branch = await Market.findById(branchId)

    if (!branch) {
      return res.status(400).json({
        message: "Diqqat! Ko'rsatilgan klinika ro'yxatdan o'tkazilmagan.",
      })
    }

    res.status(200).send(branch)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}

module.exports.getAll = async (req, res) => {
  try {
    const { market } = req.body
    if (!market) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ID si ko'rsatilmagan.",
      })
    }

    const branchs = await Market.find({ market, isArchive: false })

    res.status(200).send(branchs)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}

//Market delete
module.exports.delete = async (req, res) => {
  try {
    const { branchId } = req.body

    const branch = await Market.findById(branchId)
    branch.isArchive = true
    await branch.save()

    res.send(branch)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}
