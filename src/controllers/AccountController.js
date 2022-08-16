const AccountService = require('../services/AccountService');

async function createAccount(req, res) {
    const dataBody = req.body
    const accountCreated = await AccountService.createAccount(dataBody)
    
    return res.json(accountCreated);
}

async function listAll(req, res) {
    const allAccounts = await AccountService.listAll()
    
    return res.json(allAccounts);
}

async function getAccount(req, res) {
    const { cpf } = req.headers;

    const allAccounts = await AccountService.getAccount(cpf);
    
    return res.json(allAccounts);
}

module.exports = { createAccount, listAll, getAccount }