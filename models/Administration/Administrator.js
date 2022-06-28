const { Schema, model } = require('mongoose');
const Joi = require('joi');

const administration = new Schema(
  {
    login: { type: String, required: true },
    password: { type: String, min: 8, required: true },
  },
  {
    timestamps: true,
  }
);

function validateAdministration(administration) {
  const schema = Joi.object({
    password: Joi.string().required(),
    confirmpassword: Joi.string(),
    login: Joi.string().required(),
  });

  return schema.validate(administration);
}

module.exports.validateAdministration = validateAdministration;
module.exports.Administration = model('Administration', administration);
