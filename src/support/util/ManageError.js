const EnumCodes = require('../enum/EnumCodes');
const EnumMessages = require('../enum/EnumMessages');

function keyValueError(e, body, text){
  const { keyValue, code } = e;
  if(code===EnumCodes.CODE_KEY_DUPLICATED_MONGO) {
      const keyArray = Object.keys(keyValue);
      const key = keyArray[0];
      return new UsefulError(
        EnumMessages.MONGO_DUPLICATED_KEY, 
        406, 
        `Already exists ${text} with ${key}=${body[key]}`
      );
  }
  return e;
}

function objectError(name, httpStatusCode, context){
  return {
    name: name,
    httpStatusCode: httpStatusCode,
    context: context
  }
};

class UsefulError extends Error {
  constructor(name, httpStatusCode = 500, context, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UsefulError );
    }

    this.name = name;
    this.httpStatusCode = httpStatusCode;
    this.context = context; 
    this.date = new Date();
  }
}

module.exports = { keyValueError, UsefulError, objectError };