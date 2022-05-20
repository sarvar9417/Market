const { Schema, model, Types } = require('mongoose')
const Joi = require('joi')

const saleproduct = new Schema(
  {
    totalprice: { type: Number, required: true },
    unitprice: { type: Number, required: true },
    pieces: { type: Number, required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    packman: { type: Schema.Types.ObjectId, ref: 'Packman' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    market: { type: Schema.Types.ObjectId, ref: 'Market', required: true },
    isArchive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

function validateSaleProduct(saleproduct) {
  const schema = Joi.object({
    totalprice: Joi.number().required(),
    unitprice: Joi.number().required(),
    pieces: Joi.number().required(),
    product: Joi.string().required(),
    packman: Joi.string(),
    client: Joi.string(),
    user: Joi.string().required(),
    market: Joi.string().required(),
  })
  return schema.validate(saleproduct)
}

module.exports.validateSaleProduct = validateSaleProduct
module.exports.SaleProduct = model('SaleProduct', saleproduct)
