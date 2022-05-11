const { Schema, model, Types } = require("mongoose");
const Joi = require("joi");

const product = new Schema(
  {
    name: { type: String, required: true },
    unit: { type: Schema.Types.ObjectId, ref: "Unit" },
    code: { type: Number, required: true },
    price: { type: Schema.Types.ObjectId, ref: "ProductPrice" },
    total: { type: Number, default: 0 },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    producttype: { type: Schema.Types.ObjectId, ref: "ProductType" },
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
    market: { type: Schema.Types.ObjectId, ref: "Market", required: true },
    isArchive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().required(),
    unit: Joi.string(),
    code: Joi.number(),
    price: Joi.number(),
    total: Joi.number(),
    category: Joi.string(),
    producttype: Joi.string(),
    brand: Joi.string(),
    market: Joi.string().required(),
  });

  return schema.validate(product);
}

function validateProductExcel(product) {
  const schema = Joi.object({
    name: Joi.string().required(),
    unit: Joi.string(),
    producttype: Joi.string().required(),
    code: Joi.number().required(),
    category: Joi.number(),
    brand: Joi.string(),
    price: Joi.number(),
    total: Joi.number(),
  });

  return schema.validate(product);
}

module.exports.validateProduct = validateProduct;
module.exports.validateProductExcel = validateProductExcel;
module.exports.Product = model("Product", product);
