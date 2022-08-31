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
    console.log(req);
    console.log(res);

    const accountUpdated = await AccountService.updateAccount(dataBody, cpf);
    const { httpStatusCode } = accountUpdated;
    console.log(req);
    console.log(res);

    return res.status(httpStatusCode).json(accountUpdated);
}

async function listAllAccounts(req, res) {
    const allAccounts = await AccountService.listAllAccounts()
    const { httpStatusCode } = allAccounts;

    return res.status(httpStatusCode).json(allAccounts);
}

async function getAccount(req, res) {
    const { cpf } = req.headers;

    const account = await AccountService.getAccount(cpf);
    const { httpStatusCode } = account;

    return res.status(httpStatusCode).json(account);

}

async function deleteAccount(req, res) {
    const { cpf } = req.headers;

    const deletedAccount = await AccountService.deleteAccount(cpf);
    const { httpStatusCode } = deletedAccount;
    
    return res.status(httpStatusCode).json(deletedAccount);
}

module.exports = {
    createAccount,
    updateAccount,
    listAllAccounts,
    getAccount,
    deleteAccount
}