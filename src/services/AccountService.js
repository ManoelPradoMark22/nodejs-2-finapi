const AccountModel = require('../models/Account');
const EnumErrors = require('../support/enum/EnumErrors');

async function createAccount(body) {
    try{
        const existingAccount = await AccountModel.findOne({ cpf: body.cpf }).then();

        if(existingAccount) return {error: EnumErrors.ALREADY_EXISTS}

        const accountCreated = await AccountModel.create(body);
        return accountCreated;
    }catch(e) {
        return e;
    }
}

async function listAll() {
    try{
        const allAccounts = await AccountModel.find().then();
        return allAccounts;
    }catch(e) {
        return e;
    }    
}

async function getAccount(cpf) {
    try{
        const account = await AccountModel.findOne({ cpf: cpf }).then();

        if(!account) return {error: EnumErrors.NOT_FOUND}

        return account;
    }catch(e) {
        return e;
    }    
}

module.exports = { createAccount, listAll, getAccount }