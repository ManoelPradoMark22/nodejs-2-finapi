const chai = require('chai');
const sinon = require("sinon");
const http = require('chai-http'); // Extensão da lib chai p/ simular requisições http
const subSet = require('chai-subset'); // Extensao da lib chai p/ verificar objetos

const index = require('../../../../src/controllers/CategoryController'); // Arquivo a ser testado
const Category = require('../../../../src/models/Category');
const EnumTestData = require('../../../support/enum/EnumTestData');
const EnumUnitTest = require('../../../support/enum/EnumUnitTest');
const { Categories } = require('../../../support/util/Categories');

chai.use(http);
chai.use(subSet);

describe('CategoryController.js [controllers]', () => {

    before(async () => {
        await Category.deleteMany({});
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
                key: key => key
            }
        }
    });

    describe('Success', () => {

        it('listAllCategories (empty array)', async () => {
            await index.listAllCategories(req, res);
            
            chai.expect(status.calledOnce).to.be.true;
            chai.expect(status.args[0][0]).to.equal(200);
            chai.expect(json.calledOnce).to.be.true;
            chai.expect(json.args[0][0]).to.containSubset(EnumUnitTest(200).RESPONSE_OBJECT_SUCCESS_EMPTY_ARRAY_DATA);
            chai.expect(json.args[0][0].httpStatusCode).to.equal(200);
            chai.expect(json.args[0][0].data).to.eql([]);
        });

        for(let i=0; i<Categories.length; i++) {
            it('createCategory', async () => {
                req.body = Categories[i];
    
                await index.createCategory(req, res);
                
                chai.expect(status.calledOnce).to.be.true;
                chai.expect(status.args[0][0]).to.equal(201);
                chai.expect(json.calledOnce).to.be.true;
                chai.expect(json.args[0][0]).to.containSubset(EnumUnitTest(201).RESPONSE_CATEGORY_OBJECT_SUCCESS);
                chai.expect(json.args[0][0].httpStatusCode).to.equal(201);
            });   
        }

        it('updateCategory', async () => {
            const { key } = Categories[0];
            const newBody = Categories[0];
            newBody.name = 'Compras';
            req.body = newBody;
            req.headers.key = key;

            await index.updateCategory(req, res);
            
            chai.expect(status.calledOnce).to.be.true;
            chai.expect(status.args[0][0]).to.equal(200);
            chai.expect(json.calledOnce).to.be.true;
            chai.expect(json.args[0][0]).to.containSubset(EnumUnitTest(200).RESPONSE_CATEGORY_OBJECT_SUCCESS);
            chai.expect(json.args[0][0].httpStatusCode).to.equal(200);
        });

        it('listAllCategories', async () => {
            await index.listAllCategories(req, res);
            
            chai.expect(status.calledOnce).to.be.true;
            chai.expect(status.args[0][0]).to.equal(200);
            chai.expect(json.calledOnce).to.be.true;
            chai.expect(json.args[0][0]).to.containSubset(EnumUnitTest(200).RESPONSE_CATEGORY_OBJECT_SUCCESS_ARRAY_DATA);
            chai.expect(json.args[0][0].httpStatusCode).to.equal(200);
        });
    });

    describe('Failure', () => {
        
    });

});
