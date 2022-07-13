const { validateExpense, Expense } = require('../../models/Expense/Expense');
const { Market } = require('../../models/MarketAndBranch/Market');

module.exports.getExpense = async (req, res) => {
  try {
    const { market, currentPage, countPage, startDate, endDate } = req.body;

    const marke = await Market.findById(market);

    if (!marke) {
      return res
        .status(401)
        .json({ message: "Diqqat! Do'kon ma'lumotlari topilmadi." });
    }

    const expenses = await Expense.find({
      market,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .sort({ _id: -1 })
      .select('sum comment type market createdAt');

    res.status(201).json({
      count: expenses.length,
      expenses: expenses.splice(currentPage * countPage, countPage),
    });
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.registerExpense = async (req, res) => {
  try {
    const { currentPage, countPage, startDate, endDate } = req.body;
    const { sum, type, comment, market } = req.body.expense;

    const { error } = validateExpense(req.body.expense);

    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    const marke = await Market.findById(market);

    if (!marke) {
      return res
        .status(401)
        .json({ message: "Diqqat! Do'kon ma'lumotlari topilmadi." });
    }

    const expense = new Expense({
      sum,
      type,
      comment,
      market,
    });

    await expense.save();

    const responseExpense = await Expense.findById(expense._id).select(
      'sum comment type market createdAt'
    );

    res.status(201).json(responseExpense);
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.deleteExpense = async (req, res) => {
  try {
    const { _id, market } = req.body;

    const marke = await Market.findById(market);
    if (!marke) {
      return res
        .status(401)
        .json({ message: "Diqqat! Do'kon ma'lumotlari topilmadi." });
    }

    const expense = await Expense.findById(_id);

    await Expense.findByIdAndDelete(_id);

    res.status(201).json(expense);
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};
