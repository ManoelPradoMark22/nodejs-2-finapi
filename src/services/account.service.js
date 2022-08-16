const AccountModel = require('../models/Account');

async function create(body) {
    try{
        const existingAccount = await AccountModel.findOne({ cpf: body.cpf }).then();

        if(existingAccount!=null) return {error: "Customer already exists!"}

        const accountCreated = await AccountModel.create(body);
        return accountCreated;
    }catch(e) {
        return e;
    }    
}

module.exports = { create }