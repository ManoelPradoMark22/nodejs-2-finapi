const chai = require('chai');
const sinon = require("sinon");
const http = require('chai-http');
const subSet = require('chai-subset');

const index = require('../../../../src/services/CategoryService');
const Category = require('../../../../src/models/Category');
const { Categories } = require('../../../support/util/Categories');
const MongoConnection = require('../../../../src/database/MongoConnection');
const EnumTestData = require('../../../support/enum/EnumTestData');
const EnumUnitTest = require('../../../support/enum/EnumUnitTest');
const RandomGenerate = require('../../../support/util/RandomGenerate');

chai.use(http);
chai.use(subSet);

describe('CategoryService.js [services]', () => {
    before(async () => {
        await Category.deleteMany({});
    });

    describe('Success', () => {
        for(let i=0; i<Categories.length; i++) {
            it(`createCategory (${i+1})`, async () => {
                const category = await index.createCategory(Categories[i]);
    
                chai.expect(category).to.containSubset(EnumUnitTest(201).RESPONSE_CATEGORY_OBJECT_SUCCESS);
            });
        }

        it('updateCategory', async () => {
            const { key, ...rest } = Categories[0];
            rest.name = 'edited';
            const category = await index.updateCategory(rest, key);

            chai.expect(category).to.containSubset(EnumUnitTest(200).RESPONSE_CATEGORY_OBJECT_SUCCESS);
        });

        it('listAllCategories', async () => {
            const category = await index.listAllCategories();

            chai.expect(category).to.containSubset(EnumUnitTest(200).RESPONSE_CATEGORY_OBJECT_SUCCESS_ARRAY_DATA);
        });

    });

    describe('Failure', () => {
        describe('ServerError (500)', () => {
            it('listAllCategories', async () => {
                await MongoConnection.disconnect();
                const category = await index.listAllCategories();
                await MongoConnection.connect();
    
                chai.expect(category).to.containSubset(EnumUnitTest(500).RESPONSE_OBJECT_NO_DATA);
            });
        });
        describe('Duplicated key (406)', () => {
            it('createCategory', async () => {
                const category = await index.createCategory(Categories[0]);
    
                chai.expect(category).to.containSubset(EnumUnitTest(406).RESPONSE_OBJECT_NO_DATA);
            });

            it('updateCategory', async () => {
                const { key } = Categories[0];
                const { key:ignore, ...rest } = Categories[1];
                const category = await index.updateCategory(rest, key);
    
                chai.expect(category).to.containSubset(EnumUnitTest(406).RESPONSE_OBJECT_NO_DATA);
            });
        });

        describe('Not found (404)', () => {
            it('updateCategory', async () => {
                const { key, ...rest } = Categories[0];
                const category = await index.updateCategory(rest, 'sssssssss');
    
                chai.expect(category).to.containSubset(EnumUnitTest(404).RESPONSE_OBJECT_NO_DATA);
            });
        });
    });

});
