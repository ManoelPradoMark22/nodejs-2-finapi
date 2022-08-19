const Joi = require('joi');
const EnumJoi = require('../enum/EnumJoi');

function validateBodyPOSTCategory(req, res, next) {
  const { body } = req;

  const schema = Joi.object().keys({
    key: EnumJoi.CATEGORY_KEY_JOY.required(),
    name: EnumJoi.CATEGORY_NAME_JOY.required(),
    icon: EnumJoi.CATEGORY_NAME_JOY.required(),
  });

  const validate = schema.validate(body);

  if(validate.error) return res.status(422).json({
    status: 'error',
    message: validate.error.message
  });

  req.body = validate.value;

  return next();
};

function validateBodyPUTCategory(req, res, next) {
  const { body } = req;

  const schema = Joi.object().keys({
    name: EnumJoi.CATEGORY_NAME_JOY,
    icon: EnumJoi.CATEGORY_NAME_JOY,
  }).min(1);

  const validate = schema.validate(body);

  if(validate.error) return res.status(422).json({
    status: 'error',
    message: validate.error.message
  });

  req.body = validate.value;

  return next();
};

module.exports = { validateBodyPOSTCategory, validateBodyPUTCategory }