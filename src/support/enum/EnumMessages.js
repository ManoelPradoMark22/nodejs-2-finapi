const Enum = require('./Enum');

module.exports = Enum({

  ACCOUNT_ALREADY_EXISTS: "Account already exists!",
  CATEGORY_ALREADY_EXISTS: "Category already exists!",
  CATEGORY_NAME_ALREADY_EXISTS: "Category name already exists!",
  
  ACCOUNT_NOT_FOUND: "Account not found!",
  STATEMENTS_NOT_FOUND: "Statements not found!",
  CATEGORY_NOT_FOUND: "Category not found!",
  
  INVALID_CPF: "Invalid cpf!",
  MISSING_CPF: "Cpf is required!",
  MISSING_CATEGORY_KEY: "Category's key is required!",
  
  FAILURE_DELETE: 'Fail to delete!',

  SUCCESS_FULL_DELETE: 'Successful full deletion!',
  JUST_ACCOUNT_DELETED: 'Account deleted successfully! But failure while deleting statements! Contact your manager to complete deletion.',
  N_STATEMENTS_DELETED: 'deleted statements!',

  JOI_VALIDATION_NAME_ERROR: 'ValidationError',
  MONGO_DUPLICATED_KEY: 'DuplcatedKeyError',

  SUCCESS_CREATE_ACCOUNT: 'Account created successfully!',
  SUCCESS_UPDATE_ACCOUNT: 'Account updated successfully!',

  SUCCESS_NAME: 'Success',

  ERROR_SERVER_NAME: 'ServerError',
  ERROR_SERVER_MESSAGE: 'Server Error! Try again later!',
  ERROR_NOT_FOUND_NAME: 'NotFoundError'

});