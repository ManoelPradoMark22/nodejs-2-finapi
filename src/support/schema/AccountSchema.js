const Joi = require('joi');
const EnumJoi = require('../enum/EnumJoi');

function returnValidate(schema, req, res, next){
  const validate = schema.validate(req.body);

  if(validate.error) return res.status(422).json({
    status: 'error',
    message: validate.error.message
  });

  req.body = validate.value;

  return next();
}

function validateBodyPOSTaccount(req, res, next) {
  const schema = Joi.object().keys({
    name: EnumJoi.NAME_JOI.required(),
    cpf: EnumJoi.CPF_JOI.required()
  }); 

  returnValidate(schema, req, res, next);
};

function validateBodyPUTaccount(req, res, next) {
  const schema = Joi.object().keys({
    name: EnumJoi.NAME_JOI
  }).min(1); 

  returnValidate(schema, req, res, next);
};

module.exports = { validateBodyPOSTaccount, validateBodyPUTaccount}