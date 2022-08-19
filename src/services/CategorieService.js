const CategoryModel = require('../models/Category');
const EnumErrors = require('../support/enum/EnumErrors');

async function createCategory(body) {
    const { key, name } = body;

    try{
        const existingCategorie = await CategoryModel.findOne(
            {
                $or: [
                    { key: key },
                    { name: name }
                ]
            }
        );

        if(existingCategorie) return { error: EnumErrors.CATEGORY_ALREADY_EXISTS };

        const categorieCreated = await CategoryModel.create(body);
        return categorieCreated;
    }catch(e) {
        return e;
    }
}

async function listAllCategories() {
    try{
        const allCategories = await CategoryModel.find();
        return allCategories;
    }catch(e) {
        return e;
    }    
}

module.exports = { createCategory, listAllCategories }