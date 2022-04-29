const { Schema, model, Types } = require("mongoose");
const Joi = require("joi");

const department = new Schema(
  {
    name: { type: String, required: true },
    probirka: { type: Boolean, required: true, default: false },
    clinica: { type: Schema.Types.ObjectId, ref: "Clinica", required: true },
    services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
    servicetypes: [{ type: Schema.Types.ObjectId, ref: "ServiceType" }],
    doctors: [{ type: Schema.Types.ObjectId, ref: "Doctor" }],
    isArchive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

function validateDepartment(department) {
  const schema = Joi.object({
    name: Joi.string().required(),
    probirka: Joi.boolean().required(),
    clinica: Joi.string().required(),
  });

  return schema.validate(department);
}

module.exports.validateDepartment = validateDepartment;
module.exports.Department = model("Department", department);
