const Enum = require('./Enum');

module.exports = Enum({

  ACCOUNT_ALREADY_EXISTS: "Account already exists!",
  ACCOUNT_ALREADY_EXISTS_WITH: "Already exists an account with:",
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

  MONGO_DUPLICATED_KEY: 'DuplcatedKeyError'

});