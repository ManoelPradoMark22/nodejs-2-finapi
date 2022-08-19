function bodyValidate(schema, req, res, next){
  const { body } = req;
  const validate = schema.validate(body);

  if(validate.error) return res.status(422).json({
    status: 'error',
    message: validate.error.message
  });

  req.body = validate.value;

  return next();
}

function headerValidate(schema, headerValue, res, next){
  const validate = schema.validate(headerValue);

  if(validate.error) return res.status(422).json({
    status: 'error',
    message: validate.error.message
  });

  return next();
}

module.exports = { bodyValidate, headerValidate }