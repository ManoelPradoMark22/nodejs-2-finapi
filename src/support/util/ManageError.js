function keyValueError(e, body, text){
  const { keyValue } = e;
  if(keyValue) {
      const keyArray = Object.keys(keyValue);
      const key = keyArray[0];
      return `Already exists ${text} with ${key}=${body[key]}`
  }
  return e.message;
}

module.exports = { keyValueError };