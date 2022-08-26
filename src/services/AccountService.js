const AccountModel = require('../models/Account');
const StatementModel = require('../models/Statement');
const EnumMessages = require('../support/enum/EnumMessages');
const ManageError = require('../support/util/ManageError');

async function createAccount(body) {
    try{
        const accountCreated = await AccountModel.create(body);

        return ManageError.objectResponse(
            EnumMessages.SUCCESS_NAME,
            201,
            EnumMessages.SUCCESS_CREATE_ACCOUNT,
            accountCreated
        );
    }catch(e) {
        return ManageError.keyValueError(e, body, 'an account');
    }
}

async function updateAccount(body, cpf) {
    try{
        const accountUpdated = await AccountModel.findOneAndUpdate(
            { cpf: cpf },
            body,
            { returnOriginal: false },
        );
            
        if(!accountUpdated) return ManageError.objectResponse(
            EnumMessages.ERROR_NOT_FOUND, 
            404,
            EnumMessages.ACCOUNT_NOT_FOUND
        );

        return ManageError.objectResponse(
            EnumMessages.SUCCESS_NAME,
            200,
            EnumMessages.SUCCESS_UPDATE_ACCOUNT,
            accountUpdated
        );
    }catch(e) {
        return ManageError.keyValueError(e, body, 'an account');
    }
}

async function listAllAccounts() {
    try{
        const allAccounts = await AccountModel.find();
        return allAccounts;
    }catch(e) {
        return e.message;
    }    
}

async function getAccount(cpf) {
    try{
        const account = await AccountModel.findOne({ cpf: cpf });

        if(!account) throw new ManageError.UsefulError('NotFoundError', 404, EnumMessages.ACCOUNT_NOT_FOUND);

        return account;
    }catch(e) {
        throw e;
    }    
}

async function deleteAccount(cpf) {
    try{
        const deletedAccount = await AccountModel.findOneAndDelete({ cpf: cpf });
        if(deletedAccount) {
            const existingStatement = await StatementModel.findOne({ accountCpf: cpf });

            if(existingStatement) {
                const deletedAccount = await StatementModel.deleteMany( { accountCpf: cpf } );
                const { acknowledged } = deletedAccount;
                if(!acknowledged) return EnumMessages.JUST_ACCOUNT_DELETED;
            }

            return EnumMessages.SUCCESS_FULL_DELETE;
        }

        return EnumMessages.ACCOUNT_NOT_FOUND;  
    }catch(e) {
        return e.message;
    }    
}

module.exports = {
    createAccount,
    updateAccount,
    listAllAccounts,
    getAccount,
    deleteAccount
}