const AccountModel = require('../models/Account');

async function create(body) {
    try{
        const existingAccount = await AccountModel.findOne({ cpf: body.cpf }).then();

        if(existingAccount) return {error: "Customer already exists!"}

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

        if(!account) return {error: "Customer not found!"}

        return account;
    }catch(e) {
        return e;
    }    
}

module.exports = { create, listAll, getAccount }