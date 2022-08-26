const getTests = require('./methods/get');
const postTests = require('./methods/post');
const putTests = require('./methods/put');

module.exports = () => describe('/account', () => {

    getTests();

    postTests();

    putTests();

  });
