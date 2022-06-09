const { Product } = require('../../models/Products/Product');
const { Market } = require('../../models/MarketAndBranch/Market');
const { Category } = require('../../models/Products/Category');
const { ProductType } = require('../../models/Products/ProductType');
const { Unit } = require('../../models/Products/Unit');
const { Brand } = require('../../models/Products/Brand');
const { ProductPrice } = require('../../models/Products/ProductPrice');
const {
  InventoryConnector,
} = require('../../models/Inventory/InventoriesConnector');
const { Inventory } = require('../../models/Inventory/Inventory');

//Product for Inventory
module.exports.getProductsInventory = async (req, res) => {
  try {
    const { market, currentPage, countPage, search } = req.body;

    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(401)
        .json({ message: "Diqqat! Do'kon malumotlari topilmadi" });
    }

    const categorycode = new RegExp(
      '.*' + search ? search.categorycode : '' + '.*',
      'i'
    );
    const productcode = new RegExp(
      '.*' + search ? search.productcode : '' + '.*',
      'i'
    );
    const producttype = new RegExp(
      '.*' + search ? search.producttype : '' + '.*',
      'i'
    );
    const productname = new RegExp(
      '.*' + search ? search.productname : '' + '.*',
      'i'
    );
    const brandname = new RegExp('.*' + search ? search.brand : '' + '.*', 'i');

    const products = await Product.find({
      code: productcode,
      name: productname,
      market,
    })
      .sort({ _id: -1 })
      .select('name category producttype brand code total unit price')
      .populate({
        path: 'category',
        match: { code: categorycode },
        select: 'code',
      })
      .populate({
        path: 'producttype',
        match: { name: producttype },
        select: 'name',
      })
      .populate({ path: 'brand', match: { name: brandname }, select: 'name' })
      .populate('unit', 'name');

    const filter = products.filter((item) => {
      return (
        ((search.categorycode.length > 0 && item.category !== null) ||
          search.categorycode.length === 0) &&
        ((search.producttype.length > 0 &&
          item.producttype &&
          item.producttype !== null) ||
          search.producttype.length === 0) &&
        ((search.brand.length > 0 && item.brand && item.brand !== null) ||
          search.brand.length === 0)
      );
    });
    const count = filter.length;

    const sendingProducts = filter.splice(countPage * currentPage, countPage);

    let inventoryConnector = await InventoryConnector.findOne({
      market,
      completed: false,
    });

    let inventoryConnectorCount = await InventoryConnector.find({
      market,
    }).count();

    if (!inventoryConnector) {
      inventoryConnector = new InventoryConnector({
        id: 'INV-' + (inventoryConnectorCount + 1),
        market,
      });
      await inventoryConnector.save();
    }

    let inventories = [];

    for (const product of sendingProducts) {
      let inventory = await Inventory.findOne({
        market,
        inventoryConnector: inventoryConnector._id,
        product: product._id,
      });
      if (!inventory) {
        inventory = new Inventory({
          market,
          inventoryConnector: inventoryConnector._id,
          product: product._id,
          price: product.price._id,
          category: product.category._id,
          unit: product.unit._id,
        });

        await inventory.save();
      }
      inventories.push(inventory);
    }

    res.status(201).json({
      products: sendingProducts,
      count,
      inventories,
    });
  } catch (error) {
    res.status(401).json({ message: 'Serverda xatolik yuz berdi...' });
  }
};

//Product for Inventory
module.exports.updateInventory = async (req, res) => {
  try {
    const { market, inventory } = req.body;
    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(401)
        .json({ message: "Diqqat! Do'kon ma'lumotlari topilmadi" });
    }

    await Inventory.findByIdAndUpdate(inventory._id, inventory);

    res.status(201).json(inventory);
  } catch (error) {
    res.status(401).json({ message: 'Serverda xatolik yuz berdi...' });
  }
};

//Product for Inventory
module.exports.completed = async (req, res) => {
  try {
    const { market, inventory } = req.body;
    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(401)
        .json({ message: "Diqqat! Do'kon malumotlari topilmadi" });
    }
    await InventoryConnector.findByIdAndUpdate(inventory.inventoryConnector, {
      completed: true,
    });

    res.status(201).json(inventory);

    const inventoryConnector = await InventoryConnector.findById(
      inventory.inventoryConnector
    )
      .select('inventories')
      .populate('inventories', 'inventorycount inventoryConnector');

    inventoryConnector.inventories.map(async (inventory) => {
      if (!inventory.inventorycount) {
        await Inventory.findByIdAndDelete(inventory._id);
        await InventoryConnector.findByIdAndUpdate(
          inventory.inventoryConnector,
          {
            $push: {
              products: inventory._id,
            },
          }
        );
      }
    });
  } catch (error) {
    res.status(401).json({ message: 'Serverda xatolik yuz berdi...' });
  }
};
