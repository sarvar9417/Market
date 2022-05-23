const { Schema, model, Types } = require('mongoose')
const Joi = require('joi')

const saleproduct = new Schema(
  {
    totalprice: { type: Number, required: true },
    unitprice: { type: Number, required: true },
    pieces: { type: Number, required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
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
    market: Joi.string(),
  })
  return schema.validate(saleproduct)
}

module.exports.validateSaleProduct = validateSaleProduct
module.exports.SaleProduct = model('SaleProduct', saleproduct)
