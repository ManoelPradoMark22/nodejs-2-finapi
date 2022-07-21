const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

//Middleware
function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if(!customer) {
    return response.status(400).json({error: "Customer not found"});
  }

  request.customer = customer;

  return next();
}

//função 
function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if(operation.type === 'credit') {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0); //0 - valor inicial q iniciamos nosso reduce

  return balance;
}

//cadastrar usuário
app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf);

  if(customerAlreadyExists) {
    return response.status(400).json({error: "Curstomer already exists!"});
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  });

  return response.status(201).send();
});

app.use(verifyIfExistsAccountCPF);

//listar extrato
app.get("/statement", (request, response) => {
  const { customer } = request;

  return response.json(customer.statement);
});

//depositar
app.post("/deposit", (request, response) => {
  const { description, amount } = request.body;
  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit"
  }

  customer.statement.push(statementOperation);

  return response.status(201).send();
});

//sacar
app.post("/withdraw", (request, response) => {
  const { description, amount } = request.body;
  const { customer } = request;

  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return response.status(400).json({error: "Insufficient funds!"})
  }

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "debit"
  };

  customer.statement.push(statementOperation);

  return response.status(201).send();
});

//listar extrato por dia
app.get("/statement/date", (request, response) => {
  const { customer } = request;
  const { date } = request.query;

  const dateFormat = (new Date(date + " 00:00")).toDateString();

  const statement = customer.statement.filter(
    (statement) => 
    statement.created_at.toDateString() === dateFormat
  );

  return response.json(statement);
});

//Alterando nome do usuário
app.put("/account", (request, response) => {
  const { customer } = request;
  const { name } = request.body;

  customer.name = name;

  return response.status(201).send();
});

//Obter dados da conta
app.get("/account", (request, response) => {
  const { statement, ...rest } = request.customer;
 
  return response.json(rest);
});

//Deletar conta
app.delete("/account", (request, response) => {
  const {customer} = request;

  customers.splice(customers.indexOf(customer),1);

  return response.status(204).send();
});

//Obter o balance
app.get("/balance", (request, response) => {
  const { customer } = request;

  const balance = getBalance(customer.statement);

  return response.json(balance);
});

app.listen(3333);