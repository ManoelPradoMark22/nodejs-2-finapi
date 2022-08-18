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
        return e;
    }
}

async function deleteAllStatementsByCpf(cpf) {
    try{
        const deletedAccount = await StatementModel.deleteMany( { accountCpf: cpf } );

        if(deletedAccount.acknowledged) return `${deletedAccount.deletedCount} deleted statements.`

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