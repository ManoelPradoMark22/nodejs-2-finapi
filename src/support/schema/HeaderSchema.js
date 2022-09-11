const EnumJoi = require('../enum/EnumJoi');
const EnumMessages = require('../enum/EnumMessages');
const ReturnValidate = require('../util/ReturnValidate');

function validateHeaderCpf(req, res, next) {
  const { cpf } = req.headers;

  if(!cpf) return ReturnValidate.returnErrorResponse(res, 422, EnumMessages.MISSING_CPF);

  const schema = EnumJoi.CPF_JOI;

  ReturnValidate.headerValidate(schema, cpf, res, next);
};

function validateHeaderDate(req, res, next) {
  const { date } = req.headers;

  if(!date) return ReturnValidate.returnErrorResponse(res, 422, EnumMessages.MISSING_DATE);

  const schema = EnumJoi.DATE_JOI;

  ReturnValidate.headerValidate(schema, date, res, next);
};

function validateHeaderKey(req, res, next) {
  const { key } = req.headers;

  if(!key) return ReturnValidate.returnErrorResponse(res, 422, EnumMessages.MISSING_CATEGORY_KEY);

  const schema = EnumJoi.CATEGORY_KEY_JOY;

  ReturnValidate.headerValidate(schema, key, res, next);
};

module.exports = { 
  validateHeaderCpf,
  validateHeaderDate,
  validateHeaderKey
}