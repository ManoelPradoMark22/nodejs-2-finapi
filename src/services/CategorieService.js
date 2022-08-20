const CategoryModel = require('../models/Category');
const EnumMessages = require('../support/enum/EnumMessages');
const ManageError = require('../support/util/ManageError');

async function createCategory(body) {
    try{
        const categorieCreated = await CategoryModel.create(body);
        return categorieCreated;
    }catch(e) {
        return ManageError.keyValueError(e, body, 'an category');
    }
}

async function updateCategory(body, key) {
    try{
        const categoryUpdated = await CategoryModel.findOneAndUpdate(
            { key: key },
            body,
            { returnOriginal: false },
        );
            
        if(!categoryUpdated) return {error: EnumMessages.CATEGORY_NOT_FOUND};

        return categoryUpdated;
    }catch(e) {
        return ManageError.keyValueError(e, body, 'an category');
    }
}

async function listAllCategories() {
    try{
        const allCategories = await CategoryModel.find();
        return allCategories;
    }catch(e) {
        return e.message;
    }    
}

module.exports = { createCategory, updateCategory, listAllCategories }