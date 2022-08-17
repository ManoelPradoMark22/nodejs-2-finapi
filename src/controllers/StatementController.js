const StatementService = require('../services/StatementService');

async function createStatement(req, res) {
    const { cpf } = req.headers;

    const statementCreated = await StatementService.createStatement(req.body, cpf);
    return res.json(statementCreated);
}

module.exports = { createStatement }