const Enum = require('./Enum');
const RandomGenerate = require('../util/RandomGenerate');

module.exports = (statusCode) => Enum({

  RESPONSE_OBJECT_SUCCESS: {
    name: name => name,
    httpStatusCode: httpStatusCode => httpStatusCode===statusCode,
    message: message => message,
    data: {
      cpf: cpf => cpf,
      email: email => email,
      cellphone: cellphone => cellphone,
      firstName: firstName => firstName,
      lastName: lastName => lastName,
      createdAt: createdAt => createdAt,
      updatedAt: updatedAt => updatedAt
    },
  },
  RESPONSE_ARRAY_OBJECT_SUCCESS: {
    name: name => name,
    httpStatusCode: httpStatusCode => httpStatusCode===statusCode,
    message: message => message,
    data: [
      {
        cpf: cpf => cpf,
        email: email => email,
        cellphone: cellphone => cellphone,
        firstName: firstName => firstName,
        lastName: lastName => lastName,
        createdAt: createdAt => createdAt,
        updatedAt: updatedAt => updatedAt
      }
    ]
  },
  RESPONSE_OBJECT_NO_DATA: {
    name: name => name,
    httpStatusCode: httpStatusCode => httpStatusCode===statusCode,
    message: message => message
  }

});