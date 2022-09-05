const StatementService = require('../services/StatementService');

async function createStatement(req, res) {
    const { headers, body } = req;
    const { cpf } = headers;

    const statementCreated = await StatementService.createStatement(body, cpf);
    const { httpStatusCode } = statementCreated;
    
    return res.status(httpStatusCode).json(statementCreated);
}

async function listAllStatements(req, res) {
    const allStatements = await StatementService.listAllStatements();
    const { httpStatusCode } = allStatements;
    
    return res.status(httpStatusCode).json(allStatements);
}

async function listFullDashboardByCpf(req, res) {
    const { cpf } = req.headers;

    const statements = await StatementService.listFullDashboardByCpf(cpf);
    const { httpStatusCode } = statements;

    return res.status(httpStatusCode).json(statements);
}

async function listStatementsByCpf(req, res) {
    const { cpf } = req.headers;

    const statements = await StatementService.listStatementsByCpf(cpf);
    const { httpStatusCode } = statements;

    return res.status(httpStatusCode).json(statements);
}

async function getBalanceByCpf(req, res) {
    const { cpf } = req.headers;

    const balance = await StatementService.getBalanceByCpf(cpf);
    const { httpStatusCode } = balance;

    return res.status(httpStatusCode).json(balance);
}

async function getCategoryBalanceByCpf(req, res) {
    const { cpf } = req.headers;

    const categoryBalance = await StatementService.getCategoryBalanceByCpf(cpf);
    const { httpStatusCode } = categoryBalance;

    return res.status(httpStatusCode).json(categoryBalance);
}

async function deleteAllStatementsByCpf(req, res) {
    const { cpf } = req.headers;

    const deletedStatements = await StatementService.deleteAllStatementsByCpf(cpf);
    const { httpStatusCode } = deletedStatements;
    
    return res.status(httpStatusCode).json(deletedStatements);
}

module.exports = { 
    createStatement,
    listAllStatements,
    listFullDashboardByCpf,
    listStatementsByCpf,
    getBalanceByCpf,
    getCategoryBalanceByCpf,
    deleteAllStatementsByCpf 
}