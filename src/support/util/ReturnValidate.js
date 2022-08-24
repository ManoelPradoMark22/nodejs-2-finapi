const UsefulErrorObject = require('./UsefulErrorObject');
const EnumMessages = require('../enum/EnumMessages');

function returnErrorResponse(res, statusCode, errorMessage) {
  return res.status(statusCode).json(UsefulErrorObject(
    EnumMessages.JOI_VALIDATION_NAME_ERROR,
    statusCode,
    errorMessage
  ));
}

function bodyValidate(schema, req, res, next){
  const { body } = req;
  const validate = schema.validate(body);
  const { error, value } = validate;
  
  if(error) return returnErrorResponse(res, 422, error.message);

  req.body = value;

  return next();
}

function headerValidate(schema, headerValue, res, next){
  const validate = schema.validate(headerValue);
  const { error } = validate;
  
  if(error) return returnErrorResponse(res, 422, error.message);

  return next();
}

module.exports = { bodyValidate, headerValidate, returnErrorResponse }