const AccountModel = require('../models/Account');
const EnumErrors = require('../support/enum/EnumErrors');

async function checkCpfExists(req, res, next){
  try {
    const { cpf } = req.headers;
    const existingAccount = await AccountModel.findOne({ cpf: cpf });
    return existingAccount ? next() : res.status(400).json({error: EnumErrors.CUSTOMER_NOT_FOUND});
  }catch (e) {
    return res.status(400).json(e);
  }
}

module.exports = { checkCpfExists }