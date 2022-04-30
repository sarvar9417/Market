const { Schema, model, Types } = require('mongoose')
const Joi = require('joi')

const branch = new Schema(
  {
    name: { type: String, required: true },
    organitionName: { type: String },
    image: { type: String, required: true },
    phone1: { type: String, required: true },
    phone2: { type: String },
    phone3: { type: String },
    bank: { type: String },
    bankNumber: { type: String },
    inn: { type: Number },
    mfo: { type: Number },
    address: { type: String },
    orientation: { type: String },
    market: { type: Schema.Types.ObjectId, ref: 'Market' },
    isArchive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

function validateBranch(branch) {
  const schema = Joi.object({
    name: Joi.string().required(),
    organitionName: Joi.string(),
    image: Joi.string().required(),
    phone1: Joi.string().required(),
    phone2: Joi.string(),
    phone3: Joi.string(),
    bank: Joi.string(),
    bankNumber: Joi.string(),
    inn: Joi.number(),
    mfo: Joi.number(),
    address: Joi.string(),
    orientation: Joi.string(),
    market: Joi.string(),
  })

  return schema.validate(branch)
}

module.exports.validateBranch = validateBranch
module.exports.Branch = model('Branch', branch)
