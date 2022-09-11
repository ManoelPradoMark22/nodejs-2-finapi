const Joi = require('joi');
const Enum = require('./Enum');
const EnumMessages = require('./EnumMessages');
const EnumTransactionTypes = require('./EnumTransactionTypes');
const ValidateCpf = require('../util/CpfValidate');
const HexaValidation = require('../util/HexaValidation');

module.exports = Enum({

  CPF_JOI: Joi.string().regex(/^[0-9]+$/).length(11)
  .custom((value, helper) => ValidateCpf(value) 
    ? value : helper.message(EnumMessages.INVALID_CPF)),
  DATE_JOI: Joi.date(),
  NAME_JOI: Joi.string().uppercase().trim().min(3).max(30),
  EMAIL_JOI: Joi.string().email(),
  PHONE_JOI: Joi.string().regex(/^[0-9]+$/).length(11),

  CATEGORY_KEY_JOY: Joi.string().trim().regex(/^\S*$/).min(3).max(15),
  CATEGORY_NAME_JOY: Joi.string().trim().min(3).max(20),
  CATEGORY_COLOR_JOY: Joi.string().trim().min(4).max(7)
  .custom((value, helper) => HexaValidation(value) 
    ? value : helper.message(EnumMessages.INVALID_COLOR)),

  STATEMENT_AMOUNT: Joi.number().precision(2).positive(),
  STATEMENT_DESCRIPTION: Joi.string().trim().min(3).max(60),
  STATEMENT_TYPE: Joi.string().valid(...EnumTransactionTypes.values())

});