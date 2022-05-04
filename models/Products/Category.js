const { Schema, model, Types } = require('mongoose')
const Joi = require('joi')

const category = new Schema(
  {
    name: { type: String, required: true },
    code: { type: Number, required: true },
    market: { type: Schema.Types.ObjectId, ref: 'Market', required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    producttypes: [{ type: Schema.Types.ObjectId, ref: 'ProductType' }],
    isArchive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

function validateCategory(category) {
  const schema = Joi.object({
    code: Joi.string().required(),
    name: Joi.string().required(),
    market: Joi.string().required(),
  })

  return schema.validate(category)
}

module.exports.validateCategory = validateCategory
module.exports.Category = model('Category', category)
