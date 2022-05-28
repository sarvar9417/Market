const { Packman, validatePackman } = require("../../models/Sales/Packman.js");
const { Market } = require("../../models/MarketAndBranch/Market");

module.exports.register = async (req, res) => {
  try {
    const { name, market } = req.body;
    const { error } = validatePackman(req.body);
    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    const marke = await Market.findById(market);
    if (!marke) {
      return res.status(400).json({
        message: `Diqqat! Do'kon haqida malumotlar topilmadi.`,
      });
    }

    const packman = await Packman.findOne({
      name,
      market,
    });
    if (packman) {
      return res.status(400).json({
        message: `Diqqat! ${name} yetkazuvchi avval yaratilgan!`,
      });
    }

    const newPackman = new Packman({
      name,
      market,
    });

    await newPackman.save();
    res.status(201).send(newPackman);
  } catch (error) {
    res.status(400).json({ error: "Serverda xatolik yuz berdi..." });
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const { market } = req.body;
    const marke = await Market.findById(market);
    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon haqida malumotlari topilmadi!",
      });
    }

    const packman = await Packman.find({ market });

    res.status(201).send(packman);
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
  }
};

module.exports.updatePackman = async (req, res) => {
  try {
    const { _id, market, name } = req.body;
    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(400)
        .json({ message: "Diqqat! Do'kon haqida malumot topilmadi!" });
    }
    const packman = await Packman.findById(_id);
    if (!packman) {
      return res
        .status(400)
        .json({ message: `Diqqat! ${name} yetkazuvchi avval yaratilmagan` });
    }

    await Packman.findByIdAndUpdate(_id, {
      name: name,
    });
    const updatePackman = await Packman.findById(_id).select("name market");
    res.status(201).send(updatePackman);
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
  }
};

module.exports.deletePackman = async (req, res) => {
  try {
    const { _id, market, name } = req.body;
    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(400)
        .json({ message: "Diqqat! Do'kon haqida malumot topilmadi!" });
    }
    const packman = await Packman.findById(_id);
    if (!packman) {
      return res
        .status(400)
        .json({ message: `Diqqat! ${name} yetkazuvchi avval yaratilmagan!` });
    }

    await Packman.findByIdAndDelete(_id);

    res.status(201).send(packman);
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
  }
};
