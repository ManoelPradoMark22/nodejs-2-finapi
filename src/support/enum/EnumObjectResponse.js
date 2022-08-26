const Enum = require('./Enum');
const EnumMessages = require('./EnumMessages');
const ObjectResponse = require('../util/ObjectResponse');

module.exports = Enum({

  SERVER_ERROR:  ObjectResponse(
    EnumMessages.ERROR_SERVER_NAME, 
    500, 
    EnumMessages.ERROR_SERVER_MESSAGE
  ),
  ACCOUNT_NOT_FOUND: ObjectResponse(
    EnumMessages.ERROR_NOT_FOUND_NAME, 
    404,
    EnumMessages.ACCOUNT_NOT_FOUND
  ),
  CATEGORY_NOT_FOUND: ObjectResponse(
    EnumMessages.ERROR_NOT_FOUND_NAME,
    404,
    EnumMessages.CATEGORY_NOT_FOUND
  )

});