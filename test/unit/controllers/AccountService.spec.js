const chai = require('chai');
const http = require('chai-http'); // Extensão da lib chai p/ simular requisições http
const subSet = require('chai-subset'); // Extensao da lib chai p/ verificar objetos

const index = require('../../../src/services/AccountService'); // Arquivo a ser testado
const EnumTestData = require('../../support/enum/EnumTestData');
const EnumUnitTest = require('../../support/enum/EnumUnitTest');

chai.use(http);
chai.use(subSet);

describe('Teste das funções', () => {

    describe('Success', () => {
        var cpfCreated = '';

        it('createAccount', async () => {
            const body = EnumTestData.BODY_FULL_POST_SUCCESS;
            cpfCreated = body.cpf;
            const account = await index.createAccount(body);
    
            // Verifica se as caracteristicas do objeto account é igual ao responseObject
            chai.expect(account).to.containSubset(EnumUnitTest(201).RESPONSE_OBJECT_SUCCESS);
        });

        it('updateAccount', async () => {
            const account = await index.updateAccount(EnumTestData.BODY_FULL_PUT_SUCCESS, cpfCreated);
    
            chai.expect(account).to.containSubset(EnumUnitTest(200).RESPONSE_OBJECT_SUCCESS);
        });
    });

    describe('Failure', () => {
        describe('ServerError', () => {
            it('createAccount', async () => {
                const account = await index.createAccount();
        
                chai.expect(account).to.containSubset(EnumUnitTest(500).RESPONSE_OBJECT_NO_DATA);
            });
        });
        describe('Duplicated key', () => {
            it('createAccount', async () => {
                const account = await index.createAccount(EnumTestData.BODY_FULL_POST_DUPLICATED_KEY);
        
                chai.expect(account).to.containSubset(EnumUnitTest(406).RESPONSE_OBJECT_NO_DATA);
            });
        });
    });

});
