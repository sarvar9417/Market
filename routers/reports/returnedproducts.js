const { Market } = require('../../models/MarketAndBranch/Market');
const { SaleConnector } = require('../../models/Sales/SaleConnector');

module.exports.getReturnedProducts = async (req, res) => {
  try {
    const { market, countPage, currentPage, startDate, endDate, search } =
      req.body;
    const marke = await Market.findById(market);
    if (!marke) {
      return res.status(400).json({
        message: `Diqqat! Do'kon haqida malumotlar topilmadi!`,
      });
    }

    const id = new RegExp('.*' + search ? search.id : '' + '.*', 'i');

    const name = new RegExp('.*' + search ? search.client : '' + '.*', 'i');

    const returnedproducts = await SaleConnector.find({
      market,
      id,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .select('-isArchive -updatedAt -market -__v')
      .sort({ _id: -1 })
      .populate({
        path: 'products',
        select:
          'totalprice unitprice totalpriceuzs unitpriceuzs pieces createdAt discount',
        match: {
          pieces: { $lt: 0 },
        },
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'product',
          select: 'productdata',
          populate: { path: 'productdata', select: 'name code' },
        },
      })
      .populate('payments', 'payment paymentuzs comment')
      .populate('discounts', 'discount discountuzs procient products')
      .populate('debts', 'debt debtuzs')
      .populate({ path: 'client', match: { name: name }, select: 'name' })
      .populate('packman', 'name')
      .populate('user', 'firstname lastname');

    const filter = [];
    returnedproducts.map((item) => {
      if (item.products.length > 0) {
        item.products.map((prod) => {
          let obj = {
            createdAt: prod.createdAt,
            pieces: prod.pieces,
            product: prod.product,
            totalprice: prod.totalprice,
            totalpriceuzs: prod.totalpriceuzs,
            unitprice: prod.unitprice,
            unitpriceuzs: prod.unitpriceuzs,
            id: item.id,
            _id: prod._id,
          };
          filter.push(obj);
        });
      }
    });

    res.status(201).json({
      count: filter.length,
      returnedproducts: filter.splice(currentPage * countPage, countPage),
    });
  } catch (error) {
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getReturnedProductsExcel = async (req, res) => {
  try {
    const { market, startDate, endDate, search } = req.body;
    const marke = await Market.findById(market);
    if (!marke) {
      return res.status(400).json({
        message: `Diqqat! Do'kon haqida malumotlar topilmadi!`,
      });
    }

    const id = new RegExp('.*' + search ? search.id : '' + '.*', 'i');

    const name = new RegExp('.*' + search ? search.client : '' + '.*', 'i');

    const returnedproducts = await SaleConnector.find({
      market,
      id,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .select('-isArchive -updatedAt -market -__v')
      .sort({ _id: -1 })
      .populate({
        path: 'products',
        match: {
          pieces: { $lt: 0 },
        },
        select:
          'totalprice unitprice totalpriceuzs unitpriceuzs pieces createdAt discount',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'product',
          select: 'productdata',
          populate: { path: 'productdata', select: 'name code' },
        },
      })
      .populate('payments', 'payment paymentuzs comment')
      .populate('discounts', 'discount discountuzs procient products')
      .populate('debts', 'debt debtuzs')
      .populate({ path: 'client', match: { name: name }, select: 'name' })
      .populate('packman', 'name')
      .populate('user', 'firstname lastname');

    const filter = [];
    returnedproducts.map((item) => {
      if (item.products.length > 0) {
        item.products.map((prod) => {
          let obj = {
            createdAt: prod.createdAt,
            pieces: prod.pieces,
            product: prod.product,
            totalprice: prod.totalprice,
            totalpriceuzs: prod.totalpriceuzs,
            unitprice: prod.unitprice,
            unitpriceuzs: prod.unitpriceuzs,
            id: item.id,
            _id: prod._id,
          };
          filter.push(obj);
        });
      }
    });

    res.status(201).json(filter);
  } catch (error) {
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};
