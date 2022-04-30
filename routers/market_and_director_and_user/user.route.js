const { User, validateUser, validateUserLogin } = require('../../models/Users')
const bcrypt = require('bcryptjs')
const { Market } = require('../../models/MarketAndBranch/Market')
const { Department } = require('../../models/Products/Category')
const config = require('config')
const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectId

module.exports.register = async (req, res) => {
  try {
    const { error } = validateUser(req.body)
    if (error) {
      return res.status(400).json({
        error: error.message,
      })
    }

    console.log(req.body)

    const {
      _id,
      login,
      firstname,
      lastname,
      fathername,
      image,
      phone,
      password,
      market,
      specialty,
      user,
      type,
    } = req.body

    if (_id) {
      if (password) {
        const hash = await bcrypt.hash(password, 8)
        req.body.password = hash
      }
      const update = await User.findByIdAndUpdate(_id, req.body)

      return res.status(201).send({
        message: "Foydalanuvchi ma'lumotlari muvaffaqqiyatli o'zgartirildi!",
      })
    }

    const marke = await Market.findById(market)

    if (!marke) {
      return res.status(400).json({
        message:
          "Diqqat! Foydalanuvchi ro'yxatga olinayotgan do'kon dasturda ro'yxatga olinmagan.",
      })
    }

    const olduser = await User.findOne({
      login,
    })

    if (olduser) {
      return res.status(400).json({
        message: "Diqqat! Ushbu foydalanuvchi avval ro'yxatdan o'tkazilgan.",
      })
    }

    const hash = await bcrypt.hash(password, 8)
    const newUser = new User({
      firstname,
      lastname,
      fathername,
      image,
      phone,
      password: hash,
      market,
      type,
      login,
      specialty,
      user,
    })
    await newUser.save()

    if (user) {
      const counteragent = await User.findByIdAndUpdate(user, {
        $push: {
          users: new ObjectId(newUser._id),
        },
      })
    }

    res
      .status(201)
      .send({ message: 'Foydalanuvchi muvaffaqqiyatli yaratildi!' })
  } catch (error) {
    console.log(error)
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}

module.exports.registerDirector = async (req, res) => {
  try {
    const { error } = validateUser(req.body)
    if (error) {
      return res.status(400).json({
        error: error.message,
      })
    }

    const {
      login,
      firstname,
      lastname,
      fathername,
      image,
      phone,
      password,
      market,
      type,
    } = req.body

    const marke = await Market.findById(market)

    if (!marke) {
      return res.status(400).json({
        message:
          "Diqqat! Foydalanuvchi ro'yxatga olinayotgan do'kon dasturda ro'yxatga olinmagan.",
      })
    }

    const olduser = await User.findOne({
      login,
    })

    if (olduser) {
      return res.status(400).json({
        message: "Diqqat! Ushbu foydalanuvchi avval ro'yxatdan o'tkazilgan.",
      })
    }

    const hash = await bcrypt.hash(password, 8)
    const newUser = new User({
      firstname,
      lastname,
      fathername,
      image,
      phone,
      password: hash,
      market,
      type,
      login,
    })
    await newUser.save()

    const token = jwt.sign(
      {
        userId: newUser._id,
      },
      config.get('jwtSecret'),
      { expiresIn: '12h' },
    )

    res.status(201).send({
      token,
      userId: newUser._id,
      user: newUser,
      market: newUser.market,
    })
  } catch (error) {
    console.log(error)
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}

// User LOGIN
module.exports.login = async (req, res) => {
  try {
    const { error } = validateUserLogin(req.body)
    if (error) {
      return res.status(400).json({
        error: "Ma'lumot kiritishda xatolikka yo'l qo'yilgan",
        message: error.message,
      })
    }
    const { login, password } = req.body

    const user = await User.findOne({
      login,
    }).populate('market')

    if (!user) {
      return res
        .status(400)
        .json({ message: `Login yoki parol noto'g'ri kiritilgan` })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: `Login yoki parol noto'g'ri kiritilgan` })
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      config.get('jwtSecret'),
      { expiresIn: '12h' },
    )

    res.send({
      token,
      userId: user._id,
      user: user,
      market: user.market,
    })
  } catch (e) {
    res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
  }
}

module.exports.getUser = async (req, res) => {
  try {
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({
        error: "Diqqat! Foydalanuvchi ID si ko'rsatilmagan",
      })
    }

    const user = await User.findById(userId).populate('market')

    if (!user) {
      return res.status(400).json({
        error:
          "Diqqat! Ushbu foydalanuvchi ma'lumotlari ro'yxatdan o'tkazilmagan.",
      })
    }

    res.status(201).send(user)
  } catch (error) {
    res.status(501).json({ error: error })
  }
}

module.exports.getUserType = async (req, res) => {
  try {
    const { market, type } = req.body

    if (!market) {
      return res.status(400).json({
        error: "Diqqat! Market ma'lumotlari topilmadi.",
      })
    }

    const users = await User.find({
      market,
      type,
    })

    res.status(201).send(users)
  } catch (error) {
    res.status(501).json({ error: error })
  }
}

module.exports.getUsers = async (req, res) => {
  try {
    const { market } = req.body

    const users = await User.find({
      market,
      isArchive: false,
    })
      .populate('specialty', 'name')
      .select('-password -isArchive -createdAt -updatedAt -__v ')
      .sort({ _id: -1 })

    res.status(201).send(users)
  } catch (error) {
    res.status(501).json({ error: error })
  }
}

module.exports.removeUser = async (req, res) => {
  try {
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({
        error: "Diqqat! Foydalanuvchi ID si ko'rsatilmagan",
      })
    }

    const user = await User.findById(userId).populate('market')

    if (!user) {
      return res.status(400).json({
        error:
          "Diqqat! Ushbu foydalanuvchi ma'lumotlari ro'yxatdan o'tkazilmagan.",
      })
    }

    const updateUser = await User.findByIdAndUpdate(userId, {
      isArchive: true,
    })

    res
      .status(201)
      .send({ message: "Foydalanuvchi muvaffaqqiyatli o'chirildi" })
  } catch (error) {
    res.status(501).json({ error: error })
  }
}
