const { Schema, model, Types } = require('mongoose')
const Joi = require('joi')

const incoming = new Schema(
  {
    totalprice: { type: Number, required: true },
    unitprice: { type: Number, required: true },
    pieces: { type: Number, required: true },
    file: { type: String },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    unit: { type: Schema.Types.ObjectId, ref: 'Unit', required: true },
    supplier: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    market: { type: Schema.Types.ObjectId, ref: 'Market', required: true },
    isArchive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

function validateIncoming(incoming) {
  const schema = Joi.object({
    totalprice: Joi.number().required(),
    unitprice: Joi.number().required(),
    pieces: Joi.number().required(),
    product: Joi.string().required(),
    category: Joi.string().required(),
    unit: Joi.string().required(),
    supplier: Joi.string().required(),
    user: Joi.string().required(),
    file: Joi.string(),
    market: Joi.string().required(),
  })

  return schema.validate(incoming)
}

module.exports.validateIncoming = validateIncoming
module.exports.Incoming = model('Incoming', incoming)
