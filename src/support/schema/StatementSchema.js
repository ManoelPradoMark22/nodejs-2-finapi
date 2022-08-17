const Joi = require('joi');
const EnumTypes = require('../enum/EnumTypes');

module.exports = function validateBodyStatement(req, res, next) {
  const dataBody = req.body;

  const schema = Joi.object().keys({
    description: Joi.string().max(60).required(),
    amount: Joi.number().precision(2).required(),
    type: Joi.string().valid(EnumTypes.TRANSACTION_ENTRY, EnumTypes.TRANSACTION_OUT).required()
  });

  const validate = schema.validate(dataBody);

  if(validate.error) return res.status(422).json({
    status: 'error',
    message: validate.error.message
  });

  req.body = validate.value;

  return next();
};