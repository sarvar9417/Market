const {
  Branch,
  validateBranch,
} = require('../../models/MarketAndBranch/Branch')

module.exports.register = async (req, res) => {
  try {
    const { error } = validateBranch(req.body)

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

    const branch = await Branch.find({ name })

    if (branch.length > 0) {
      return res.status(400).json({
        message:
          "Diqqat! Ushbu nomdagi filifal mavjud. Iltimos filial nomida biroz o'zgartirish qilib keyin kiriting.",
      })
    }

    const newBranch = new Branch({
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

    await newBranch.save()

    res.status(201).send(newBranch)
  } catch (error) {
    res.status(501).json({ message: error })
  }
}

module.exports.edit = async (req, res) => {
  try {
    const { branch } = req.body

    if (!branch.market) {
      return res.status(400).json({
        message: "Do'kon asosiy do'kon m'alumotlari topilmadi",
      })
    }

    const update = await Branch.findByIdAndUpdate(branch._id, { ...branch })
    res.status(201).send(update)
  } catch (error) {
    res.status(501).json({ message: error })
  }
}

module.exports.getBranch = async (req, res) => {
  try {
    const { branchId } = req.body
    if (!branchId) {
      return res.status(400).json({
        message: "Diqqat! Filial ID si ko'rsatilmagan.",
      })
    }

    const branch = await Branch.findById(branchId)

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
    const { marketId } = req.body
    if (!marketId) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ID si ko'rsatilmagan.",
      })
    }

    const branchs = await Branch.find({ market: marketId })

    res.status(200).send(branchs)
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}
