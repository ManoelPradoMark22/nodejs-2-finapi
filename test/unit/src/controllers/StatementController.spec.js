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

    const dateNow = new Date();

    let status, json, res, req;
    beforeEach(() => {
        status = sinon.stub();
        json = sinon.spy();
        res = { json, status };
        status.returns(res);
        req = {
            body: {},
            headers: { 
                cpf: cpf => cpf,
                date: date => date
            }
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

        it('listFullDashboardByCpf (empty statement array)', async () => {
            req.headers.cpf = EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf;

            await index.listFullDashboardByCpf(req, res);
            
            chai.expect(status.calledOnce).to.be.true;
            chai.expect(status.args[0][0]).to.equal(200);
            chai.expect(json.calledOnce).to.be.true;
            chai.expect(json.args[0][0]).to.containSubset(EnumUnitTest(200).RESPONSE_FULL_DASHBOARD_STATEMENT_EMPTY_OBJECT_SUCCESS_ARRAY_DATA);
            chai.expect(json.args[0][0].httpStatusCode).to.equal(200);
            chai.expect(json.args[0][0].data.statements).to.eql([]);
        });

        it('getCategoryBalanceByCpf (empty arrays)', async () => {
            req.headers.cpf = EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf;

            await index.getCategoryBalanceByCpf(req, res);
            
            chai.expect(status.calledOnce).to.be.true;
            chai.expect(status.args[0][0]).to.equal(200);
            chai.expect(json.calledOnce).to.be.true;
            chai.expect(json.args[0][0]).to.containSubset(EnumUnitTest(200).RESPONSE_FULL_BALANCE_STATEMENT_BY_CATEGORY_ARRAY_DATA_EMPTY);
            chai.expect(json.args[0][0].httpStatusCode).to.equal(200);
            chai.expect(json.args[0][0].data.inflow).to.eql([]);
            chai.expect(json.args[0][0].data.outflow).to.eql([]);
        });

        for(let i=0; i<4; i++) {
            it('createStatement', async () => {
                req.body = {
                    description: "Nintendo giftcard",
                    amount: 150,
                    type: i%2 === 0 ? "negative" : "positive", //cadastrando entrada e saída
                    keyCategory: "leisure"
                };
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

        it('listStatementsByCpf', async () => {
            req.headers.cpf = EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf;

            await index.listStatementsByCpf(req, res);
            
            chai.expect(status.calledOnce).to.be.true;
            chai.expect(status.args[0][0]).to.equal(200);
            chai.expect(json.calledOnce).to.be.true;
            chai.expect(json.args[0][0]).to.containSubset(EnumUnitTest(200).RESPONSE_STATEMENT_OBJECT_SUCCESS);
            chai.expect(json.args[0][0].httpStatusCode).to.equal(200);
        });

        it('getBalanceByCpf', async () => {
            req.headers.cpf = EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf;

            await index.getBalanceByCpf(req, res);
            
            chai.expect(status.calledOnce).to.be.true;
            chai.expect(status.args[0][0]).to.equal(200);
            chai.expect(json.calledOnce).to.be.true;
            chai.expect(json.args[0][0]).to.containSubset(EnumUnitTest(200).RESPONSE_STATEMENT_OBJECT_SUCCESS);
            chai.expect(json.args[0][0].httpStatusCode).to.equal(200);
        });

        it('getCategoryBalanceByCpf', async () => {
            req.headers.cpf = EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf;

            await index.getCategoryBalanceByCpf(req, res);
            
            chai.expect(status.calledOnce).to.be.true;
            chai.expect(status.args[0][0]).to.equal(200);
            chai.expect(json.calledOnce).to.be.true;
            chai.expect(json.args[0][0]).to.containSubset(EnumUnitTest(200).RESPONSE_STATEMENT_OBJECT_SUCCESS);
            chai.expect(json.args[0][0].httpStatusCode).to.equal(200);
        });

        it('getCategoryBalanceByCpfAndDate', async () => {
            req.headers.cpf = EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf;
            req.headers.date = dateNow.toString();

            await index.getCategoryBalanceByCpfAndDate(req, res);
            
            chai.expect(status.calledOnce).to.be.true;
            chai.expect(status.args[0][0]).to.equal(200);
            chai.expect(json.calledOnce).to.be.true;
            chai.expect(json.args[0][0]).to.containSubset(EnumUnitTest(200).RESPONSE_FULL_BALANCE_STATEMENT_BY_CATEGORY_FILTER_DATA_SUCCESS);
            chai.expect(json.args[0][0].httpStatusCode).to.equal(200);
        });

        it('listFullDashboardByCpf', async () => {
            req.headers.cpf = EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf;

            await index.listFullDashboardByCpf(req, res);
            
            chai.expect(status.calledOnce).to.be.true;
            chai.expect(status.args[0][0]).to.equal(200);
            chai.expect(json.calledOnce).to.be.true;
            chai.expect(json.args[0][0]).to.containSubset(EnumUnitTest(200).RESPONSE_FULL_DASHBOARD_STATEMENT_OBJECT_SUCCESS_ARRAY_DATA);
            chai.expect(json.args[0][0].httpStatusCode).to.equal(200);
        });

        it('deleteAllStatementsByCpf', async () => {
            req.headers.cpf = EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf;

            await index.deleteAllStatementsByCpf(req, res);
            
            chai.expect(status.calledOnce).to.be.true;
            chai.expect(status.args[0][0]).to.equal(200);
            chai.expect(json.calledOnce).to.be.true;
            chai.expect(json.args[0][0]).to.containSubset(EnumUnitTest(200).RESPONSE_OBJECT_NO_DATA);
            chai.expect(json.args[0][0].httpStatusCode).to.equal(200);
        });
    });

    describe('Failure', () => {
        
    });

});
