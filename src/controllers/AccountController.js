const AccountService = require('../services/AccountService');

async function createAccount(req, res) {
    const dataBody = req.body;

    const accountCreated = await AccountService.createAccount(dataBody);
    return res.json(accountCreated);
}

async function updateAccount(req, res) {
    const dataBody = req.body;
    const { cpf } = req.headers;

    const accountUpdated = await AccountService.updateAccount(dataBody, cpf);
    return res.json(accountUpdated);
}

async function listAllAccounts(req, res) {
    const allAccounts = await AccountService.listAllAccounts()
    
    return res.json(allAccounts);
}

async function getAccount(req, res) {
    const { cpf } = req.headers;

    const allAccounts = await AccountService.getAccount(cpf);
    
    return res.json(allAccounts);
}

async function deleteAccount(req, res) {
    //search about cascade
    const { cpf } = req.headers;

    const deletedAccount = await AccountService.deleteAccount(cpf);
    
    return res.json(deletedAccount);
}

module.exports = {
    createAccount,
    updateAccount,
    listAllAccounts,
    getAccount,
    deleteAccount
}