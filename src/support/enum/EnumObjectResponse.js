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
  STATEMENTS_NOT_FOUND: ObjectResponse(
    EnumMessages.ERROR_NOT_FOUND_NAME, 
    404,
    EnumMessages.STATEMENTS_NOT_FOUND
  ),
  STATEMENTS_DATA_EMPTY: ObjectResponse(
    EnumMessages.ERROR_NOT_FOUND_NAME, 
    200,
    EnumMessages.STATEMENTS_NOT_FOUND,
    {
      statements: [],
      balance: {
        total: 0,
        inflow: 0,
        outflow: 0,
      },
      categories: []
    }
  ),
  CATEGORY_NOT_FOUND: ObjectResponse(
    EnumMessages.ERROR_NOT_FOUND_NAME,
    404,
    EnumMessages.CATEGORY_NOT_FOUND
  ),
  FAILED_TO_GET_BALANCE: ObjectResponse(
    EnumMessages.ERROR_SERVER_NAME,
    500,
    EnumMessages.FAILED_TO_GET_BALANCE
  )

});