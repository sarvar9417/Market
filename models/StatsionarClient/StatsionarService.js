const {Schema, model, Types} = require('mongoose')
const Joi = require('joi')
const {join} = require("path");

const service = new Schema(
    {
        clinica: {type: Schema.Types.ObjectId, ref: 'Clinica', required: true},
        isArchive: {type: Boolean, default: false},
        client: {
            type: Schema.Types.ObjectId,
            ref: 'StatsionarClient',
            required: true,
        },
        connector: {
            type: Schema.Types.ObjectId,
            ref: 'StatsionarConnector',
            required: true,
        },
        serviceid: {type: Schema.Types.ObjectId, ref: 'Service', required: true},
        service: {type: Object},
        pieces: {type: Number},
        department: {
            type: Schema.Types.ObjectId,
            ref: 'Department',
            required: true,
        },
        templates: {type: String},
        refuse: {type: Boolean, default: false},
        accept: {type: Boolean, default: false},
        reseption: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        doctor: {type: Schema.Types.ObjectId, ref: 'User'},
        turn: {type: Number},
        comment: {type: String},
        payment: {type: Boolean, default: true},
        column: Object,
        tabled: Array
    },
    {
        timestamps: true,
    },
)

function validateStatsionarService(clientservice) {
    const schema = Joi.object({
        clinica: Joi.string().required(),
        client: Joi.string(),
        connector: Joi.string(),
        serviceid: Joi.string().required(),
        service: Joi.object().required(),
        pieces: Joi.number(),
        department: Joi.string().required(),
        table: Joi.string(),
        templates: Joi.string(),
        refuse: Joi.boolean(),
        accept: Joi.string(),
        reseption: Joi.string().required(),
        doctor: Joi.string(),
        turn: Joi.string(),
        comment: Joi.string(),
        payment: Joi.boolean(),
        column: Joi.object(),
        tables: Joi.array()
    })

    return schema.validate(clientservice)
}

module.exports.validateStatsionarService = validateStatsionarService
module.exports.StatsionarService = model('StatsionarService', service)
