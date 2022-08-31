const Enum = require('./Enum');
const RandomGenerate = require('../util/RandomGenerate');

module.exports = Enum({

  VALID_AND_EXISTING_ACCOUNT_CPF: '84293271007',
  VALID_AND_NON_EXISTENT_ACCOUNT_CPF: '18925985071',
  INVALID_CPF: '02303950521',

  ARRAY_KEYS_OBJECT_RESPONSE_NO_DATA: ['name', 'httpStatusCode', 'message'],
  ARRAY_KEYS_OBJECT_RESPONSE: ['name', 'httpStatusCode', 'message', 'data'],
  ARRAY_KEYS_BODY_GET_ACCOUNT: [
    'cpf',
    'email',
    'cellphone',
    'firstName',
    'lastName',
    'createdAt',
    'updatedAt'
  ],

  BODY_FULL_POST_SUCCESS: {
    firstName: RandomGenerate.name(),
    lastName: RandomGenerate.name(),
    cpf: RandomGenerate.cpf(),
    email: RandomGenerate.email(),
    cellphone: RandomGenerate.cellphone()
  },
  BODY_FULL_POST_DUPLICATED_KEY: {
    firstName: "Bruna",
    lastName: "Silva",
    cpf: "97728322087",
    email: "brunasilva@gmail.com",
    cellphone: "77991998771"
  },
  BODY_FULL_PUT_SUCCESS: {
    firstName: RandomGenerate.name(),
    lastName: RandomGenerate.name(),
    email: RandomGenerate.email(),
    cellphone: RandomGenerate.cellphone()
  },
  BODY_FULL_PUT_DUPLICATED_KEY: {
    firstName: "Bruna",
    lastName: "Silva",
    email: "brunasilva@gmail.com",
    cellphone: "77991998771"
  }

});