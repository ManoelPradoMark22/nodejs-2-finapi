const Joi = require('joi');
const Enum = require('./Enum');
const EnumErrors = require('./EnumErrors');
const validateCpf = require('../util/CpfValidate');

module.exports = Enum({

  CPF_JOI: Joi.string().regex(/^[0-9]+$/).length(11)
  .custom((value, helper) => validateCpf(value) 
    ? true : helper.message(EnumErrors.INVALID_CPF))
  .required()

});