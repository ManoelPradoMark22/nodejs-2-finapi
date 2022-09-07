const chai = require('chai');
const sinon = require("sinon");
const http = require('chai-http');
const subSet = require('chai-subset');

const index = require('../../../../src/controllers/StatementController');
const Statement = require('../../../../src/models/Statement');
const EnumTestData = require('../../../support/enum/EnumTestData');
const EnumUnitTest = require('../../../support/enum/EnumUnitTest');

chai.use(http);
chai.use(subSet);

describe('StatementController.js [controllers]', () => {

    before(async () => {
        await Statement.deleteMany({});
    });

    let status, json, res, req;
    beforeEach(() => {
        status = sinon.stub();
        json = sinon.spy();
        res = { json, status };
        status.returns(res);
        req = {
            body: {},
            headers: { cpf: cpf => cpf }
        }
    });

    describe('Success', () => {

        it('listAllStatements (empty array)', async () => {
            await index.listAllStatements(req, res);
            
            chai.expect(status.calledOnce).to.be.true;
            chai.expect(status.args[0][0]).to.equal(200);
            chai.expect(json.calledOnce).to.be.true;
            chai.expect(json.args[0][0]).to.containSubset(EnumUnitTest(200).RESPONSE_OBJECT_SUCCESS_EMPTY_ARRAY_DATA);
            chai.expect(json.args[0][0].httpStatusCode).to.equal(200);
            chai.expect(json.args[0][0].data).to.eql([]);
        });

        for(let i=0; i<3; i++) {
            it('createStatement', async () => {
                req.body = EnumTestData.BODY_FULL_POST_STATEMENT_SUCCESS;
                req.headers.cpf = EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf;
    
                await index.createStatement(req, res);
                
                chai.expect(status.calledOnce).to.be.true;
                chai.expect(status.args[0][0]).to.equal(201);
                chai.expect(json.calledOnce).to.be.true;
                chai.expect(json.args[0][0]).to.containSubset(EnumUnitTest(201).RESPONSE_STATEMENT_OBJECT_SUCCESS);
                chai.expect(json.args[0][0].httpStatusCode).to.equal(201);
            }); 
        }

        it('listAllStatements', async () => {
            await index.listAllStatements(req, res);
            
            chai.expect(status.calledOnce).to.be.true;
            chai.expect(status.args[0][0]).to.equal(200);
            chai.expect(json.calledOnce).to.be.true;
            chai.expect(json.args[0][0]).to.containSubset(EnumUnitTest(200).RESPONSE_STATEMENT_OBJECT_SUCCESS_ARRAY_DATA);
            chai.expect(json.args[0][0].httpStatusCode).to.equal(200);
        });
    });

    describe('Failure', () => {
        
    });

});
