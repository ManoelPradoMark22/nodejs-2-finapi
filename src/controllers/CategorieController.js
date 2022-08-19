const CategorieService = require('../services/CategorieService');

async function createCategory(req, res) {
    const categorieCreated = await CategorieService.createCategory(req.body);
    return res.json(categorieCreated);
}

async function updateCategory(req, res) {
    const { body, headers } = req;
    const { key } = headers;
    const categoryUpdated = await CategorieService.updateCategory(body, key);
    return res.json(categoryUpdated);
}

async function listAllCategories(req, res) {
    const allCategories = await CategorieService.listAllCategories();
    return res.json(allCategories);
}

module.exports = { createCategory, updateCategory, listAllCategories }