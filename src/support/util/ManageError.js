const EnumCodes = require('../enum/EnumCodes');
const EnumMessages = require('../enum/EnumMessages');
const EnumObjectResponse = require('../enum/EnumObjectResponse');
const ObjectResponse = require('./ObjectResponse');

function keyValueError(e, body, text){
  try {
    const { keyValue, code } = e;
    if(code===EnumCodes.CODE_KEY_DUPLICATED_MONGO) {
        const keyArray = Object.keys(keyValue);
        const key = keyArray[0];
        return ObjectResponse(
          EnumMessages.MONGO_DUPLICATED_KEY,
          406,
          `Already exists ${text} with ${key}=${body[key]}`
        );
    }
    
    throw EnumObjectResponse.SERVER_ERROR;
  }catch(e) {
    return EnumObjectResponse.SERVER_ERROR;
  }
}

module.exports = { keyValueError };