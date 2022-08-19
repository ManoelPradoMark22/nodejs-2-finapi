const AccountModel = require('../models/Account');
const StatementService = require('../services/StatementService');
const EnumErrors = require('../support/enum/EnumErrors');
const EnumSuccess = require('../support/enum/EnumSuccess');

async function createAccount(body) {
    const { cpf } = body;

    try{
        const existingAccount = await AccountModel.findOne({ cpf: cpf });

        if(existingAccount) return {error: EnumErrors.CUSTOMER_ALREADY_EXISTS}

        const accountCreated = await AccountModel.create(body);
        return accountCreated;
    }catch(e) {
        return e;
    }
}

async function updateAccount(body, cpf) {
    try{
        const accountUpdated = await AccountModel.findOneAndUpdate(
            { cpf: cpf },
            body,
            { returnOriginal: false },
        );
            
        if(!accountUpdated) return {error: EnumErrors.CUSTOMER_NOT_FOUND};

        return accountUpdated;
    }catch(e) {
        return e;
    }
}

async function listAllAccounts() {
    try{
        const allAccounts = await AccountModel.find();
        return allAccounts;
    }catch(e) {
        return e;
    }    
}

async function getAccount(cpf) {
    try{
        const account = await AccountModel.findOne({ cpf: cpf });

        if(!account) return {error: EnumErrors.CUSTOMER_NOT_FOUND}

        return account;
    }catch(e) {
        return e;
    }    
}

async function deleteAccount(cpf) {
    try{
        const deletedAccount = await AccountModel.deleteOne( { cpf: cpf } );
        console.log(deletedAccount);
        await StatementService.deleteAllStatementsByCpf(cpf);
        if(deletedAccount.acknowledged && (deletedAccount.deletedCount>0)) return EnumSuccess.SUCCESS_DELETE;

        return deletedAccount;  
    }catch(e) {
        return e;
    }    
}

module.exports = {
    createAccount,
    updateAccount,
    listAllAccounts,
    getAccount,
    deleteAccount
}