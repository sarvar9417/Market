const { Schema, model, Types } = require('mongoose')
const Joi = require('joi')

const discount = new Schema(
  {
    totalprice: { type: Number, required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    packman: { type: Schema.Types.ObjectId, ref: 'Packman' },
    procient: { type: Number },
    discount: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    market: { type: Schema.Types.ObjectId, ref: 'Market', required: true },
    isArchive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

function validateDiscount(discount) {
  const schema = Joi.object({
    totalprice: Joi.number().required(),
    product: Joi.string().required(),
    packman: Joi.string(),
    client: Joi.string(),
    discount: Joi.number(),
    procient: Joi.number(),
    user: Joi.string().required(),
    market: Joi.string().required(),
  })
  return schema.validate(discount)
}

module.exports.validateDiscount = validateDiscount
module.exports.Discount = model('Discount', discount)
