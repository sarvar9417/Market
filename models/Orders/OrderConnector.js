const { Schema, model } = require('mongoose');
const Joi = require('joi');

const orderconnector = new Schema(
  {
    id: { type: String },
    totalprice: { type: Number },
    position: { type: String },
    products: [{ type: Schema.Types.ObjectId, ref: 'OrderProduct' }],
    customermarket: {
      type: Schema.Types.ObjectId,
      ref: 'Market',
      required: true,
    },
    receivermarket: {
      type: Schema.Types.ObjectId,
      ref: 'Market',
      required: true,
    },
    isArchive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

function validateOrderConnector(orderconnector) {
  const schema = Joi.object({
    id: Joi.string(),
    totalprice: Joi.number(),
    position: Joi.string(),
    products: Joi.array(),
    customermarket: Joi.string(),
    receivermarket: Joi.string(),
  });

  return schema.validate(orderconnector);
}

module.exports.validateOrderConnector = validateOrderConnector;
module.exports.OrderConnector = model('OrderConnector', orderconnector);
