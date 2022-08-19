const Joi = require('joi');
const EnumJoi = require('../enum/EnumJoi');

module.exports = function validateBodyCategorie(req, res, next) {
  const dataBody = req.body;

  const schema = Joi.object().keys({
    key: EnumJoi.CATEGORY_KEY_JOY.required(),
    name: EnumJoi.CATEGORY_NAME_JOY.required(),
    icon: EnumJoi.CATEGORY_NAME_JOY.required(),
  });

  const validate = schema.validate(dataBody);

  if(validate.error) return res.status(422).json({
    status: 'error',
    message: validate.error.message
  });

  req.body = validate.value;

  return next();
};