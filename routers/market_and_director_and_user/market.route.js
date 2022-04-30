const {
  Market,
  validateMarket,
} = require('../../models/DirectorAndMarket/Market')

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
    } = req.body

    const market = await Market.find({ name })

    if (market.length > 0) {
      return res.status(400).json({
        message:
          "Diqqat! Klinika nomida biroz o'zgartirish qilib keyin kiriting.",
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
    })

    await newMarket.save()

    res.status(201).send(newMarket)
  } catch (error) {
    res.status(501).json({ message: error })
  }
}

module.exports.getMarket = async (req, res) => {
  try {
    const { marketId } = req.body
    if (!marketId) {
      return res.status(400).json({
        message: "Diqqat! Market ID si ko'rsatilmagan.",
      })
    }

    const market = await Market.findById(marketId)

    if (!market) {
      return res.status(400).json({
        message: "Diqqat! Ko'rsatilgan klinika ro'yxatdan o'tkazilmagan.",
      })
    }

    res.status(200).send(market)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}