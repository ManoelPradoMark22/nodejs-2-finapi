const StatementModel = require('../models/Statement');
const EnumTransactionTypes = require('../support/enum/EnumTransactionTypes');

async function createStatement(body, cpf) {
    try{
        const newObject = Object.assign({ accountCpf: cpf }, body);
        const statementCreated = await StatementModel.create(newObject);
        return statementCreated;
    }catch(e) {
        return e;
    }
}

async function listAllStatements() {
    try{
        const allStatements = await StatementModel.find();
        return allStatements;
    }catch(e) {
        return e;
    }    
}

async function listStatementsByCpf(cpf) {
    try{
        const statements = await StatementModel.find({ accountCpf: cpf });
        return statements;
    }catch(e) {
        return e;
    }
}

async function getBalanceByCpf(cpf) {
    try{
        const debits = await StatementModel.aggregate([
            { $match: { type: EnumTransactionTypes.TRANSACTION_ENTRY, accountCpf: cpf } },
            { $group: {_id: "$accountCpf", debits: {$sum: "$amount"}} }
        ]);

        const credits = await StatementModel.aggregate([
            { $match: { type: EnumTransactionTypes.TRANSACTION_OUT, accountCpf: cpf } },
            { $group: {_id: "$accountCpf", credits: {$sum: "$amount"}} }
        ]);

        const valueDebits = debits.length>0 ? debits[0].debits : 0;
        const valueCredits = credits.length>0 ? credits[0].credits : 0;
        const balance = {
            cpf: cpf,
            total: valueDebits-valueCredits,
            debits: valueDebits,
            credits: valueCredits
        }

        return balance;
    }catch(e) {
        return e;
    }
}

async function deleteAllStatementsByCpf(cpf) {
    try{
        const deletedAccount = await StatementModel.deleteMany( { cpf: cpf } );
        return deletedAccount;
    }catch(e) {
        return e;
    }    
}

module.exports = {
    createStatement,
    listAllStatements,
    listStatementsByCpf,
    getBalanceByCpf,
    deleteAllStatementsByCpf
}