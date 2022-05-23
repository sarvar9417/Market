const { Market } = require('../../models/MarketAndBranch/Market')
const { User } = require('../../models/Users')
const { SaleConnector } = require('../../models/Sales/SaleConnector')
const { Discount } = require('../../models/Sales/Discount')
const { Debt } = require('../../models/Sales/Debt')
const {
  validateSaleProduct,
  SaleProduct,
} = require('../../models/Sales/SaleProduct')
const { Client } = require('../../models/Sales/Client')
const { Packman } = require('../../models/Sales/Packman')
const { Payment } = require('../../models/Sales/Payment')
const { checkPayments } = require('./saleproduct/checkData')

module.exports.register = async (req, res) => {
  try {
    const {
      saleproducts,
      client,
      packman,
      discount,
      payment,
      debt,
      market,
      user,
    } = req.body

    const marke = await Market.findById(market)
    if (!marke) {
      return res.status(400).json({
        message: `Diqqat! Do'kon haqida malumotlar topilmadi!`,
      })
    }

    const use = await User.findById(user)

    if (!use) {
      return res.status(400).json({
        message: `Diqqat! Avtorizatsiyadan o'tilmagan!`,
      })
    }

    const totalprice = saleproducts.reduce((summ, saleproduct) => {
      return summ + saleproduct.totalprice
    }, 0)

    if (checkPayments(totalprice, payment, discount, debt)) {
      return res.status(400).json({
        message: `Diqqat! To'lov hisobida xatolik yuz bergan!`,
      })
    }

    let all = []

    // Create SaleProducts
    for (const saleproduct of saleproducts) {
      const { totalprice, unitprice, pieces, _id } = saleproduct
      const { error } = validateSaleProduct({
        totalprice,
        unitprice,
        pieces,
        product: _id,
      })

      if (error) {
        return res.status(400).json({
          error: error.message,
        })
      }

      const newSaleProduct = new SaleProduct({
        totalprice,
        unitprice,
        pieces,
        product: _id,
        market,
        user,
      })

      all.push(newSaleProduct)
    }

    const saleconnector = new SaleConnector({
      user,
      market,
    })

    await saleconnector.save()

    let products = []

    for (const saleproduct of all) {
      await saleproduct.save()
      products.push(saleproduct._id)
    }

    if (discount.discount > 0) {
      const newDiscount = new Discount({
        discount: discount.discount,
        comment: discount.comment,
        procient: discount.procient,
        market,
        totalprice,
        user,
        saleconnector: saleconnector._id,
        products,
      })
      await newDiscount.save()
      saleconnector.discounts.push(newDiscount._id)
    }

    if (debt.debt > 0) {
      const newDebt = new Debt({
        comment: debt.comment,
        debt: debt.debt,
        totalprice,
        market,
        user,
        saleconnector: saleconnector._id,
        products,
      })
      await newDebt.save()
      saleconnector.debts.push(newDebt._id)
    }

    if (payment.payment > 0) {
      const newPayment = new Payment({
        payment: payment.payment,
        card: payment.card,
        cash: payment.cash,
        transfer: payment.transfer,
        type: payment.type,
        totalprice,
        market,
        user,
        saleconnector: saleconnector._id,
        products,
      })
      await newPayment.save()
      saleconnector.payments.push(newPayment._id)
    }

    if (packman) {
      saleconnector.packman = packman._id
    }

    if (client) {
      if (client._id) {
        saleconnector.client = client._id
      } else {
        const newClient = new Client({
          market,
          name: client.name,
        })
        await newClient.save()
        if (packman) {
          await Packman.findByIdAndUpdate(packman._id, {
            $push: {
              clients: newClient._id,
            },
          })
        }
        saleconnector.client = newClient._id
      }
    }

    saleconnector.products = [...products]
    await saleconnector.save()

    res.status(201).send('created')
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' })
  }
}
