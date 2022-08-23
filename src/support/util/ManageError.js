const EnumCODES = require('../enum/EnumCODES');
const UsefulError = require('./UsefulError');

function keyValueError(e, body, text){
  const { keyValue, code } = e;
  if(code===EnumCODES.CODE_KEY_DUPLICATED_MONGO) {
      const keyArray = Object.keys(keyValue);
      const key = keyArray[0];
      return new UsefulError('NotAcceptableError', 406, `Already exists ${text} with ${key}=${body[key]}`);
  }
  return e;
}

module.exports = { keyValueError };