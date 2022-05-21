const { Client, validateClient } = require("../../models/Sales/Client.js");
const { Market } = require("../../models/MarketAndBranch/Market");
const { Packman } = require("../../models/Sales/Packman.js");

module.exports.register = async (req, res) => {
  try {
    const { name, market, packman } = req.body;
    const { error } = validateClient({ name, market });

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

    const client = await Client.findOne({
      name,
      market,
    });

    if (client) {
      return res.status(400).json({
        message: `Diqqat! ${name} mijoz avval yaratilgan!`,
      });
    }

    const newClient = new Client({
      name,
      market,
    });
    await newClient.save();
    const checkpackman = await Packman.findById(packman);
    if (checkpackman) {
      newClient.packman = checkpackman._id;
      await Packman.findByIdAndUpdate(checkpackman._id, {
        $push: {
          clients: newClient,
        },
      });
      await newClient.save();
    }

    const sendingClient = await Client.findById(newClient._id)
      .select("name")
      .populate("packman", "name");

    res.status(201).send(sendingClient);
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

    const client = await Client.find({ market })
      .select("name")
      .populate("packman", "name");

    res.status(201).send(client);
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
  }
};

module.exports.updateClient = async (req, res) => {
  try {
    const { _id, market, name, packman } = req.body;
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
        .json({ message: `Diqqat! ${name} mijoz avval yaratilmagan` });
    }

    const updatedClient = {
      name: name,
    };
    const packMan = await Packman.findById(packman);
    if (packMan) {
      await Packman.findByIdAndUpdate(client.packman._id, {
        $pull: {
          clients: client._id,
        },
      });
      console.log(packMan);
      if (client.packman._id !== packMan._id) {
        await Packman.findByIdAndUpdate(packMan._id, {
          $push: {
            clients: { _id, name },
          },
        });
      } else {
        await Packman.findByIdAndUpdate(client.packman._id, {
          $push: {
            clients: { _id, name },
          },
        });
      }
      updatedClient.packman = { name: packMan.name, _id: packMan._id };
    }

    await Client.findByIdAndUpdate(_id, {
      ...updatedClient,
    });

    const sendingClient = await Client.findById(_id);

    res.status(201).send(sendingClient);
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
  }
};

module.exports.deleteClient = async (req, res) => {
  try {
    const { _id, market, name, packman } = req.body;

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

    const packMan = await Packman.findById(packman);

    if (packMan) {
      await Packman.findByIdAndUpdate(packman, {
        $pull: {
          clients: client._id,
        },
      });
    }
    await Client.findByIdAndDelete(_id);

    res.status(201).send(client);
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
  }
};