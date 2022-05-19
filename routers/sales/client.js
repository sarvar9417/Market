const { Client, validateClient } = require("../../models/Sales/Client.js");
const { Market } = require("../../models/MarketAndBranch/Market");

module.exports.register = async (req, res) => {
  try {
    const { error } = validateClient(req.body);
    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    const { name, market } = req.body;

    const client = await Client.findOne({
      name,
      market,
    });

    if (client) {
      return res.status(400).json({
        message: `Diqqat! ${name} mijoz avval yaratilgan!`,
      });
    }

    const marke = await Market.findOne({
      market,
    });
    if (marke) {
      return res.status(400).json({
        message: `Diqqat! Do'kon haqida malumotlar topilmadi.`,
      });
    }

    const newClient = new Client({
      name,
      market,
    });

    await newClient.save();
    res.send(newClient);
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

    const client = await Client.find({ market });

    res.send(client);
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
  }
};

module.exports.updateClient = async (req, res) => {
  try {
    const { _id, market, name } = req.body;
    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(400)
        .json({ message: "Diqqat! Do'kon haqida malumot topilmadi!" });
    }
    const client = await Client.findById({ _id });
    if (!_id) {
      return res
        .status(400)
        .json({ message: `Diqqat! ${name} mijoz avval yaratilmagan` });
    }

    await Client.findByIdAndUpdate(_id, {
      name: name,
    });
    res.send(client);
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
  }
};

module.exports.deleteClient = async (req, res) => {
  try {
    const { _id, market, name } = req.body;

    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(400)
        .json({ message: "Diqqat! Do'kon haqida malumot topilmadi!" });
    }
    const client = await Client.findById(_id);
    if (!client) {
      return res
        .status(400)
        .json({ message: `Diqqat! ${name} mijoz avval yaratilmagan!` });
    }

    await Client.findByIdAndDelete(_id);

    res.send(client);
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
  }
};
