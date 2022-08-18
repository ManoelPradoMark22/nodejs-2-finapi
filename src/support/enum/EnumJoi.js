const Joi = require('joi');
const Enum = require('./Enum');
const EnumErrors = require('./EnumErrors');
const validateCpf = require('../util/CpfValidate');

module.exports = Enum({

  CPF_JOI: Joi.string().regex(/^[0-9]+$/).length(11)
  .custom((value, helper) => validateCpf(value) 
    ? value : helper.message(EnumErrors.INVALID_CPF)),
  NAME_JOI: Joi.string().uppercase().trim().min(3).max(30),
  EMAIL_JOI: Joi.string().email(),
  PHONE_JOI: Joi.string().regex(/^[0-9]+$/).length(11)

});