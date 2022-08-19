const CategoryModel = require('../models/Category');
const EnumMessages = require('../support/enum/EnumMessages');

async function createCategory(body) {
    try{
        const categorieCreated = await CategoryModel.create(body);
        return categorieCreated;
    }catch(e) {
        const { keyValue } = e;
        if(keyValue) {
            const keyArray = Object.keys(keyValue);
            const key = keyArray[0];
            return `Already exists an account with ${key}=${body[key]}`
        };

        return e.message;
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
        return e.message;
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