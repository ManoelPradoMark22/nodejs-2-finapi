const AccountModel = require('../models/Account');
const EnumErrors = require('../support/enum/EnumErrors');

async function checkCpfExists(req, res, next){
  const { cpf } = req.headers;
  const existingAccount = await AccountModel.findOne({ cpf: cpf }).then();
  return existingAccount ? next() : res.status(400).json({error: EnumErrors.NOT_FOUND});
}

module.exports = { checkCpfExists }