const EnumJoi = require('../enum/EnumJoi');
const EnumErrors = require('../enum/EnumErrors');

module.exports = function validateHeaderCpf(req, res, next) {
  const { cpf } = req.headers;

  if(!cpf) return res.status(422).json({
    status: 'error',
    message: EnumErrors.MISSING_CPF
  });

  const schema = EnumJoi.CPF_JOI;

  const validate = schema.validate(cpf);

  if(validate.error) return res.status(422).json({
    status: 'error',
    message: validate.error.message
  });

  return next();
};