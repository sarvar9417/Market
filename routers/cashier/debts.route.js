const {Clinica} = require("../../models/DirectorAndClinica/Clinica");
const {OfflineClient} = require("../../models/OfflineClient/OfflineClient");
const {StatsionarClient} = require("../../models/StatsionarClient/StatsionarClient");
const {StatsionarDiscount} = require("../../models/Cashier/StatsionarDiscount");
const {OfflinePayment} = require("../../models/Cashier/OfflinePayment");
const {StatsionarPayment} = require("../../models/Cashier/StatsionarPayment");

// GET Offline discounts
module.exports.offline = async (req, res) => {
    try {
        const {clinica, beginDay, endDay} = req.body
        const clinic = await Clinica.findById(clinica)

        if (!clinic) {
            return res.status(400).json({
                message: "Diqqat! Klinika ma'lumotlari topilmadi.",
            })
        }
        const debts = await OfflinePayment.find({
            clinica,
            debt: {$gt: 0},
            createdAt: {
                $gte: beginDay,
                $lt: endDay,
            },
        })
            .select('total debt comment connector')
            .populate('client', 'fullname born phone id')
            .sort({_id: -1})
        res.status(200).send(debts)
    } catch (error) {
        res.status(501).json({error: 'Serverda xatolik yuz berdi...'})
    }
}

// GET Statsionar discounts
module.exports.statsionar = async (req, res) => {
    try {
        const {clinica, beginDay, endDay} = req.body
        const clinic = await Clinica.findById(clinica)

        if (!clinic) {
            return res.status(400).json({
                message: "Diqqat! Klinika ma'lumotlari topilmadi.",
            })
        }
        const debts = await StatsionarPayment.find({
            clinica,
            debt: {$gt: 0},
            createdAt: {
                $gte: beginDay,
                $lt: endDay,
            },
        })
            .select('total debt comment')
            .populate('client', 'fullname born phone id')
            .sort({_id: -1})
        res.status(200).send(debts)
    } catch (error) {
        res.status(501).json({error: 'Serverda xatolik yuz berdi...'})
    }
}