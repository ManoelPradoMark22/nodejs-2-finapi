const AccountService = require('../services/account.service');

async function create(req, res) {
    const dataBody = req.body
    const accountCreated = await AccountService.create(dataBody)
    
    return res.json(accountCreated);
}

async function listAll(req, res) {
    const allAccounts = await AccountService.listAll()
    
    return res.json(allAccounts);
}

module.exports = { create, listAll }