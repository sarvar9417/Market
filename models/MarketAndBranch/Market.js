const { Schema, model, Types } = require('mongoose');
const Joi = require('joi');

const market = new Schema(
  {
    name: { type: String, required: true },
    organitionName: { type: String },
    image: { type: String },
    phone1: { type: String },
    phone2: { type: String },
    phone3: { type: String },
    bank: { type: String },
    bankNumber: { type: String },
    inn: { type: Number },
    mfo: { type: Number },
    address: { type: String },
    orientation: { type: String },
    isArchive: { type: Boolean, default: false },
    director: { type: Schema.Types.ObjectId, ref: 'User' },
    market: { type: Schema.Types.ObjectId, ref: 'Market' },
    mainmarket: { type: Schema.Types.ObjectId, ref: 'Market' },
    filials: [{ type: Schema.Types.ObjectId, ref: 'Market' }],
    connections: [{ type: Schema.Types.ObjectId, ref: 'Market' }],
    permission: { type: Schema.Types.ObjectId, ref: 'Permission' },
  },
  {
    timestamps: true,
  }
);

function validateMarket(market) {
  const schema = Joi.object({
    name: Joi.string().required(),
    organitionName: Joi.string(),
    image: Joi.string(),
    phone1: Joi.string(),
    phone2: Joi.string(),
    phone3: Joi.string(),
    bank: Joi.string(),
    bankNumber: Joi.string(),
    inn: Joi.number(),
    mfo: Joi.number(),
    address: Joi.string(),
    orientation: Joi.string(),
    market: Joi.string(),
  });

  return schema.validate(market);
}

module.exports.validateMarket = validateMarket;
module.exports.Market = model('Market', market);
