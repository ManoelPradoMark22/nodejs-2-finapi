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

  //request.NOME_DO_REQUEST_VC_ESCOLHE = O_QUE_VC_QUER_ATRIBUIR;
  request.customer = customer;

  return next();
}

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

//app.use(verifyIfExistsAccountCPF); - Podemos passar o middleware assim tb

app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  return response.json(customer.statement);
});

app.listen(3333);