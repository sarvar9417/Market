const { Schema, model, Types } = require('mongoose')
const Joi = require('joi')

const productprice = new Schema(
  {
    price: { type: String, required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    market: { type: Schema.Types.ObjectId, ref: 'Market', required: true },
    isArchive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

function validateProductPrice(productprice) {
  const schema = Joi.object({
    price: Joi.string().required(),
    product: Joi.string().required(),
    market: Joi.string().required(),
  })

  return schema.validate(productprice)
}

module.exports.validateProductPrice = validateProductPrice
module.exports.ProductPrice = model('ProductPrice', productprice)
