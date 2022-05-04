const { Schema, model, Types } = require('mongoose')
const Joi = require('joi')

const product = new Schema(
  {
    name: { type: String, required: true },
    unit: { type: Schema.Types.ObjectId, ref: 'Unit' },
    code: { type: Number, required: true },
    price: { type: Schema.Types.ObjectId, ref: 'ProductPrice' },
    total: { type: Number, default: 0 },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    producttype: { type: Schema.Types.ObjectId, ref: 'ProductType' },
    market: { type: Schema.Types.ObjectId, ref: 'Market', required: true },
    isArchive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().required(),
    unit: Joi.string(),
    code: Joi.number(),
    price: Joi.string(),
    total: Joi.number(),
    category: Joi.string(),
    producttype: Joi.string(),
    market: Joi.string().required(),
  })

  return schema.validate(product)
}

module.exports.validateProduct = validateProduct
module.exports.Product = model('Product', product)
