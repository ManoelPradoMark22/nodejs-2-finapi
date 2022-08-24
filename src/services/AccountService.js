const AccountModel = require('../models/Account');
const StatementModel = require('../models/Statement');
const EnumMessages = require('../support/enum/EnumMessages');
const ManageError = require('../support/util/ManageError');

async function createAccount(body) {
    try{
        const { firstName, lastName, ...onlyRequiredFields } = body;
        const searchObject = [];
        for (const key in onlyRequiredFields) {
            searchObject.push({[key]: onlyRequiredFields[key]})
        }
        const existingAccount = await AccountModel.findOne({
            $or: [
                ...searchObject
            ]
        });
        
        if(existingAccount){
            returnString = [];
            for (const key in onlyRequiredFields) {
                if(onlyRequiredFields[key] == existingAccount[key]) {
                    returnString.push(`${key}=${existingAccount[key]}`);
                }
            }
            return `${EnumMessages.ACCOUNT_ALREADY_EXISTS_WITH} ${returnString.join(',')}`;
        }

        const accountCreated = await AccountModel.create(body);

        return accountCreated;
    }catch(e) {
        return e;
    }
}

async function updateAccount(body, cpf) {
    try{
        const existingAccount = await AccountModel.findOne({ cpf: cpf });
        if(!existingAccount) throw new ManageError.UsefulError(
            'NotFoundError',
            404,
            EnumMessages.ACCOUNT_NOT_FOUND
        )

        const { firstName, lastName, ...onlyRequiredFields } = body;

        if(onlyRequiredFields && Object.keys(onlyRequiredFields).length !== 0
            && Object.getPrototypeOf(onlyRequiredFields) === Object.prototype
        ) {

            const searchObject = [];
            for (const key in onlyRequiredFields) {
                searchObject.push({[key]: onlyRequiredFields[key]})
            }
    
            const similarAccount = await AccountModel.findOne({
                $or: [
                    ...searchObject
                ],
                $nor: [
                    { cpf: cpf }
                ]
            });
        
            if(similarAccount){
                returnObj = {};
                for (const key in onlyRequiredFields) {
                    if(onlyRequiredFields[key] == similarAccount[key]) {
                        returnObj = {...returnObj, [key]: similarAccount[key]}
                    }
                }
                throw new ManageError.UsefulError(
                    EnumMessages.MONGO_DUPLICATED_KEY,
                    406,
                    'Some unique fields already exists in another account',
                    returnObj
                )
            }

        }

        const accountUdated = await AccountModel.findOneAndUpdate(
            { cpf: cpf },
            body,
            { returnOriginal: false },
        );

        /* poderia ser:
        const accountUdated = await AccountModel.updateOne(
            existingAccount,
            body,
            { returnOriginal: false },
        ); //pois ja temos o documento original existingAccount

        e o retorno seria:
        {
            "acknowledged": true,
            "modifiedCount": 1,
            "upsertedId": null,
            "upsertedCount": 0,
            "matchedCount": 1
        }
        ao inves do documento atualizado
        */

        return accountUdated;
    }catch(e) {
        throw e;
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

        if(!account) return {error: EnumMessages.ACCOUNT_NOT_FOUND}

        return account;
    }catch(e) {
        return e.message;
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