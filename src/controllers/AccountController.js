const AccountService = require('../services/AccountService');

async function createAccount(req, res) {
    const dataBody = req.body;

    const accountCreated = await AccountService.createAccount(dataBody);
    const { httpStatusCode } = accountCreated;

    return res.status(httpStatusCode).json(accountCreated);
}

async function updateAccount(req, res) {
    const dataBody = req.body;
    const { cpf } = req.headers;

    const accountUpdated = await AccountService.updateAccount(dataBody, cpf);
    const { httpStatusCode } = accountUpdated;

    return res.status(httpStatusCode).json(accountUpdated);
}

async function listAllAccounts(req, res) {
    const allAccounts = await AccountService.listAllAccounts()
    
    return res.json(allAccounts);
}

async function getAccount(req, res) {
    const { cpf } = req.headers;

    try {
        const allAccounts = await AccountService.getAccount(cpf);
        return res.json(allAccounts);
    }catch(e){
        const { httpStatusCode } = e;
        return httpStatusCode ? res.status(httpStatusCode).json(e) : res.status(500).json(e);
    }
}

async function deleteAccount(req, res) {
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