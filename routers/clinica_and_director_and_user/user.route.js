const { User, validateUser, validateUserLogin } = require('../../models/Users')
const bcrypt = require('bcryptjs')
const { Clinica } = require('../../models/DirectorAndClinica/Clinica')
const { Department } = require('../../models/Services/Department')
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

    const {
      _id,
      firstname,
      lastname,
      fathername,
      image,
      phone,
      password,
      clinica,
      specialty,
      type,
      user,
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

    const clinic = await Clinica.findById(clinica)

    if (!clinic) {
      return res.status(400).json({
        message:
          "Diqqat! Foydalanuvchi ro'yxatga olinayotgan klinika dasturda ro'yxatga olinmagan.",
      })
    }

    const olduser = await User.find({
      clinica,
      type,
      firstname,
      lastname,
      specialty,
      isArchive: false,
    })

    if (olduser.length > 0) {
      return res.status(400).json({
        message: "Diqqat! Ushbu foydalanuvchi avval ro'yxatdan o'tkazilgan.",
      })
    }

    const users = await User.find({
      clinica,
      type,
      isArchive: false,
    })

    for (const d of users) {
      const isMatch = await bcrypt.compare(password, d.password)
      if (isMatch) {
        return res.status(400).json({
          message:
            "Diqqat! Prol tizimda xavfsiz bo'lmagan deb topildi. Iltimos boshqa parol yarating.",
        })
      }
    }

    const hash = await bcrypt.hash(password, 8)
    const newUser = new User({
      firstname,
      lastname,
      fathername,
      image,
      phone,
      password: hash,
      clinica,
      type,
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
    const { type, password } = req.body

    const users = await User.find({
      type,
      isArchive: false,
    }).populate('clinica')
    let user = null

    for (const d of users) {
      const isMatch = await bcrypt.compare(password, d.password)
      if (isMatch) {
        user = d
      }
    }

    if (!user) {
      return res.status(400).json({ message: `Parol noto'g'ri kiritilgan` })
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
      clinica: user.clinica,
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

    const user = await User.findById(userId).populate('clinica')

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
    const { clinica, type } = req.body

    if (!clinica) {
      return res.status(400).json({
        error: "Diqqat! Clinica ma'lumotlari topilmadi.",
      })
    }

    const users = await User.find({
      clinica,
      type,
    })

    res.status(201).send(users)
  } catch (error) {
    res.status(501).json({ error: error })
  }
}

module.exports.getUsers = async (req, res) => {
  try {
    const { clinica } = req.body

    const users = await User.find({
      clinica,
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

    const user = await User.findById(userId).populate('clinica')

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
