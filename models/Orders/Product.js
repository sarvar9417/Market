const { Schema, model, Types } = require('mongoose');
const Joi = require('joi');

const order = new Schema(
  {
    order: { type: Number, default: 0 },
    send: { type: Number, default: 0 },
    accepted: { type: Number, default: 0 },
    productdata: { type: Schema.Types.ObjectId, ref: 'OrderData' },
    unit: { type: Schema.Types.ObjectId, ref: 'Unit' },
    price: { type: Schema.Types.ObjectId, ref: 'OrderPrice' },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    market: { type: Schema.Types.ObjectId, ref: 'Market', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'Market', required: true },
    isArchive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

function validateOrder(order) {
  const schema = Joi.object({
    accepted: Joi.number(),
    order: Joi.number(),
    send: Joi.number(),
    unit: Joi.string(),
    productdata: Joi.string(),
    category: Joi.string(),
    sender: Joi.string(),
    price: Joi.string(),
    market: Joi.string().required(),
  });

  return schema.validate(order);
}

module.exports.validateOrder = validateOrder;
module.exports.Order = model('Order', order);
