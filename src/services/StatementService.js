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
        const amount = await StatementModel.aggregate([
            { $match: { accountCpf: cpf } },
            { $group: {_id: "$type", amount: {$sum:  "$amount"}} },
        ]);

        const balance = {
            total: 0,
            inflow: 0,
            outflow: 0,
        }

        for(let i=0; i<amount.length; i++){
            amount[i]._id == EnumTransactionTypes.TRANSACTION_ENTRY
                ? balance.inflow = amount[i].amount 
                : balance.outflow = amount[i].amount 
        }

        balance.total = balance.inflow - balance.outflow;

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