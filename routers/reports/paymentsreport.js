const { Market } = require('../../models/MarketAndBranch/Market');
const { Payment } = require('../../models/Sales/Payment');

module.exports.getPayments = async (req, res) => {
  try {
    const { market, startDate, endDate, currentPage, countPage, type } =
      req.body;

    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(401)
        .json({ message: `Diqqat! Do'kon haqida malumotlar topilmadi!` });
    }

    const payments = await Payment.find({
      market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .select('-isArchive -updatedAt -user -market -__v -products')
      .sort({ _id: -1 })
      .populate({
        path: 'saleconnector',
        select: 'client',
        populate: {
          path: 'client',
          select: 'name',
        },
      });

    const filter = payments.filter((payment) => {
      if (type === 'cash') {
        return payment.cash > 0;
      }
      if (type === 'card') {
        return payment.card > 0;
      }
      if (type === 'transfer') {
        return payment.transfer > 0;
      }
    });

    const totalpayments = filter.reduce((prev, payment) => {
      if (type === 'cash') {
        return prev + payment.cash;
      }
      if (type === 'card') {
        return prev + payment.card;
      }
      if (type === 'transfer') {
        return prev + payment.transfer;
      }
    }, 0);

    res.status(201).json({
      paymentsCount: filter.length,
      payments: filter.splice(currentPage * countPage, countPage),
      totalpayments,
    });
  } catch (error) {
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getPaymentsExcel = async (req, res) => {
  try {
    const { market, type, startDate, endDate } = req.body;

    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(401)
        .json({ message: `Diqqat! Do'kon haqida malumotlar topilmadi!` });
    }

    const payments = await Payment.find({
      market,
      type,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    }).select('-isArchive -updatedAt -user -market -__v -products');

    res.status(201).json(payments);
  } catch (error) {
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};
