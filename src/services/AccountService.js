const AccountModel = require('../models/Account');
const StatementModel = require('../models/Statement');
const EnumMessages = require('../support/enum/EnumMessages');
const EnumObjectResponse = require('../support/enum/EnumObjectResponse');
const ManageError = require('../support/util/ManageError');
const ObjectResponse = require('../support/util/ObjectResponse');

async function createAccount(body) {
    try{
        const accountCreated = await AccountModel.create(body);

        return ObjectResponse(
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
            
        if(!accountUpdated) return EnumObjectResponse.ACCOUNT_NOT_FOUND;

        return ObjectResponse(
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
        return ObjectResponse(
            EnumMessages.SUCCESS_NAME,
            200,
            EnumMessages.SUCCESS_LISTING_ALL_ACCOUNTS,
            allAccounts
        );
    }catch(e) {
        return EnumObjectResponse.SERVER_ERROR;
    }    
}

async function getAccount(cpf) {
    try{
        const account = await AccountModel.findOne({ cpf: cpf });

        if(!account) return EnumObjectResponse.ACCOUNT_NOT_FOUND;

        return ObjectResponse(
            EnumMessages.SUCCESS_NAME,
            200,
            EnumMessages.SUCCESS_GET_ACCOUNT,
            account
        );
    }catch(e) {
        return EnumObjectResponse.SERVER_ERROR;
    }    
}

async function deleteAccount(cpf) {
    try{
        const deletedAccount = await AccountModel.findOneAndDelete({ cpf: cpf });
        if(deletedAccount) {
            const existingStatement = await StatementModel.findOne({ accountCpf: cpf });

            if(existingStatement) {
                const deletedStatements = await StatementModel.deleteMany( { accountCpf: cpf } );
                const { acknowledged } = deletedStatements;
                if(!acknowledged) return ObjectResponse(
                    EnumMessages.SUCCESS_NAME,
                    200,
                    EnumMessages.JUST_ACCOUNT_DELETED
                );
            }

            return ObjectResponse(
                EnumMessages.SUCCESS_NAME,
                200,
                EnumMessages.SUCCESS_FULL_DELETE
            );
        }

        return EnumObjectResponse.ACCOUNT_NOT_FOUND;
    }catch(e) {
        return EnumObjectResponse.SERVER_ERROR;
    }    
}

module.exports = {
    createAccount,
    updateAccount,
    listAllAccounts,
    getAccount,
    deleteAccount
}