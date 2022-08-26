const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../src/index');
const EnumTestData = require('../support/enum/EnumTestData');

chai.should();
chai.use(chaiHttp);

module.exports = { 
  chai: chai, 
  server: server,
  testData: EnumTestData
}