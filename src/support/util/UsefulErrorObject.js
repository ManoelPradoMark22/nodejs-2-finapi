module.exports = function objectError(name, httpStatusCode, context){

  return {
    name: name,
    httpStatusCode: httpStatusCode,
    context: context
  }

};