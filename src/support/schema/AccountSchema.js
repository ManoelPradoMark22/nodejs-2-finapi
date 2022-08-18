const Joi = require('joi');
const EnumJoi = require('../enum/EnumJoi');

module.exports = function validateBodyAccount(req, res, next) {
  const {  method, body } = req;

  const schema = Joi.object().keys(method=='POST' ? {
    name: EnumJoi.NAME_JOI.required(),
    cpf: EnumJoi.CPF_JOI
  } : {//PUT
    name: EnumJoi.NAME_JOI
  }).min(1);

  const validate = schema.validate(body);

  if(validate.error) return res.status(422).json({
    status: 'error',
    message: validate.error.message
  });

  req.body = validate.value;

  return next();
};