const { Schema, model, Types } = require('mongoose')
const Joi = require('joi')

const saleproduct = new Schema(
  {
    totalprice: { type: Number, required: true },
    unitprice: { type: Number, required: true },
    pieces: { type: Number, required: true },
    file: { type: String },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    producttype: {
      type: Schema.Types.ObjectId,
      ref: 'ProductType',
    },
    unit: { type: Schema.Types.ObjectId, ref: 'Unit', required: true },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
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
    category: Joi.string().required(),
    producttype: Joi.string().required(),
    unit: Joi.string().required(),
    supplier: Joi.string().required(),
    user: Joi.string().required(),
    file: Joi.string(),
    market: Joi.string().required(),
  })
  return schema.validate(saleproduct)
}

module.exports.validateSaleProduct = validateSaleProduct
module.exports.validateSaleProductAll = validateSaleProductAll
module.exports.SaleProduct = model('SaleProduct', saleproduct)
