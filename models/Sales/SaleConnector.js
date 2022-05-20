const { Schema, model, Types } = require('mongoose')
const Joi = require('joi')

const saleconnector = new Schema(
  {
    payment: [{ type: Schema.Types.ObjectId, ref: 'Payment' }],
    discount: [{ type: Schema.Types.ObjectId, ref: 'Discount' }],
    debt: [{ type: Schema.Types.ObjectId, ref: 'Debt' }],
    packman: { type: Schema.Types.ObjectId, ref: 'Packman' },
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    products: [{ type: Schema.Types.ObjectId, ref: 'SaleProduct' }],
    market: { type: Schema.Types.ObjectId, ref: 'Market', required: true },
    isArchive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

function validateSaleConnector(saleconnector) {
  const schema = Joi.object({
    total: Joi.number(),
    supplier: Joi.string(),
    sale: Joi.array(),
    user: Joi.string(),
    market: Joi.string(),
  })

  return schema.validate(saleconnector)
}

module.exports.validateSaleConnector = validateSaleConnector
module.exports.SaleConnector = model('SaleConnector', saleconnector)
