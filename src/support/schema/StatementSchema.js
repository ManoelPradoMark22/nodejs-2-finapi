const Joi = require('joi');
const EnumJoi = require('../enum/EnumJoi');

module.exports = function validateBodyStatement(req, res, next) {
  const dataBody = req.body;

  const schema = Joi.object().keys({
    description: EnumJoi.STATEMENT_DESCRIPTION.required(),
    keyCategory: EnumJoi.CATEGORY_KEY_JOY.required(),
    amount: EnumJoi.STATEMENT_AMOUNT.required(),
    type: EnumJoi.STATEMENT_TYPE.required()
  });

  const validate = schema.validate(dataBody);

  if(validate.error) return res.status(422).json({
    status: 'error',
    message: validate.error.message
  });

  req.body = validate.value;

  return next();
};