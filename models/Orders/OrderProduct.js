const { Schema, model, Types } = require('mongoose');
const Joi = require('joi');

const orderproduct = new Schema(
  {
    orderpieces: { type: Number, required: true },
    sendingpieces: { type: Number },
    incomingpieces: { type: Number },
    returnpieces: { type: Number },
    incomingprice: { type: Number },
    productdata: { type: Schema.Types.ObjectId, ref: 'ProductData' },
    price: { type: Schema.Types.ObjectId, ref: 'ProductPrice' },
    unit: { type: Schema.Types.ObjectId, ref: 'Unit' },
    connector: { type: Schema.Types.ObjectId, ref: 'OrderConnector' },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
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

function validateOrderProduct(orderproduct) {
  const schema = Joi.object({
    totalprice: Joi.number().required(),
    totalpriceuzs: Joi.number().required(),
    unitprice: Joi.number().required(),
    unitpriceuzs: Joi.number().required(),
    pieces: Joi.number().required(),
    product: Joi.string().required(),
    market: Joi.string(),
  });
  return schema.validate(orderproduct);
}

module.exports.validateOrderProduct = validateOrderProduct;
module.exports.OrderProduct = model('OrderProduct', orderproduct);
