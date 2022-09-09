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

    describe('Success', () => {

        it('createStatement', async () => {
            const statement = await index.createStatement(EnumTestData.BODY_FULL_POST_STATEMENT_SUCCESS, EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf);

            chai.expect(statement).to.containSubset(EnumUnitTest(201).RESPONSE_STATEMENT_OBJECT_SUCCESS);
        });

        it('listAllStatements', async () => {
            const statements = await index.listAllStatements();

            chai.expect(statements).to.containSubset(EnumUnitTest(200).RESPONSE_STATEMENT_OBJECT_SUCCESS_ARRAY_DATA);
        });

        it('listStatementsByCpf', async () => {
            const statements = await index.listStatementsByCpf(EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf);

            chai.expect(statements).to.containSubset(EnumUnitTest(200).RESPONSE_STATEMENT_OBJECT_SUCCESS_ARRAY_DATA);
        });

        it('listFullDashboardByCpf', async () => {
            const statements = await index.listFullDashboardByCpf(EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf);

            chai.expect(statements).to.containSubset(EnumUnitTest(200).RESPONSE_FULL_DASHBOARD_STATEMENT_OBJECT_SUCCESS_ARRAY_DATA);
        });

    });

    describe('Failure', () => {
        describe('ServerError (500)', () => {
            it('createStatement', async () => {
                MongoConnection.disconnect();
                const statement = await index.createStatement(EnumTestData.BODY_FULL_POST_STATEMENT_SUCCESS, EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf);
                MongoConnection.connect();
    
                chai.expect(statement).to.containSubset(EnumUnitTest(500).RESPONSE_OBJECT_NO_DATA);
            });

            it('listAllStatements', async () => {
                MongoConnection.disconnect();
                const statements = await index.listAllStatements();
                MongoConnection.connect();
    
                chai.expect(statements).to.containSubset(EnumUnitTest(500).RESPONSE_OBJECT_NO_DATA);
            });

            it('listStatementsByCpf', async () => {
                MongoConnection.disconnect();
                const statements = await index.listStatementsByCpf(EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf);
                MongoConnection.connect();
    
                chai.expect(statements).to.containSubset(EnumUnitTest(500).RESPONSE_OBJECT_NO_DATA);
            });

/*
            it('listFullDashboardByCpf', async () => {
                MongoConnection.disconnect();
                const fullDashboard = await index.listFullDashboardByCpf(EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf);
                MongoConnection.connect();
    
                chai.expect(fullDashboard).to.containSubset(EnumUnitTest(500).RESPONSE_FULL_DASHBOARD_STATEMENT_OBJECT_SUCCESS_ARRAY_DATA);
            });
*/
        });
        describe('Duplicated key (406)', () => {
            
        });

        describe('Not found (404)', () => {
            
        });
    });

});
