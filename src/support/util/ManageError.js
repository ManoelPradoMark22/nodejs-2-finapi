const EnumCODES = require('../enum/EnumCODES');

function keyValueError(e, body, text){
  const { keyValue, code } = e;
  if(code===EnumCODES.CODE_KEY_DUPLICATED_MONGO) {
      const keyArray = Object.keys(keyValue);
      const key = keyArray[0];
      return `Already exists ${text} with ${key}=${body[key]}`
  }
  return e.message;
}

module.exports = { keyValueError };