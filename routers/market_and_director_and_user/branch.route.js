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
          "Diqqat! Ushbu nomdagi filifal mavjud. Iltimos filial nomida biroz o'zgartirish qilib keyin kiriting.",
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
