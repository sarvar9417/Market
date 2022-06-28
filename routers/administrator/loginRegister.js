const {
  validateAdministration,
  Administration,
} = require('../../models/Administration/Administrator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports.register = async (req, res) => {
  try {
    const { error } = validateAdministration(req.body);
    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    const { login, password } = req.body;

    const oldadministration = await Administration.findOne({
      login,
    });

    if (oldadministration) {
      return res.status(400).json({
        message:
          "Diqqat! Ushbu nomdagi administrator avval ro'yxatdan o'tkazilgan.",
      });
    }

    const hash = await bcrypt.hash(password, 12);
    const newAdministrator = new Administration({
      password: hash,
      login,
    });
    await newAdministrator.save();

    res
      .status(201)
      .send({ message: 'Foydalanuvchi muvaffaqqiyatli yaratildi!' });
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { error } = validateAdministration(req.body);
    if (error) {
      return res.status(400).json({
        error: "Ma'lumot kiritishda xatolikka yo'l qo'yilgan",
        message: error.message,
      });
    }
    const { login, password } = req.body;

    const administrator = await Administration.findOne({
      login,
    });

    if (!administrator) {
      return res
        .status(400)
        .json({ message: `Login yoki parol noto'g'ri kiritilgan` });
    }

    const isMatch = await bcrypt.compare(password, administrator.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: `Login yoki parol noto'g'ri kiritilgan` });
    }

    const token = jwt.sign(
      {
        alo24: 'Shirina',
        administrator: administrator._id,
      },
      config.get('jwtSecret'),
      { expiresIn: '12h' }
    );

    res.send({
      token,
      administrator: administrator._id,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Serverda xatolik yuz berdi' });
  }
};
