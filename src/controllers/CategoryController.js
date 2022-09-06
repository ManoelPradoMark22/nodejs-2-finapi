const CategoryService = require('../services/CategoryService');

async function createCategory(req, res) {
    const { body } = req;

    const categorieCreated = await CategoryService.createCategory(body);
    const { httpStatusCode } = categorieCreated;

    return res.status(httpStatusCode).json(categorieCreated);
}

async function updateCategory(req, res) {
    const { body, headers } = req;
    const { key } = headers;

    const categoryUpdated = await CategoryService.updateCategory(body, key);
    const { httpStatusCode } = categoryUpdated;

    return res.status(httpStatusCode).json(categoryUpdated);
}

async function listAllCategories(req, res) {
    const allCategories = await CategoryService.listAllCategories();
    const { httpStatusCode } = allCategories;

    return res.status(httpStatusCode).json(allCategories);
}

module.exports = { createCategory, updateCategory, listAllCategories }