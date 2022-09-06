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
  RESPONSE_OBJECT_SUCCESS_ARRAY_DATA: {
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
  RESPONSE_OBJECT_SUCCESS_EMPTY_ARRAY_DATA: {
    name: name => name,
    httpStatusCode: httpStatusCode => httpStatusCode===statusCode,
    message: message => message,
    data: []
  },
  RESPONSE_OBJECT_NO_DATA: {
    name: name => name,
    httpStatusCode: httpStatusCode => httpStatusCode===statusCode,
    message: message => message
  },
  RESPONSE_CATEGORY_OBJECT_SUCCESS: {
    name: name => name,
    httpStatusCode: httpStatusCode => httpStatusCode===statusCode,
    message: message => message,
    data: {
      key: key => key,
      name: name => name,
      icon: icon => icon
    },
  },
  RESPONSE_CATEGORY_OBJECT_SUCCESS_ARRAY_DATA: {
    name: name => name,
    httpStatusCode: httpStatusCode => httpStatusCode===statusCode,
    message: message => message,
    data: [
      {
        key: key => key,
        name: name => name,
        icon: icon => icon
      }
    ],
  },

});