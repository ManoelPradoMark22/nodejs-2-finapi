const StatementService = require('../services/StatementService');

async function createStatement(req, res) {
    const { cpf } = req.headers;

    const statementCreated = await StatementService.createStatement(req.body, cpf);
    return res.json(statementCreated);
}

async function listAllStatements(req, res) {
    const allStatements = await StatementService.listAllStatements()
    
    return res.json(allStatements);
}

async function listStatementsByCpf(req, res) {
    const { cpf } = req.headers;

    const statements = await StatementService.listStatementsByCpf(cpf);
    return res.json(statements);
}

async function getBalanceByCpf(req, res) {
    const { cpf } = req.headers;

    const balance = await StatementService.getBalanceByCpf(cpf);
    return res.json(balance);
}

async function getCategoryBalanceByCpf(req, res) {
    const { cpf } = req.headers;

    const balance = await StatementService.getCategoryBalanceByCpf(cpf);
    return res.json(balance);
}

async function deleteAllStatementsByCpf(req, res) {
    const { cpf } = req.headers;

    const deletedStatements = await StatementService.deleteAllStatementsByCpf(cpf);
    
    return res.json(deletedStatements);
}

module.exports = { 
    createStatement,
    listAllStatements,
    listStatementsByCpf,
    getBalanceByCpf,
    getCategoryBalanceByCpf,
    deleteAllStatementsByCpf 
}