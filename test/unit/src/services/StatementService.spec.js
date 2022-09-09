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

    });

    describe('Failure', () => {
        describe('ServerError (500)', () => {
            it('createStatement', async () => {
                MongoConnection.disconnect();
                const statement = await index.createStatement(EnumTestData.BODY_FULL_POST_STATEMENT_SUCCESS, EnumTestData.BODY_FULL_POST_SUCCESS_FIXED.cpf);
                MongoConnection.connect();
    
                chai.expect(statement).to.containSubset(EnumUnitTest(500).RESPONSE_OBJECT_NO_DATA);
            });
        });
        describe('Duplicated key (406)', () => {
            
        });

        describe('Not found (404)', () => {
            
        });
    });

});
