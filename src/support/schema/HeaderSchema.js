const EnumJoi = require('../enum/EnumJoi');
const EnumMessages = require('../enum/EnumMessages');
const ReturnValidate = require('../util/ReturnValidate');

function validateHeaderCpf(req, res, next) {
  const { cpf } = req.headers;

  if(!cpf) return res.status(422).json({
    status: 'error',
    message: EnumMessages.MISSING_CPF
  });

  const schema = EnumJoi.CPF_JOI;

  ReturnValidate.headerValidate(schema, cpf, res, next);
};

function validateHeaderKey(req, res, next) {
  const { key } = req.headers;

  if(!key) return res.status(422).json({
    status: 'error',
    message: EnumMessages.MISSING_CATEGORY_KEY
  });

  const schema = EnumJoi.CATEGORY_KEY_JOY;

  ReturnValidate.headerValidate(schema, key, res, next);
};

module.exports = { validateHeaderCpf, validateHeaderKey }