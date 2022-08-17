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

module.exports = { createStatement }