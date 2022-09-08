const chai = require('chai');
const sinon = require("sinon");
const http = require('chai-http'); // Extensão da lib chai p/ simular requisições http
const subSet = require('chai-subset'); // Extensao da lib chai p/ verificar objetos

const index = require('../../../../src/services/AccountService'); // Arquivo a ser testado
const StatementService = require('../../../../src/services/StatementService');
const Account = require('../../../../src/models/Account');
const Statement = require('../../../../src/models/Statement');
const MongoConnection = require('../../../../src/database/MongoConnection');
const EnumTestData = require('../../../support/enum/EnumTestData');
const EnumUnitTest = require('../../../support/enum/EnumUnitTest');
const RandomGenerate = require('../../../support/util/RandomGenerate');

chai.use(http);
chai.use(subSet);

describe('AccountService.js [services]', () => {

    before(async () => {
        await Account.deleteMany({});
    });

    var account1;
    var account2;
    var account3;
    var account4;
    var account5;

    describe('Success', () => {

        it('createAccount (1)', async () => {
            account1 = EnumTestData.BODY_FULL_POST_SUCCESS;

            const account = await index.createAccount(account1);

            chai.expect(account).to.containSubset(EnumUnitTest(201).RESPONSE_OBJECT_SUCCESS);
        });

        it('createAccount (2)', async () => {
            account2 = {
                firstName: RandomGenerate.name(),
                lastName: RandomGenerate.name(),
                cpf: RandomGenerate.cpf(),
                email: RandomGenerate.email(),
                cellphone: RandomGenerate.cellphone()
            };

            const account = await index.createAccount(account2);

            chai.expect(account).to.containSubset(EnumUnitTest(201).RESPONSE_OBJECT_SUCCESS);
        });

        it('createAccount (3)', async () => {
            account3 = {
                firstName: RandomGenerate.name(),
                lastName: RandomGenerate.name(),
                cpf: RandomGenerate.cpf(),
                email: RandomGenerate.email(),
                cellphone: RandomGenerate.cellphone()
            };

            const account = await index.createAccount(account3);

            chai.expect(account).to.containSubset(EnumUnitTest(201).RESPONSE_OBJECT_SUCCESS);
        });

        it('createAccount (4)', async () => {
            account4 = {
                firstName: RandomGenerate.name(),
                lastName: RandomGenerate.name(),
                cpf: RandomGenerate.cpf(),
                email: RandomGenerate.email(),
                cellphone: RandomGenerate.cellphone()
            };

            const account = await index.createAccount(account4);

            chai.expect(account).to.containSubset(EnumUnitTest(201).RESPONSE_OBJECT_SUCCESS);
        });

        it('createAccount (5)', async () => {
            account5 = {
                firstName: RandomGenerate.name(),
                lastName: RandomGenerate.name(),
                cpf: RandomGenerate.cpf(),
                email: RandomGenerate.email(),
                cellphone: RandomGenerate.cellphone()
            };

            const account = await index.createAccount(account5);

            chai.expect(account).to.containSubset(EnumUnitTest(201).RESPONSE_OBJECT_SUCCESS);
        });

        it('updateAccount', async () => {
            const account = await index.updateAccount(EnumTestData.BODY_FULL_PUT_SUCCESS, account1.cpf);
    
            chai.expect(account).to.containSubset(EnumUnitTest(200).RESPONSE_OBJECT_SUCCESS);
        });

        it('listAllAccounts', async () => {
            const accounts = await index.listAllAccounts();
    
            chai.expect(accounts).to.containSubset(EnumUnitTest(200).RESPONSE_OBJECT_SUCCESS_ARRAY_DATA);
        });

        it('getAccount', async () => {
            const account = await index.getAccount(account1.cpf);
    
            chai.expect(account).to.containSubset(EnumUnitTest(200).RESPONSE_OBJECT_SUCCESS);
        });

        it('deleteAccount', async () => {
            const account = await index.deleteAccount(account3.cpf);
    
            chai.expect(account).to.containSubset(EnumUnitTest(200).RESPONSE_OBJECT_NO_DATA);
        });

        it('deleteAccount (and statements)', async () => {
            try {
                
                const bodyStatement = EnumTestData.BODY_FULL_POST_STATEMENT_SUCCESS;

                for(let i=0; i<3; i++) {
                    const statement = await StatementService.createStatement(bodyStatement, account4.cpf);
                    const { httpStatusCode } = statement;
                    if(httpStatusCode!==201) return chai.expect.fail('error when creating statements to test full deletion account')
                }
    
                const account = await index.deleteAccount(account4.cpf);
        
                chai.expect(account).to.containSubset(EnumUnitTest(200).RESPONSE_OBJECT_NO_DATA);
            }catch(err) {
                chai.expect.fail('error deleteAccount test');
            }
        });
    });

    describe('Failure', () => {
        describe('ServerError (500)', () => {
            it('createAccount', async () => {
                const account = await index.createAccount();
        
                chai.expect(account).to.containSubset(EnumUnitTest(500).RESPONSE_OBJECT_NO_DATA);
            });

            it('listAllAccounts', async () => {
                await MongoConnection.disconnect();
                const accounts = await sinon.stub(index.listAllAccounts('adsda'));
                await MongoConnection.connect();
                chai.expect(accounts).to.containSubset(EnumUnitTest(500).RESPONSE_OBJECT_NO_DATA);
            });

            it('getAccount', async () => {
                const account = await index.getAccount([{}, '']);
        
                chai.expect(account).to.containSubset(EnumUnitTest(500).RESPONSE_OBJECT_NO_DATA);
            });

            it('deleteAccount', async () => {
                const account = await index.deleteAccount([{}, '']);
        
                chai.expect(account).to.containSubset(EnumUnitTest(500).RESPONSE_OBJECT_NO_DATA);
            });
        });
        describe('Duplicated key (406)', () => {
            it('createAccount', async () => {
                const account = await index.createAccount(account1);
        
                chai.expect(account).to.containSubset(EnumUnitTest(406).RESPONSE_OBJECT_NO_DATA);
            });

            it('updateAccount', async () => {
                const { cpf, ...rest } = account2;
                const account = await index.updateAccount(rest, account1.cpf);
        
                chai.expect(account).to.containSubset(EnumUnitTest(406).RESPONSE_OBJECT_NO_DATA);
            });
        });

        describe('Not found (404)', () => {
            it('updateAccount', async () => {
                const account = await index.updateAccount();
        
                chai.expect(account).to.containSubset(EnumUnitTest(404).RESPONSE_OBJECT_NO_DATA);
            });

            it('getAccount (INVALID_CPF)', async () => {
                const account = await index.getAccount(EnumTestData.INVALID_CPF);
        
                chai.expect(account).to.containSubset(EnumUnitTest(404).RESPONSE_OBJECT_NO_DATA);
            });

            it('getAccount (VALID_AND_NON_EXISTENT_ACCOUNT_CPF)', async () => {
                const account = await index.getAccount(EnumTestData.VALID_AND_NON_EXISTENT_ACCOUNT_CPF);
        
                chai.expect(account).to.containSubset(EnumUnitTest(404).RESPONSE_OBJECT_NO_DATA);
            });

            it('deleteAccount (INVALID_CPF)', async () => {
                const account = await index.deleteAccount(EnumTestData.INVALID_CPF);
        
                chai.expect(account).to.containSubset(EnumUnitTest(404).RESPONSE_OBJECT_NO_DATA);
            });

            it('deleteAccount (VALID_AND_NON_EXISTENT_ACCOUNT_CPF)', async () => {
                const account = await index.deleteAccount(EnumTestData.VALID_AND_NON_EXISTENT_ACCOUNT_CPF);
        
                chai.expect(account).to.containSubset(EnumUnitTest(404).RESPONSE_OBJECT_NO_DATA);
            });
        });
    });

});
