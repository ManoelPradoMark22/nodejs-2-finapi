const Joi = require('joi');
const EnumJoi = require('../enum/EnumJoi');
const ReturnValidate = require('../util/ReturnValidate');

function validateBodyPOSTCategory(req, res, next) {
  const schema = Joi.object().keys({
    key: EnumJoi.CATEGORY_KEY_JOY.required(),
    name: EnumJoi.CATEGORY_NAME_JOY.required(),
    icon: EnumJoi.CATEGORY_NAME_JOY.required(),
    color: EnumJoi.CATEGORY_COLOR_JOY.required(),
  });

  ReturnValidate.bodyValidate(schema, req, res, next);
};

function validateBodyPUTCategory(req, res, next) {
  const schema = Joi.object().keys({
    name: EnumJoi.CATEGORY_NAME_JOY,
    icon: EnumJoi.CATEGORY_NAME_JOY,
    color: EnumJoi.CATEGORY_COLOR_JOY
  }).min(1);

  ReturnValidate.bodyValidate(schema, req, res, next);
};

module.exports = { validateBodyPOSTCategory, validateBodyPUTCategory }