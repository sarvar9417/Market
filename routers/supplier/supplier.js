const {
  Supplier,
  validateSupplier,
} = require("../../models/Supplier/Supplier");
const { Market } = require("../../models/MarketAndBranch/Market");

//Supplier register

module.exports.register = async (req, res) => {
  try {
    const { error } = validateSupplier(req.body);
    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    const { name, market } = req.body;

    const supplier = await Supplier.findOne({
      market,
      name,
    });

    if (supplier) {
      return res.status(400).json({
        message: "Diqqat! Ushbu yetkazib beruvchi avval yaratilgan.",
      });
    }

    const marke = await Market.findById(market);

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }

    const newSupplier = new Supplier({
      name,
      market,
    });
    await newSupplier.save();

    res.send(newSupplier);
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
  }
};

//Supplier update
module.exports.update = async (req, res) => {
  try {
    const { name, market } = req.body;

    const marke = await Market.findById(market);

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }

    const old = await Supplier.findOne({
      market,
      name,
    });

    if (old) {
      return res.status(400).json({
        message: "Diqqat! Ushbu yetkazib beruvchi avval yaratilgan.",
      });
    }

    const supplier = await Supplier.findById(req.body._id);

    if (!supplier) {
      return res.status(400).json({
        message: "Diqqat! Ushbu yetkazib beruvchi topilmadi.",
      });
    }

    supplier.name = name;
    await supplier.save();

    res.send(supplier);
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
  }
};

//Supplier update
module.exports.delete = async (req, res) => {
  try {
    const { _id } = req.body;

    const supplier = await Supplier.findByIdAndDelete(_id);

    res.send(supplier);
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
  }
};

//Supplier getall
module.exports.getAll = async (req, res) => {
  try {
    const { market } = req.body;

    const marke = await Market.findById(market);

    if (!marke) {
      return res.status(400).json({
        message: "Diqqat! Do'kon ma'lumotlari topilmadi.",
      });
    }

    const suppliers = await Supplier.find({
      market,
    }).select("name, market");

    res.send(suppliers);
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
  }
};

module.exports.getSuppliers = async (req, res) => {
  try {
    const { market, currentPage, countPage, searching } = req.body;

    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(401)
        .json({ message: "Diqqat! Do'kon malumotlari topilmadi." });
    }

    if (searching && searching.type === "name") {
      const name = new RegExp(".*" + searching.search + ".*", "i");
      const count = await Supplier.find({ market, name: name }).count();
      const suppliers = await Supplier.find({ market, name: name })
        .sort({ _id: -1 })
        .select("name market")
        .skip(currentPage * countPage)
        .limit(countPage);

      return res.status(201).json({ suppliers: suppliers, count: count });
    } else {
      const count = await Supplier.find({ market }).count();

      const suppliers = await Supplier.find({ market })
        .sort({ _id: -1 })
        .select("name market")
        .skip(currentPage * countPage)
        .limit(countPage);

      res.status(201).json({ suppliers: suppliers, count: count });
    }
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
  }
};
