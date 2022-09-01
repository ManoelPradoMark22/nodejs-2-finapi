const chai = require('chai');
const sinon = require("sinon");
const http = require('chai-http'); // Extensão da lib chai p/ simular requisições http
const subSet = require('chai-subset'); // Extensao da lib chai p/ verificar objetos

const index = require('../../../../src/controllers/AccountController'); // Arquivo a ser testado
const EnumTestData = require('../../../support/enum/EnumTestData');
const EnumUnitTest = require('../../../support/enum/EnumUnitTest');
const RandomGenerate = require('../../../support/util/RandomGenerate');

chai.use(http);
chai.use(subSet);

describe('controller folder', () => {

    let status, json, res, req;
    beforeEach(() => {
        status = sinon.stub();
        json = sinon.spy();
        res = { json, status };
        status.returns(res);
        req = {
            body: {
                
            },
            headers: {
                cpf: cpf => cpf
            }
        }
      });

    describe('Success', () => {

        it('createAccount', async () => {
            req.body = EnumTestData.BODY_FULL_POST_SUCCESS;

            await index.createAccount(req, res);
            
            chai.expect(status.calledOnce).to.be.true;
            chai.expect(status.args[0][0]).to.equal(201);
            chai.expect(json.calledOnce).to.be.true;
            chai.expect(json.args[0][0]).to.containSubset(EnumUnitTest(201).RESPONSE_OBJECT_SUCCESS);
            chai.expect(json.args[0][0].httpStatusCode).to.equal(201);
            chai.expect(json.args[0][0].data).to.be.an('object');
            chai.expect(json.args[0][0].data).to.containSubset(EnumTestData.SUBSET_DATA_ACCOUNT);
        });

    });

    describe('Failure', () => {
        
    });

});
