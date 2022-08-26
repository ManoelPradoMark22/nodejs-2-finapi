const { chai, server, testData } = require('../../config/TestConfig');

module.exports = () => describe('/account', () => {
    describe ('GET', () => {
      it('it should GET an account by a valid cpf (200)', (done) => {
        chai.request(server)
          .get("/account")
          .set('cpf', testData.VALID_AND_EXISTING_ACCOUNT_CPF)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.includes.all.keys(testData.ARRAY_KEYS_BODY_GET_ACCOUNT);
            res.body.should.have.property('cpf').eql(testData.VALID_AND_EXISTING_ACCOUNT_CPF);
            done();
          })
      });

      it('it should get an error object when account is not found (404)', (done) => {
        chai.request(server)
          .get("/account")
          .set('cpf', testData.VALID_AND_NON_EXISTENT_ACCOUNT_CPF)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.includes.all.keys(testData.ARRAY_KEYS_OBJECT_ERROR);
            done();
          })
      });

      it('it should get a validation error object when cpf is invalid - JOI (422)', (done) => {
        chai.request(server)
          .get("/account")
          .set('cpf', testData.INVALID_CPF)
          .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.includes.all.keys(testData.ARRAY_KEYS_OBJECT_ERROR);
            done();
          })
      });

      it('it should get a validation error object when cpf is missing - JOI (422)', (done) => {
        chai.request(server)
          .get("/account")
          .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.includes.all.keys(testData.ARRAY_KEYS_OBJECT_ERROR);
            done();
          })
      });
    });

    describe ('POST', () => {
      it('it should POST an account (200)', (done) => {           
        chai.request(server)
          .post("/account")
          .send(testData.BODY_FULL_POST_SUCCESS)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          })
      });

      it('it should get an error object when trying POST an account with unique key duplicated (406)', (done) => {
        chai.request(server)
          .post("/account")
          .send(testData.BODY_FULL_POST_DUPLICATED_KEY)
          .end((err, res) => {
            res.should.have.status(406);
            res.body.should.be.a('object');
            res.body.should.includes.all.keys(testData.ARRAY_KEYS_OBJECT_ERROR);
            done();
          })
      });
    });

    describe ('PUT', () => {
      it('it should PUT an account (200)', (done) => {
        chai.request(server)
          .put("/account")
          .set('cpf', testData.VALID_AND_EXISTING_ACCOUNT_CPF)
          .send(testData.BODY_FULL_PUT_SUCCESS)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            done();
          })
      });

      it('it should get an error object when trying PUT an account with unique key duplicated (406)', (done) => {
        chai.request(server)
          .put("/account")
          .set('cpf', testData.VALID_AND_EXISTING_ACCOUNT_CPF)
          .send(testData.BODY_FULL_PUT_DUPLICATED_KEY)
          .end((err, response) => {
            response.should.have.status(406);
            response.body.should.be.a('object');
            response.body.should.includes.all.keys(testData.ARRAY_KEYS_OBJECT_ERROR);
            done();
          })
      });

      it('it should get an error object when account is not found (404)', (done) => {
        chai.request(server)
          .put("/account")
          .set('cpf', testData.VALID_AND_NON_EXISTENT_ACCOUNT_CPF)
          .send(testData.BODY_FULL_PUT_SUCCESS)
          .end((err, response) => {
            response.should.have.status(404);
            response.body.should.be.a('object');
            response.body.should.includes.all.keys(testData.ARRAY_KEYS_OBJECT_ERROR);
            done();
          })
      });
    });
  });
