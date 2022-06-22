const { Market } = require('../../models/MarketAndBranch/Market');
const { Payment } = require('../../models/Sales/Payment');
const { SaleConnector } = require('../../models/Sales/SaleConnector');

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

    const sales = await SaleConnector.find({
      market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .select(
        '-isArchive -updatedAt -user  -__v -products -debts -discounts -dailyconnectors'
      )
      .sort({ _id: -1 })
      .populate('payments', 'totalprice payment cash card transfer')
      .populate('client', 'name');

    let salesConnectors = [];
    sales.map((sale) => {
      if (type === 'allpayments') {
        salesConnectors.push({
          _id: sale._id,
          createdAt: sale.createdAt,
          id: sale.id,
          market: sale.market,
          client: sale.client && sale.client.name,
          cash: sale.payments.reduce((prev, payment) => prev + payment.cash, 0),
          card: sale.payments.reduce((prev, payment) => prev + payment.card, 0),
          transfer: sale.payments.reduce(
            (prev, payment) => prev + payment.transfer,
            0
          ),
        });
        return;
      }
      if (sale.payments.some((payment) => payment[`${type}`] > 0)) {
        let obj = {
          _id: sale._id,
          createdAt: sale.createdAt,
          id: sale.id,
          market: sale.market,
          payment: sale.payments.reduce(
            (prev, payment) => prev + payment[`${type}`],
            0
          ),
        };
        salesConnectors.push(obj);
      }
    });

    const totalsales = {
      cash: 0,
      card: 0,
      transfer: 0,
    };

    salesConnectors.map((sale) => {
      if (type === 'allpayments') {
        totalsales.cash += sale.cash;
        totalsales.card += sale.card;
        totalsales.transfer += sale.transfer;
      }
      totalsales[`${type}`] += sale.payment;
    });

    res.status(201).json({
      salesConnectors: salesConnectors.splice(currentPage, countPage),
      totalsales,
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

    const sales = await SaleConnector.find({
      market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .select(
        '-isArchive -updatedAt -user  -__v -products -debts -discounts -dailyconnectors'
      )
      .sort({ _id: -1 })
      .populate('payments', 'totalprice payment cash card transfer')
      .populate('client', 'name');
    console.log(sales);
    let salesConnectors = [];
    sales.map((sale) => {
      if (type === 'allpayments') {
        salesConnectors.push({
          _id: sale._id,
          createdAt: sale.createdAt,
          id: sale.id,
          market: sale.market,
          client: sale.client && sale.client.name,
          cash: sale.payments.reduce((prev, payment) => prev + payment.cash, 0),
          card: sale.payments.reduce((prev, payment) => prev + payment.card, 0),
          transfer: sale.payments.reduce(
            (prev, payment) => prev + payment.transfer,
            0
          ),
        });
        return;
      }
      if (sale.payments.some((payment) => payment[`${type}`] > 0)) {
        let obj = {
          _id: sale._id,
          createdAt: sale.createdAt,
          id: sale.id,
          market: sale.market,
          client: sale.client && sale.client.name,
          payment: sale.payments.reduce(
            (prev, payment) => prev + payment[`${type}`],
            0
          ),
        };
        salesConnectors.push(obj);
      }
    });

    res.status(201).json(salesConnectors);
  } catch (error) {
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};
