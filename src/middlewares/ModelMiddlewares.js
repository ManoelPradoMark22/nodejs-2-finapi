const AccountModel = require('../models/Account');
const StatementModel = require('../models/Statement');
const EnumObjectResponse = require('../support/enum/EnumObjectResponse');

async function checkCpfExistsInAccount(req, res, next){
  try {
    const { cpf } = req.headers;
    const existingAccount = await AccountModel.findOne({ cpf: cpf });
    return existingAccount ? next() : res.status(404).json(EnumObjectResponse.ACCOUNT_NOT_FOUND);
  }catch (e) {
    return res.status(500).json(EnumObjectResponse.SERVER_ERROR);
  }
}

async function checkCpfExistsInStatements(req, res, next){
  try {
    const { cpf } = req.headers;
    const existingStatement = await StatementModel.findOne({ accountCpf: cpf });
    return existingStatement ? next() : res.status(404).json(EnumObjectResponse.STATEMENTS_NOT_FOUND);
  }catch (e) {
    return res.status(500).json(EnumObjectResponse.SERVER_ERROR);
  }
}

module.exports = { checkCpfExistsInAccount, checkCpfExistsInStatements }