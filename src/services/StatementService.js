const StatementModel = require('../models/Statement');
const AccountModel = require('../models/Account');
const CategoryModel = require('../models/Category');
const CategoryService = require('../services/CategoryService');
const EnumTransactionTypes = require('../support/enum/EnumTransactionTypes');
const EnumMessages = require('../support/enum/EnumMessages');
const EnumObjectResponse = require('../support/enum/EnumObjectResponse');
const ObjectResponse = require('../support/util/ObjectResponse');

async function createStatement(body, cpf) {
    try{
        const { keyCategory } = body;

        const existingCategory = await CategoryModel.findOne({ key: keyCategory });
        if(!existingCategory) return EnumObjectResponse.CATEGORY_NOT_FOUND;

        const existingAccount = await AccountModel.findOne({ cpf: cpf });
        if(!existingAccount) return EnumObjectResponse.ACCOUNT_NOT_FOUND;

        const newObject = Object.assign({ accountCpf: cpf }, body);
        const statementCreated = await StatementModel.create(newObject);
        return ObjectResponse(
            EnumMessages.SUCCESS_NAME,
            201,
            EnumMessages.SUCCESS_CREATE_STATEMENT,
            statementCreated
        );
    }catch(e) {
        return EnumObjectResponse.SERVER_ERROR;
    }
}

async function listAllStatements() {
    try{
        const allStatements = await StatementModel.find();
        return ObjectResponse(
            EnumMessages.SUCCESS_NAME,
            200,
            EnumMessages.SUCCESS_LISTING_ALL_STATEMENTS,
            allStatements
        );
    }catch(e) {
        return EnumObjectResponse.SERVER_ERROR;
    }    
}

async function listFullDashboardByCpf(cpf) {
    const responseStatements = await listStatementsByCpf(cpf);
    const { data: statements } = responseStatements;
    if(!statements) return responseStatements;
    
    const responseCategories = await CategoryService.listAllCategories();
    const { data: categories } = responseCategories;
    if(!categories) return responseCategories;

    const responseBalance = await getBalanceByCpf(cpf);
    const { data: balance } = responseBalance;
    if(!balance) return responseBalance;

    return ObjectResponse(
        EnumMessages.SUCCESS_NAME,
        200,
        EnumMessages.SUCCESS_GET_STATEMENTS,
        {
            statements: statements,
            balance: balance,
            categories: categories
        }
    );
}

async function listStatementsByCpf(cpf) {
    try{
        const statements = await StatementModel.find({ accountCpf: cpf }).sort({ createdAt: -1 });
        return ObjectResponse(
            EnumMessages.SUCCESS_NAME,
            200,
            EnumMessages.SUCCESS_GET_STATEMENTS,
            statements
        );
    }catch(e) {
        return EnumObjectResponse.SERVER_ERROR;
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

        return ObjectResponse(
            EnumMessages.SUCCESS_NAME,
            200,
            EnumMessages.SUCCESS_GET_BALANCE,
            balance
        );
    }catch(e) {
        return EnumObjectResponse.SERVER_ERROR;
    }
}

async function getCategoryBalanceByCpf(cpf) {
    try{
        const arrayBalance = await StatementModel.aggregate([
            { $match: { accountCpf: cpf } },
            { $group: {
                _id: {keyCategory: "$keyCategory", type: "$type"},
                amount: {$sum:  "$amount"}
            } 
            },
        ]);

        const objBalance = {
            inflow: [],
            outflow: []
        }

        for(let i=0; i<arrayBalance.length; i++){
            const { _id: obj, amount } = arrayBalance[i];
            const { type, keyCategory } = obj;
            objBalance[
                type == EnumTransactionTypes.TRANSACTION_ENTRY ? 'inflow' : 'outflow'
            ].push({
                keyCategory: keyCategory,
                amount: amount
            })
        }

        return ObjectResponse(
            EnumMessages.SUCCESS_NAME,
            200,
            EnumMessages.SUCCESS_GET_FULL_BALANCE,
            objBalance
        );
    }catch(e) {
        return EnumObjectResponse.SERVER_ERROR;
    }
}

async function getCategoryBalanceByCpfAndDate(cpf, date) {
    try{
        const dateFilter = new Date(date);
        let startDate = dateFilter;
        let finalDate = dateFilter;
        startDate.setDate(1);
        startDate.setHours(0,0,0,0);
        startDate = startDate.toString();
        //startDate -> dia 1 do mes (00:00:00:00)
        finalDate.setDate(1);
        finalDate.setMonth(dateFilter.getMonth() + 1);
        finalDate.setHours(0,0,0,0);
        finalDate = finalDate.toString();
        //finalDate -> dia 1 do mes seguinte (00:00:00:00)
        
        const arrayBalance = await StatementModel.aggregate([
            { 
                $match: {
                    $and: [
                        { "accountCpf": cpf  },
                        {
                            "createdAt": { 
                                "$gte": new Date(startDate),
                                "$lt": new Date(finalDate)
                            } 
                        }
                    ]
                }
            },
            { 
                $group: {
                    _id: {keyCategory: "$keyCategory", type: "$type"},
                    amount: {$sum:  "$amount"}
                } 
            },
        ]);
        console.log(arrayBalance)

        const objBalance = {
            inflow: [],
            outflow: []
        }

        for(let i=0; i<arrayBalance.length; i++){
            const { _id: obj, amount } = arrayBalance[i];
            const { type, keyCategory } = obj;
            objBalance[
                type == EnumTransactionTypes.TRANSACTION_ENTRY ? 'inflow' : 'outflow'
            ].push({
                keyCategory: keyCategory,
                amount: amount
            })
        }

        return ObjectResponse(
            EnumMessages.SUCCESS_NAME,
            200,
            EnumMessages.SUCCESS_GET_FULL_BALANCE,
            objBalance
        );
    }catch(e) {
        return EnumObjectResponse.SERVER_ERROR;
    }
}

async function deleteAllStatementsByCpf(cpf) {
    try{
        const existingStatement = await StatementModel.findOne({ accountCpf: cpf });

        if (!existingStatement) return EnumObjectResponse.STATEMENTS_NOT_FOUND;

        const deletedStatements = await StatementModel.deleteMany( { accountCpf: cpf } );

        const { deletedCount } = deletedStatements;

        return ObjectResponse(
            EnumMessages.SUCCESS_NAME,
            200,
            `${deletedCount} ${EnumMessages.N_STATEMENTS_DELETED}`
        );
    }catch(e) {
        return EnumObjectResponse.SERVER_ERROR;
    }    
}

module.exports = {
    createStatement,
    listAllStatements,
    listFullDashboardByCpf,
    listStatementsByCpf,
    getBalanceByCpf,
    getCategoryBalanceByCpf,
    getCategoryBalanceByCpfAndDate,
    deleteAllStatementsByCpf
}