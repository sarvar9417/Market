const { Schema, model, Types } = require('mongoose')
const Joi = require('joi')

const product = new Schema(
  {
    name: { type: String, required: true },
    unit: { type: Schema.Types.ObjectId, ref: 'Unit' },
    code: { type: Number, required: true },
    sellingprice: { type: Number },
    incomingprice: { type: Number },
    total: { type: Number, default: 0 },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    producttype: { type: Schema.Types.ObjectId, ref: 'ProductType' },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
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
    sellingprice: Joi.number(),
    incomingprice: Joi.number(),
    total: Joi.number(),
    category: Joi.string(),
    producttype: Joi.string(),
    brand: Joi.string(),
    market: Joi.string().required(),
  })

  return schema.validate(product)
}

function validateProductExcel(product) {
  const schema = Joi.object({
    name: Joi.string().required(),
    unit: Joi.string(),
    producttype: Joi.string(),
    code: Joi.number().required(),
    categorycode: Joi.number(),
    brand: Joi.string(),
    category: Joi.string(),
  })

  return schema.validate(product)
}

module.exports.validateProduct = validateProduct
module.exports.validateProductExcel = validateProductExcel
module.exports.Product = model('Product', product)
