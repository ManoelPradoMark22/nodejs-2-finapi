const Joi = require('joi');

module.exports = function validateBodyAccount(req, res, next) {
  const dataBody = req.body;

  const schema = Joi.object().keys({
    name: Joi.string().uppercase().max(60),
    cpf: Joi.string().regex(/^[0-9]+$/).max(11)
  });

  const validate = schema.validate(dataBody);

  if(validate.error) return res.status(422).json({
    status: 'error',
    message: validate.error.message
  });

  req.body = validate.value;

  return next();
};