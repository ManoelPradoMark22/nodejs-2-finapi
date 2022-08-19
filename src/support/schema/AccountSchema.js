const Joi = require('joi');
const EnumJoi = require('../enum/EnumJoi');
const ReturnValidate = require('../util/ReturnValidate');

function validateBodyPOSTaccount(req, res, next) {
  const schema = Joi.object().keys({
    firstName: EnumJoi.NAME_JOI.required(),
    lastName: EnumJoi.NAME_JOI.required(),
    cpf: EnumJoi.CPF_JOI.required(),
    email: EnumJoi.EMAIL_JOI.required(),
    cellphone: EnumJoi.PHONE_JOI.required()
  }); 

  ReturnValidate.bodyValidate(schema, req, res, next);
};

function validateBodyPUTaccount(req, res, next) {
  const schema = Joi.object().keys({
    firstName: EnumJoi.NAME_JOI,
    lastName: EnumJoi.NAME_JOI,
    email: EnumJoi.EMAIL_JOI,
    cellphone: EnumJoi.PHONE_JOI
  }).min(1); 

  ReturnValidate.bodyValidate(schema, req, res, next);
};

module.exports = { validateBodyPOSTaccount, validateBodyPUTaccount }