const Joi = require('joi');
const EnumJoi = require('../enum/EnumJoi');
const ReturnValidate = require('../util/ReturnValidate');

function validateBodyStatement(req, res, next) {
  const schema = Joi.object().keys({
    description: EnumJoi.STATEMENT_DESCRIPTION.required(),
    keyCategory: EnumJoi.CATEGORY_KEY_JOY.required(),
    amount: EnumJoi.STATEMENT_AMOUNT.required(),
    type: EnumJoi.STATEMENT_TYPE.required()
  });

  ReturnValidate.bodyValidate(schema, req, res, next);
};

module.exports = { validateBodyStatement }