const EnumCodes = require('../enum/EnumCodes');
const EnumMessages = require('../enum/EnumMessages');

const serverErrorObject = objectResponse(
  'ServerError', 
  500, 
  EnumMessages.ERROR_SERVER_MESSAGE
);

function keyValueError(e, body, text){
  try {
    const { keyValue, code } = e;
    if(code===EnumCodes.CODE_KEY_DUPLICATED_MONGO) {
        const keyArray = Object.keys(keyValue);
        const key = keyArray[0];
        return objectResponse(
          EnumMessages.MONGO_DUPLICATED_KEY,
          406,
          `Already exists ${text} with ${key}=${body[key]}`
        );
    }
    
    return serverErrorObject;
  }catch(e) {
    return serverErrorObject;
  }
}

function objectResponse(name, httpStatusCode, message, data){
  return {
    name: name,
    httpStatusCode: httpStatusCode,
    message: message,
    data: data
  }
};

module.exports = { keyValueError, objectResponse };