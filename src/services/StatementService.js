const StatementModel = require('../models/Statement');
const AccountModel = require('../models/Account');
const CategoryModel = require('../models/Category');
const EnumTransactionTypes = require('../support/enum/EnumTransactionTypes');
const EnumMessages = require('../support/enum/EnumMessages');

async function createStatement(body, cpf) {
    try{
        const { keyCategory } = body;

        const existingCategory = await CategoryModel.findOne({ key: keyCategory });
        if(!existingCategory) return {error: EnumMessages.CATEGORY_NOT_FOUND};

        const existingAccount = await AccountModel.findOne({ cpf: cpf });
        if(!existingAccount) return {error: EnumMessages.ACCOUNT_NOT_FOUND};

        const newObject = Object.assign({ accountCpf: cpf }, body);
        const statementCreated = await StatementModel.create(newObject);
        return statementCreated;
    }catch(e) {
        return e.message;
    }
}

async function listAllStatements() {
    try{
        const allStatements = await StatementModel.find();
        return allStatements;
    }catch(e) {
        return e.message;
    }    
}

async function listStatementsByCpf(cpf) {
    try{
        const statements = await StatementModel.find({ accountCpf: cpf });
        return statements;
    }catch(e) {
        return e.message;
    }
}

async function getBalanceByCpf(cpf) {
    try{
        const arrayBalance = await StatementModel.aggregate([
            { $match: { accountCpf: cpf } },
            { $group: {_id: "$type", amount: {$sum:  "$amount"}} },
        ]);

        const balance = {
            total: 0,
            inflow: 0,
            outflow: 0,
        }

        for(let i=0; i<arrayBalance.length; i++){
            arrayBalance[i]._id == EnumTransactionTypes.TRANSACTION_ENTRY
                ? balance.inflow = arrayBalance[i].amount 
                : balance.outflow = arrayBalance[i].amount 
        }

        balance.total = balance.inflow - balance.outflow;

        return balance;
    }catch(e) {
        return e.message;
    }
}

async function deleteAllStatementsByCpf(cpf) {
    try{
        const deletedAccount = await StatementModel.deleteMany( { accountCpf: cpf } );

        const { acknowledged, deletedCount } = deletedAccount;

        if(acknowledged) return `${deletedCount} ${EnumMessages.N_STATEMENTS_DELETED}`;

        return EnumMessages.STATEMENTS_NOT_FOUND;
    }catch(e) {
        return e.message;
    }    
}

module.exports = {
    createStatement,
    listAllStatements,
    listStatementsByCpf,
    getBalanceByCpf,
    deleteAllStatementsByCpf
}