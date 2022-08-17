const StatementService = require('../services/StatementService');

async function createStatement(req, res) {
    const { cpf } = req.headers;

    const statementCreated = await StatementService.createStatement(req.body, cpf);
    return res.json(statementCreated);
}

async function listStatementByCpf(req, res) {
    const { cpf } = req.headers;

    const statements = await StatementService.listStatementByCpf(cpf);
    return res.json(statements);
}

module.exports = { createStatement, listStatementByCpf }