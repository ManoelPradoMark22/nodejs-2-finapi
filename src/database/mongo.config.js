const mongoose = require('mongoose')
const { DATABASE_URL } = require('../config/constants')

mongoose.connect(DATABASE_URL)
.then(() => console.log("Conectamos com o MongoDB"))
.catch(err => console.log(err));

module.exports = { mongoose }