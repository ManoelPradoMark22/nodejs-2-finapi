const StatementModel = require('../models/Statement');
const EnumErrors = require('../support/enum/EnumErrors');

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
    deleteAllStatementsByCpf
}