const { Schema, model, Types } = require('mongoose');
const Joi = require('joi');

const orderconnector = new Schema(
  {
    id: { type: String },
    sender: { type: Schema.Types.ObjectId, ref: 'Market' },
    products: [{ type: Schema.Types.ObjectId, ref: 'SaleProduct' }],
    market: { type: Schema.Types.ObjectId, ref: 'Market', required: true },

    isArchive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

function validateOrderConnector(orderconnector) {
  const schema = Joi.object({
    id: Joi.string(),
    payments: Joi.array(),
    discounts: Joi.array(),
    debts: Joi.string(),
    packman: Joi.string(),
    client: Joi.string(),
    user: Joi.string(),
    products: Joi.array(),
    market: Joi.string(),
  });

  return schema.validate(orderconnector);
}

module.exports.validateOrderConnector = validateOrderConnector;
module.exports.OrderConnector = model('OrderConnector', orderconnector);
