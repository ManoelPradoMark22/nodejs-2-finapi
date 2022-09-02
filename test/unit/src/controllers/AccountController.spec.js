const chai = require('chai');
const sinon = require("sinon");
const http = require('chai-http'); // Extensão da lib chai p/ simular requisições http
const subSet = require('chai-subset'); // Extensao da lib chai p/ verificar objetos

const index = require('../../../../src/controllers/AccountController'); // Arquivo a ser testado
const Account = require('../../../../src/models/Account');
const EnumTestData = require('../../../support/enum/EnumTestData');
const EnumUnitTest = require('../../../support/enum/EnumUnitTest');
const RandomGenerate = require('../../../support/util/RandomGenerate');

chai.use(http);
chai.use(subSet);

describe('controller folder', () => {

    before(async () => {
        await Account.deleteMany({});
    });

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


    var account1;
    var account2;

    describe('Success', () => {

        it('listAllAccounts (empty array)', async () => {
            await index.listAllAccounts(req, res);
            
            chai.expect(status.calledOnce).to.be.true;
            chai.expect(status.args[0][0]).to.equal(200);
            chai.expect(json.calledOnce).to.be.true;
            chai.expect(json.args[0][0]).to.containSubset(EnumUnitTest(200).RESPONSE_OBJECT_SUCCESS_EMPTY_ARRAY_DATA);
            chai.expect(json.args[0][0].httpStatusCode).to.equal(200);
            chai.expect(json.args[0][0].data).to.eql([]);
        });

        it('createAccount (1)', async () => {
            account1 = EnumTestData.BODY_FULL_POST_SUCCESS;
            req.body = account1;

            await index.createAccount(req, res);
            
            chai.expect(status.calledOnce).to.be.true;
            chai.expect(status.args[0][0]).to.equal(201);
            chai.expect(json.calledOnce).to.be.true;
            chai.expect(json.args[0][0]).to.containSubset(EnumUnitTest(201).RESPONSE_OBJECT_SUCCESS);
            chai.expect(json.args[0][0].httpStatusCode).to.equal(201);
            chai.expect(json.args[0][0].data).to.be.an('object');
            chai.expect(json.args[0][0].data).to.containSubset(EnumTestData.SUBSET_DATA_ACCOUNT);
        });

        it('createAccount (2)', async () => {
            account2 = {
                firstName: RandomGenerate.name(),
                lastName: RandomGenerate.name(),
                cpf: RandomGenerate.cpf(),
                email: RandomGenerate.email(),
                cellphone: RandomGenerate.cellphone()
            };
            req.body = account2;

            await index.createAccount(req, res);
            
            chai.expect(status.calledOnce).to.be.true;
            chai.expect(status.args[0][0]).to.equal(201);
            chai.expect(json.calledOnce).to.be.true;
            chai.expect(json.args[0][0]).to.containSubset(EnumUnitTest(201).RESPONSE_OBJECT_SUCCESS);
            chai.expect(json.args[0][0].httpStatusCode).to.equal(201);
            chai.expect(json.args[0][0].data).to.be.an('object');
            chai.expect(json.args[0][0].data).to.containSubset(EnumTestData.SUBSET_DATA_ACCOUNT);
        });

        it('updateAccount', async () => {
            const { cpf } = account2;
            req.body = EnumTestData.BODY_FULL_PUT_SUCCESS;
            req.headers.cpf = cpf;

            await index.updateAccount(req, res);
            
            chai.expect(status.calledOnce).to.be.true;
            chai.expect(status.args[0][0]).to.equal(200);
            chai.expect(json.calledOnce).to.be.true;
            chai.expect(json.args[0][0]).to.containSubset(EnumUnitTest(200).RESPONSE_OBJECT_SUCCESS);
            chai.expect(json.args[0][0].httpStatusCode).to.equal(200);
            chai.expect(json.args[0][0].data).to.be.an('object');
            chai.expect(json.args[0][0].data).to.containSubset(EnumTestData.SUBSET_DATA_ACCOUNT);
        });

        it('listAllAccounts', async () => {
            await index.listAllAccounts(req, res);
            
            chai.expect(status.calledOnce).to.be.true;
            chai.expect(status.args[0][0]).to.equal(200);
            chai.expect(json.calledOnce).to.be.true;
            chai.expect(json.args[0][0]).to.containSubset(EnumUnitTest(200).RESPONSE_OBJECT_SUCCESS_ARRAY_DATA);
            chai.expect(json.args[0][0].httpStatusCode).to.equal(200);
        });

    });

    describe('Failure', () => {
        
    });

});
