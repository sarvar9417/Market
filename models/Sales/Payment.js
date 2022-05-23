const { Schema, model, Types } = require('mongoose')
const Joi = require('joi')

const payment = new Schema(
  {
    totalprice: { type: Number, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
    payment: { type: Number, required: true },
    cash: { type: Number, required: true },
    card: { type: Number, required: true },
    transfer: { type: Number, required: true },
    type: { type: String, required: true },
    saleconnector: {
      type: Schema.Types.ObjectId,
      ref: 'SaleConnector',
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    market: { type: Schema.Types.ObjectId, ref: 'Market', required: true },
    isArchive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

function validatePayment(payment) {
  const schema = Joi.object({
    totalprice: Joi.number().required(),
    products: Joi.array().required(),
    payment: Joi.number(),
    card: Joi.number(),
    cash: Joi.number(),
    transfer: Joi.number(),
    type: Joi.string(),
    saleconnector: Joi.string(),
    user: Joi.string().required(),
    market: Joi.string().required(),
  })
  return schema.validate(payment)
}

module.exports.validatePayment = validatePayment
module.exports.Payment = model('Payment', payment)
