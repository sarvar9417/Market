const {
  Director,
  validateDirector,
  validateDirectorLogin,
} = require("../../models/DirectorAndMarket/Director");
const bcrypt = require("bcryptjs");
const { Market } = require("../../models/DirectorAndMarket/Market");
const config = require("config");
const jwt = require("jsonwebtoken");

//Director register
module.exports.register = async (req, res) => {
  try {
    const { error } = validateDirector(req.body);
    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    const { firstname, lastname, fathername, image, phone, password, market, login } =
      req.body;

    const marke = await Market.findById(market);

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Ushbu do'kon mavjud emas.",
      });
    }

    const director = await Director.findOne({
      market,
    });

    if (director) {
      return res.status(400).json({
        message:
          "Diqqat! Ushbu do'kon direktori allaqachon ro'yxatdan o'tgan.",
      });
    }

    const hash = await bcrypt.hash(password, 8);
    const newDirector = new Director({
      login,
      firstname,
      lastname,
      fathername,
      image,
      phone,
      password: hash,
      market,
      type: "Director",
    });
    await newDirector.save();

    const token = jwt.sign(
      {
        userId: newDirector._id,
      },
      config.get("jwtSecret"),
      { expiresIn: "12h" }
    );

    res.send({
      token,
      userId: newDirector._id,
      user: newDirector,
      market: marke,
    });
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
  }
};

// Director LOGIN
module.exports.login = async (req, res) => {
  try {
    const { error } = validateDirectorLogin(req.body);
    if (error) {
      return res.status(400).json({
        error: "Ma'lumot kiritishda xatolikka yo'l qo'yilgan",
        message: error.message,
      });
    }
    const { password, login } = req.body;

    const director = await Director.findOne({
      login,
    }).populate("market");

    if (!director) {
      return res.status(400).json({ message: `Login yoki parol noto'g'ri kiritilgan` });
    }
    console.log(director)
    const isMatch = await bcrypt.compare(password, director.password);
    if (!isMatch) {
        return res.status(400).json({ message: `Login yoki parol noto'g'ri kiritilgan` });
      }
    const token = jwt.sign(
      {
        userId: director._id,
      },
      config.get("jwtSecret"),
      { expiresIn: "12h" }
    );

    res.send({
      token,
      userId: director._id,
      user: director,
      market: director.market,
    });
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Serverda xatolik yuz berdi" });
  }
};

// Director UPADATE
module.exports.update = async (req, res) => {
  try {
    const { type, market } = req.body;

    const found = await Director.find({
      market,
      type,
    }).select("-password");

    if (found.length === 0) {
      return res.status(400).json({
        message: "Diqqat! Foydalanuvchi tizimda ro'yxatga olinmagan.",
      });
    }

    const director = await Director.findByIdAndUpdate(
      req.body._id,
      req.body
    ).select("-password");

    res.send(director);
  } catch (e) {
    res.status(500).json({ message: "Serverda xatolik yuz berdi" });
  }
};

// Director UPADATEPASSWORD
module.exports.updatePassword = async (req, res) => {
  try {
    const { oldpassword, newpassword, directorId } = req.body;

    const director = await Director.findById(directorId);

    if (!director) {
      return res.status(400).json({
        message: "Diqqat! Foydalanuvchi tizimda ro'yxatga olinmagan.",
      });
    }

    const isMatch = await bcrypt.compare(oldpassword, director.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Joriy parol noto'g'ri kiritilgan" });
    }

    const hash = await bcrypt.hash(newpassword, 8);
    director.password = hash;
    await director.save();

    res.send(director);
  } catch (e) {
    res.status(500).json({ message: "Serverda xatolik yuz berdi" });
  }
};

module.exports.getDirector = async (req, res) => {
  try {
    const { directorId } = req.body;

    if (!directorId) {
      return res.status(400).json({
        error: "Diqqat! Direktor ID si ko'rsatilmagan",
      });
    }

    const director = await Director.findById(directorId)
      .populate("market")
      .select("-password");

    if (!director) {
      return res.status(400).json({
        error: "Diqqat! Ushbu direktor ma'lumotlari ro'yxatdan o'tkazilmagan.",
      });
    }

    res.status(201).send(director);
  } catch (error) {
    res.status(501).json({ error: error });
  }
};
