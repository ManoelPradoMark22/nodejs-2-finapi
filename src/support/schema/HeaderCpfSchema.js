const EnumJoi = require('../enum/EnumJoi');

module.exports = function validateHeaderCpf(req, res, next) {
  const { cpf } = req.headers;

  if(!cpf) return res.status(422).json({
    status: 'error',
    message: "missing cpf in header"
  });

  const schema = EnumJoi.CPF_JOI;

  const validate = schema.validate(cpf);

  if(validate.error) return res.status(422).json({
    status: 'error',
    message: validate.error.message
  });

  return next();
};