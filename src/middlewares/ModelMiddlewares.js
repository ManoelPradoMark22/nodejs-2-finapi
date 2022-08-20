const AccountModel = require('../models/Account');
const StatementModel = require('../models/Statement');
const EnumMessages = require('../support/enum/EnumMessages');

async function checkCpfExistsInAccount(req, res, next){
  try {
    const { cpf } = req.headers;
    const existingAccount = await AccountModel.findOne({ cpf: cpf });
    return existingAccount ? next() : res.status(400).json({error: EnumMessages.ACCOUNT_NOT_FOUND});
  }catch (e) {
    return res.status(400).json(e.message);
  }
}

async function checkCpfExistsInStatements(req, res, next){
  try {
    const { cpf } = req.headers;
    const existingAccount = await StatementModel.findOne({ accountCpf: cpf });
    return existingAccount ? next() : res.status(400).json({error: EnumMessages.STATEMENTS_NOT_FOUND});
  }catch (e) {
    return res.status(400).json(e.message);
  }
}

module.exports = { checkCpfExistsInAccount, checkCpfExistsInStatements }