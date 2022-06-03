const bcrypt = require("bcryptjs/dist/bcrypt");
const { FilialProduct } = require("../../models/FilialProducts/FilialProduct");
const {
  Branch,
  validateBranch,
} = require("../../models/MarketAndBranch/Branch");
const { Market } = require("../../models/MarketAndBranch/Market");
const { Product } = require("../../models/Products/Product");
const { ProductPrice } = require("../../models/Products/ProductPrice");
const { validateUser, User } = require("../../models/Users");

module.exports.register = async (req, res) => {
  try {
    const { error } = validateBranch(req.body);

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
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
    } = req.body;

    const branch = await Branch.find({ name, market });

    if (branch.length > 0) {
      return res.status(400).json({
        message:
          "Diqqat! Ushbu nomdagi filifal mavjud. Iltimos filial nomida o'zgartirish qilib keyin kiriting.",
      });
    }

    const newMarket = new Branch({
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
    });
    await newMarket.save();

    await Market.findByIdAndUpdate(market, {
      $push: {
        filials: newMarket._id,
      },
    });
    const products = await Product.find({ market });
    for (let product of products) {
      const filialproduct = new FilialProduct({
        product: product._id,
        producttype: product.producttype,
        category: product.category,
        unit: product.unit,
        brand: product.brand,
        market: newMarket._id,
      });

      const pric = await ProductPrice.findById(product.price);

      if (pric) {
        const newPrice = new ProductPrice({
          incomingprice: pric.sellingprice,
          sellingprice: 0,
          market: newMarket._id,
        });
        await newPrice.save();
        filialproduct.price = newPrice._id;
      }
      await filialproduct.save();
    }

    res.status(201).json(newMarket);
  } catch (error) {
    res.status(501).json({ message: "Serverda xatolik yuz berdi..." });
  }
};

module.exports.update = async (req, res) => {
  try {
    const { branch } = req.body;

    if (!branch.market) {
      return res.status(400).json({
        message: "Do'kon asosiy do'kon ma'lumotlari topilmadi",
      });
    }

    const update = await Branch.findByIdAndUpdate(branch._id, { ...branch });
    res.status(201).send(update);
  } catch (error) {
    res.status(501).json({ message: "Serverda xatolik yuz berdi..." });
  }
};

module.exports.getBranch = async (req, res) => {
  try {
    const { market, currentPage, countPage, searching } = req.body;
    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(400)
        .json({ message: "Diqqat! Do'kon malumotlari topilmadi!" });
    }

    if (searching) {
      const searched = await Branch.find({ market, name: searching })
        .sort({ _id: -1 })
        .skip(currentPage * countPage)
        .limit(countPage)
        .populate("market", "name");

      const searchedCount = await Branch.find({
        market,
        name: searching,
      }).count();
      return res.status(201).json({ branches: searched, count: searchedCount });
    } else {
      const branches = await Branch.find({ market })
        .sort({ _id: -1 })
        .skip(currentPage * countPage)
        .limit(countPage)
        .populate("market", "name");

      const countBranches = await Branch.find({ market }).count();

      return res.status(201).json({ branches, count: countBranches });
    }
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
  }
};

//Market delete
module.exports.delete = async (req, res) => {
  try {
    const { branchId } = req.body;

    const branch = await Market.findById(branchId);
    branch.isArchive = true;
    await branch.save();

    res.send(branch);
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
  }
};

module.exports.registerBranchDirector = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({
        error: error.message,
      });
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
    } = req.body;

    const marke = await Branch.findById(market);

    if (!marke) {
      return res.status(400).json({
        message:
          "Diqqat! Foydalanuvchi ro'yxatga olinayotgan do'kon dasturda ro'yxatga olinmagan.",
      });
    }

    const olduser = await User.findOne({
      login,
    });

    if (olduser) {
      return res.status(400).json({
        message: "Diqqat! Ushbu foydalanuvchi avval ro'yxatdan o'tkazilgan.",
      });
    }

    const hash = await bcrypt.hash(password, 8);
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
    });
    await newUser.save();

    res.status(201).send(newUser);
  } catch (error) {
    res.status(501).json({ error: "Serverda xatolik yuz berdi..." });
  }
};
