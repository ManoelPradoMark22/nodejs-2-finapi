const AccountService = require('../services/account.service');

async function create(req, res) {
    const dataBody = req.body
    const accountCreated = await AccountService.create(dataBody)
    
    return res.json(accountCreated);
}

module.exports = { create }