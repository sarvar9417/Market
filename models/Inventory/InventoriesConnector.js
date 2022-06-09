const { Schema, model } = require('mongoose');
const Joi = require('joi');

const inventoriesConnector = new Schema(
  {
    id: { type: String, required: true },
    inventories: [{ type: Schema.Types.ObjectId, ref: 'Inventory' }],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    completed: { type: Boolean, default: false },
    market: { type: Schema.Types.ObjectId, ref: 'Market', required: true },
    isArchive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

function validateInvertoriesConnector(inventoriesConnector) {
  const schema = Joi.object({
    id: Joi.string(),
    inventories: Joi.array(),
    completed: Joi.boolean(),
    user: Joi.string(),
    market: Joi.string().required(),
  });

  return schema.validate(inventoriesConnector);
}

module.exports.validateInvertoriesConnector = validateInvertoriesConnector;
module.exports.InvertoriesConnector = model(
  'InvertoriesConnector',
  inventoriesConnector
);
