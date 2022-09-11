const chai = require('chai');
const sinon = require("sinon");
const http = require('chai-http');
const subSet = require('chai-subset');

const index = require('../../../../src/services/StatementService');
const Statement = require('../../../../src/models/Statement');
const MongoConnection = require('../../../../src/database/MongoConnection');
const EnumTestData = require('../../../support/enum/EnumTestData');
const EnumUnitTest = require('../../../support/enum/EnumUnitTest');
const RandomGenerate = require('../../../support/util/RandomGenerate');

chai.use(http);
chai.use(subSet);

describe('StatementService.js [services]', () => {

    before(async () => {
        await Statement.deleteMany({});
    });

    const dateNow = new Date();

    describe('Success', () => {

        it('getBalanceByCpf (fields ZERO)', async () => {
            const statements = await index.getBalanceByCpf(EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf);

            chai.expect(statements).to.containSubset(EnumUnitTest(200).RESPONSE_BALANCE_STATEMENT_DATA_ZERO);
        });

        it('getCategoryBalanceByCpfAndDate (empty)', async () => {
            const fullBalance = await index.getCategoryBalanceByCpfAndDate(EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf, dateNow.toString());

            chai.expect(fullBalance).to.containSubset(EnumUnitTest(200).RESPONSE_FULL_BALANCE_STATEMENT_BY_CATEGORY_FILTER_DATA_EMPTY);
        });

        for(let i=0; i<4; i++) {
            it(`createStatement (${i+1})`, async () => {
                const statement = await index.createStatement(
                    {
                        description: "Nintendo giftcard",
                        amount: 150,
                        type: i%2 === 0 ? "negative" : "positive", //cadastrando entrada e saída
                        keyCategory: "leisure"
                    }, 
                    EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf
                );
    
                chai.expect(statement).to.containSubset(EnumUnitTest(201).RESPONSE_STATEMENT_OBJECT_SUCCESS);
            });
        }

        it('listAllStatements', async () => {
            const statements = await index.listAllStatements();

            chai.expect(statements).to.containSubset(EnumUnitTest(200).RESPONSE_STATEMENT_OBJECT_SUCCESS_ARRAY_DATA);
        });

        it('listStatementsByCpf', async () => {
            const statements = await index.listStatementsByCpf(EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf);

            chai.expect(statements).to.containSubset(EnumUnitTest(200).RESPONSE_STATEMENT_OBJECT_SUCCESS_ARRAY_DATA);
        });

        it('listFullDashboardByCpf', async () => {
            const fullDashboard = await index.listFullDashboardByCpf(EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf);

            chai.expect(fullDashboard).to.containSubset(EnumUnitTest(200).RESPONSE_FULL_DASHBOARD_STATEMENT_OBJECT_SUCCESS_ARRAY_DATA);
        });

        it('getBalanceByCpf', async () => {
            const balance = await index.getBalanceByCpf(EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf);

            chai.expect(balance).to.containSubset(EnumUnitTest(200).RESPONSE_BALANCE_STATEMENT_DATA_SUCCESS);
        });

        it('getCategoryBalanceByCpf', async () => {
            const fullBalance = await index.getCategoryBalanceByCpf(EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf);

            chai.expect(fullBalance).to.containSubset(EnumUnitTest(200).RESPONSE_FULL_BALANCE_STATEMENT_BY_CATEGORY_ARRAY_DATA_SUCCESS);
        });

        it('getCategoryBalanceByCpfAndDate', async () => {
            const fullBalance = await index.getCategoryBalanceByCpfAndDate(EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf, dateNow.toString());

            chai.expect(fullBalance).to.containSubset(EnumUnitTest(200).RESPONSE_FULL_BALANCE_STATEMENT_BY_CATEGORY_FILTER_DATA_SUCCESS);
        });

        it('deleteAllStatementsByCpf', async () => {
            const response = await index.deleteAllStatementsByCpf(EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf);

            chai.expect(response).to.containSubset(EnumUnitTest(200).RESPONSE_OBJECT_NO_DATA);
        });

    });

    describe('Failure', () => {
        describe('ServerError (500)', () => {
            it('createStatement', async () => {
                await MongoConnection.disconnect();
                const statement = await index.createStatement(EnumTestData.BODY_FULL_POST_STATEMENT_SUCCESS, EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf);
                await MongoConnection.connect();
    
                chai.expect(statement).to.containSubset(EnumUnitTest(500).RESPONSE_OBJECT_NO_DATA);
            });

            it('listAllStatements', async () => {
                await MongoConnection.disconnect();
                const statements = await index.listAllStatements();
                await MongoConnection.connect();
    
                chai.expect(statements).to.containSubset(EnumUnitTest(500).RESPONSE_OBJECT_NO_DATA);
            });

            it('listStatementsByCpf', async () => {
                await MongoConnection.disconnect();
                const statements = await index.listStatementsByCpf(EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf);
                await MongoConnection.connect();
    
                chai.expect(statements).to.containSubset(EnumUnitTest(500).RESPONSE_OBJECT_NO_DATA);
            });


            it('listFullDashboardByCpf', async () => {
                await MongoConnection.disconnect();
                const fullDashboard = await index.listFullDashboardByCpf(EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf);
                await MongoConnection.connect();
    
                chai.expect(fullDashboard).to.containSubset(EnumUnitTest(500).RESPONSE_OBJECT_NO_DATA);
            });

            it('getBalanceByCpf', async () => {
                await MongoConnection.disconnect();
                const balance = await index.getBalanceByCpf(EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf);
                await MongoConnection.connect();
    
                chai.expect(balance).to.containSubset(EnumUnitTest(500).RESPONSE_OBJECT_NO_DATA);
            });

            it('getCategoryBalanceByCpf', async () => {
                await MongoConnection.disconnect();
                const fullBalance = await index.getCategoryBalanceByCpf(EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf);
                await MongoConnection.connect();
    
                chai.expect(fullBalance).to.containSubset(EnumUnitTest(500).RESPONSE_OBJECT_NO_DATA);
            });

            it('getCategoryBalanceByCpfAndDate', async () => {
                await MongoConnection.disconnect();
                const fullBalance = await index.getCategoryBalanceByCpfAndDate(EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf, dateNow.toString());
                await MongoConnection.connect();
    
                chai.expect(fullBalance).to.containSubset(EnumUnitTest(500).RESPONSE_OBJECT_NO_DATA);
            });

            it('deleteAllStatementsByCpf', async () => {
                await MongoConnection.disconnect();
                const response = await index.deleteAllStatementsByCpf(EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf);
                await MongoConnection.connect();
    
                chai.expect(response).to.containSubset(EnumUnitTest(500).RESPONSE_OBJECT_NO_DATA);
            });

        });
        describe('Duplicated key (406)', () => {
            
        });

        describe('Not found (404)', () => {
            it('createStatement (category not found)', async () => {
                const statement = await index.createStatement(EnumTestData.BODY_FULL_POST_STATEMENT_CATEGORY_NOT_FOUND, EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf);
    
                chai.expect(statement).to.containSubset(EnumUnitTest(404).RESPONSE_OBJECT_NO_DATA);
            });

            it('createStatement (account not found)', async () => {
                const statement = await index.createStatement(EnumTestData.BODY_FULL_POST_STATEMENT_SUCCESS, 'ddd');
    
                chai.expect(statement).to.containSubset(EnumUnitTest(404).RESPONSE_OBJECT_NO_DATA);
            });

            it('deleteAllStatementsByCpf', async () => {
                const response = await index.deleteAllStatementsByCpf(EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf);
    
                chai.expect(response).to.containSubset(EnumUnitTest(404).RESPONSE_OBJECT_NO_DATA);
            });
        });
    });

});
