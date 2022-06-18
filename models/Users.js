const { Schema, model, Types } = require('mongoose');
const Joi = require('joi');

const user = new Schema(
  {
    login: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    fathername: { type: String },
    image: { type: String },
    phone: { type: String },
    password: { type: String, min: 6, required: true },
    market: { type: Schema.Types.ObjectId, ref: 'Market' }, // o'zini marketi
    type: { type: String, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Xodimlar
    user: { type: Schema.Types.ObjectId, ref: 'User' }, // Director
    isArchive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

function validateUser(user) {
  const schema = Joi.object({
    login: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    fathername: Joi.string(),
    image: Joi.string(),
    phone: Joi.string(),
    password: Joi.string(),
    market: Joi.string().required(),
    type: Joi.string().required(),
    confirmPassword: Joi.string(),
    specialty: Joi.string(),
    users: Joi.array(),
    user: Joi.string(),
    _id: Joi.string(),
  });

  return schema.validate(user);
}

function validateUserLogin(user) {
  const schema = Joi.object({
    password: Joi.string().required(),
    login: Joi.string().required(),
  });

  return schema.validate(user);
}

module.exports.validateUser = validateUser;
module.exports.validateUserLogin = validateUserLogin;
module.exports.User = model('User', user);
