const getTests = require('./methods/get');

module.exports = () => describe('/all-accounts', () => {
      
  getTests();

});
