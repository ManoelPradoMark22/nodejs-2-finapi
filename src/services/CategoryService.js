const CategoryModel = require('../models/Category');
const EnumMessages = require('../support/enum/EnumMessages');
const EnumObjectResponse = require('../support/enum/EnumObjectResponse');
const ManageError = require('../support/util/ManageError');
const ObjectResponse = require('../support/util/ObjectResponse');

async function createCategory(body) {
    try{
        const categorieCreated = await CategoryModel.create(body);
        return ObjectResponse(
            EnumMessages.SUCCESS_NAME,
            201,
            EnumMessages.SUCCESS_CREATE_CATEGORY,
            categorieCreated
        );
    }catch(e) {
        return ManageError.keyValueError(e, body, 'a category');
    }
}

async function updateCategory(body, key) {
    try{
        const categoryUpdated = await CategoryModel.findOneAndUpdate(
            { key: key },
            body,
            { returnOriginal: false },
        );
    
        if(!categoryUpdated) return EnumObjectResponse.CATEGORY_NOT_FOUND;

        return ObjectResponse(
            EnumMessages.SUCCESS_NAME,
            200,
            EnumMessages.SUCCESS_UPDATE_CATEGORY,
            categoryUpdated
        );
    }catch(e) {
        return ManageError.keyValueError(e, body, 'a category');
    }
}

async function listAllCategories() {
    try{
        const allCategories = await CategoryModel.find();
        return ObjectResponse(
            EnumMessages.SUCCESS_NAME,
            200,
            EnumMessages.SUCCESS_LISTING_ALL_CATEGORIES,
            allCategories
        );
    }catch(e) {
        return EnumObjectResponse.SERVER_ERROR;
    }    
}

module.exports = { createCategory, updateCategory, listAllCategories }