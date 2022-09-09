const mongoose = require('mongoose')
const { DATABASE_URL } = require('../config/Constants')

async function connect(){
  await mongoose.connect(DATABASE_URL)
  .then(() => {})
  .catch(err => {});
}

async function disconnect(){
  await mongoose.disconnect(DATABASE_URL)
  .then(() => {})
  .catch(err => {});
}

module.exports = { connect, disconnect }