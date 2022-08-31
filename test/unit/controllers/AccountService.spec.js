const chai = require('chai');
const http = require('chai-http'); // Extensão da lib chai p/ simular requisições http
const subSet = require('chai-subset'); // Extensao da lib chai p/ verificar objetos

const index = require('../../../src/services/AccountService'); // Arquivo a ser testado
const EnumTestData = require('../../support/enum/EnumTestData');
const EnumUnitTest = require('../../support/enum/EnumUnitTest');
const RandomGenerate = require('../../support/util/RandomGenerate');

chai.use(http);
chai.use(subSet);

describe('Teste das funções', () => {

    var account1;
    var account2;

    describe('Success', () => {

        it('createAccount', async () => {
            account1 = EnumTestData.BODY_FULL_POST_SUCCESS;

            const account = await index.createAccount(account1);

            chai.expect(account).to.containSubset(EnumUnitTest(201).RESPONSE_OBJECT_SUCCESS);
        });

        it('createAccount', async () => {
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

        it('updateAccount', async () => {
            const account = await index.updateAccount(EnumTestData.BODY_FULL_PUT_SUCCESS, account1.cpf);
    
            chai.expect(account).to.containSubset(EnumUnitTest(200).RESPONSE_OBJECT_SUCCESS);
        });
    });

    describe('Failure', () => {
        describe('ServerError (500)', () => {
            it('createAccount', async () => {
                const account = await index.createAccount();
        
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
        });
    });

});
