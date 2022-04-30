const { Schema, model, Types } = require("mongoose");
const Joi = require("joi");

const director = new Schema(
  {
      login: {type: String, required: true},
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    fathername: { type: String },
    image: { type: String },
    phone: { type: String },
    password: { type: String, min: 6, required: true },
    market: { type: Schema.Types.ObjectId, ref: "Market" },
    type: { type: String, required: true },
    isArchive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

function validateDirector(director) {
  const schema = Joi.object({
      login:Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    fathername: Joi.string(),
    image: Joi.string(),
    phone: Joi.string(),
    password: Joi.string().required(),
    market: Joi.string(),
    type: Joi.string(),
    confirmPassword: Joi.string(),
  });

  return schema.validate(director);
}

function validateDirectorLogin(director) {
  const schema = Joi.object({
      login: Joi.string().required(),
    password: Joi.string().required()
  });

  return schema.validate(director);
}

module.exports.validateDirector = validateDirector;
module.exports.validateDirectorLogin = validateDirectorLogin;
module.exports.Director = model("Director", director);
