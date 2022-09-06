const mongoose = require('mongoose')
const { DATABASE_URL } = require('../config/Constants')

async function connect(){
  await mongoose.connect(DATABASE_URL)
  .then(() => console.log("Conectamos com o MongoDB"))
  .catch(err => console.log(err));
}

async function disconnect(){
  await mongoose.disconnect(DATABASE_URL)
  .then(() => console.log("Desconectamos com o MongoDB"))
  .catch(err => console.log(err));
}

module.exports = { connect, disconnect }