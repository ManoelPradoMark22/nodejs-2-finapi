const Enum = require('./Enum');
const EnumTestData = require('./EnumTestData');
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
  RESPONSE_STATEMENT_OBJECT_SUCCESS: {
    name: name => name,
    httpStatusCode: httpStatusCode => httpStatusCode===statusCode,
    message: message => message,
    data: data => EnumTestData.SUBSET_DATA_STATEMENT,
  },
  RESPONSE_STATEMENT_OBJECT_SUCCESS_ARRAY_DATA: {
    name: name => name,
    httpStatusCode: httpStatusCode => httpStatusCode===statusCode,
    message: message => message,
    data: [
      EnumTestData.SUBSET_DATA_STATEMENT
    ],
  },
  RESPONSE_FULL_DASHBOARD_STATEMENT_EMPTY_OBJECT_SUCCESS_ARRAY_DATA: {
    name: name => name,
    httpStatusCode: httpStatusCode => httpStatusCode===statusCode,
    message: message => message,
    data: {
      statements: [],
      balance: EnumTestData.EMPTY_BALANCE_STATEMENT,
      categories: [ EnumTestData.SUBSET_DATA_CATEGORY ]
    }
  },
  RESPONSE_FULL_DASHBOARD_STATEMENT_OBJECT_SUCCESS_ARRAY_DATA: {
    name: name => name,
    httpStatusCode: httpStatusCode => httpStatusCode===statusCode,
    message: message => message,
    data: {
      statements: [ EnumTestData.SUBSET_DATA_STATEMENT ],
      balance: EnumTestData.SUBSET_BALANCE_STATEMENT,
      categories: [ EnumTestData.SUBSET_DATA_CATEGORY ]
    }
  },
  RESPONSE_BALANCE_STATEMENT_ARRAY_DATA_SUCCESS: {
    name: name => name,
    httpStatusCode: httpStatusCode => httpStatusCode===statusCode,
    message: message => message,
    data: {
      total: total => typeof total === 'number',
      inflow: inflow => typeof inflow === 'number',
      outflow: outflow => typeof outflow === 'number'
    }
  },
  RESPONSE_BALANCE_STATEMENT_ARRAY_DATA_ZERO: {
    name: name => name,
    httpStatusCode: httpStatusCode => httpStatusCode===statusCode,
    message: message => message,
    data: {
      total: 0,
      inflow: 0,
      outflow: 0
    }
  },
  RESPONSE_FULL_BALANCE_STATEMENT_BY_CATEGORY_FILTER_DATA_EMPTY: {
    name: name => name,
    httpStatusCode: httpStatusCode => httpStatusCode===statusCode,
    message: message => message,
    data: {
      inflow: {
        data: [],
        total: 0
      },
      outflow: {
        data: [],
        total: 0
      }
    }
  },
  RESPONSE_FULL_BALANCE_STATEMENT_BY_CATEGORY_FILTER_DATA_SUCCESS: {
    name: name => name,
    httpStatusCode: httpStatusCode => httpStatusCode===statusCode,
    message: message => message,
    data: data => ({
      inflow: inflow => ({
        data: [ EnumTestData.SUBSET_BALANCE_BY_CATEGORY ],
        total: 0
      }),
      outflow: outflow => ({
        data: [ EnumTestData.SUBSET_BALANCE_BY_CATEGORY ],
        total: 0
      })
    })
  },
  RESPONSE_FULL_BALANCE_STATEMENT_BY_CATEGORY_ARRAY_DATA_EMPTY: {
    name: name => name,
    httpStatusCode: httpStatusCode => httpStatusCode===statusCode,
    message: message => message,
    data: {
      inflow: [],
      outflow: []
    }
  },
  RESPONSE_FULL_BALANCE_STATEMENT_BY_CATEGORY_ARRAY_DATA_SUCCESS: {
    name: name => name,
    httpStatusCode: httpStatusCode => httpStatusCode===statusCode,
    message: message => message,
    data: data => ({
      inflow: [ EnumTestData.SUBSET_BALANCE_BY_CATEGORY ],
      outflow: [ EnumTestData.SUBSET_BALANCE_BY_CATEGORY ],
    })
  }

});