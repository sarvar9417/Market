const { Administration } = require('../../models/Administration/Administrator');
const { Market } = require('../../models/MarketAndBranch/Market');
const { User } = require('../../models/Users');

module.exports.getmarkets = async (req, res) => {
  try {
    const { administrator, currentPage, countPage, search } = req.body;

    const administration = await Administration.findById(administrator);

    if (!administration) {
      return res.status(400).json({
        message: "Diqqat! Avtorizatsiyadan o'tilmagan.",
      });
    }

    const director = new RegExp(
      '.*' + search ? search.director : '' + '.*',
      'i'
    );
    const name = new RegExp('.*' + search ? search.name : '' + '.*', 'i');

    const markets = await Market.find({ name: name })
      .sort({ createdAt: -1 })
      .populate({
        path: 'director',
        select: 'firstname lastname',
        match: { $or: [{ firstname: director }, { lastname: director }] },
      });

    let filter = markets.filter((market) => {
      return market.director !== null;
    });

    const count = filter.length;
    filter = filter.splice(currentPage * countPage, countPage);
    res.status(201).json({
      markets: filter,
      count,
    });
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.getmarketcontrols = async (req, res) => {
  try {
    const { administrator, currentPage, countPage, search, marketId } =
      req.body;

    const administration = await Administration.findById(administrator);

    if (!administration) {
      return res.status(400).json({
        message: "Diqqat! Avtorizatsiyadan o'tilmagan.",
      });
    }

    const director = new RegExp(
      '.*' + search ? search.director : '' + '.*',
      'i'
    );
    const name = new RegExp('.*' + search ? search.name : '' + '.*', 'i');

    const markets = await Market.find({ name: name, _id: { $ne: marketId } })
      .sort({ createdAt: -1 })
      .select('filials connections mainmarket image name phone1')
      .populate({
        path: 'director',
        select: 'firstname lastname',
        match: { $or: [{ firstname: director }, { lastname: director }] },
      });

    let filter = markets.filter((market) => {
      return market.director !== null;
    });

    const count = filter.length;

    const market = await Market.findById(marketId)
      .select('name filials connections phone1 phone2 phone3 permission')
      .populate('director', 'firstname lastname phone');

    filter = filter.splice(currentPage * countPage, countPage);
    res.status(201).json({
      markets: filter,
      count,
      market,
    });
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};

module.exports.updatemarkets = async (req, res) => {
  try {
    const { administrator, currentPage, countPage, search, market, filial } =
      req.body;

    const administration = await Administration.findById(administrator);

    if (!administration) {
      return res.status(400).json({
        message: "Diqqat! Avtorizatsiyadan o'tilmagan.",
      });
    }

    await Market.findByIdAndUpdate(market._id, { filials: market.filials });
    if (filial.mainmarket) {
      await Market.findByIdAndUpdate(filial._id, {
        mainmarket: filial.mainmarket,
      });
    } else {
      await Market.findByIdAndUpdate(filial._id, {
        $unset: { mainmarket: 1 },
      });
    }

    const director = new RegExp(
      '.*' + search ? search.director : '' + '.*',
      'i'
    );
    const name = new RegExp('.*' + search ? search.name : '' + '.*', 'i');

    const markets = await Market.find({ name: name, _id: { $ne: market._id } })
      .sort({ createdAt: -1 })
      .select('filials connections mainmarket image name')
      .populate({
        path: 'director',
        select: 'firstname lastname',
        match: { $or: [{ firstname: director }, { lastname: director }] },
      });

    let filter = markets.filter((market) => {
      return market.director !== null;
    });

    const count = filter.length;

    const marke = await Market.findById(market._id)
      .select('name filials connections')
      .populate('director', 'firstname lastname phone');

    filter = filter.splice(currentPage * countPage, countPage);
    res.status(201).json({
      markets: filter,
      count,
      market: marke,
    });
  } catch (error) {
    res.status(501).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};
