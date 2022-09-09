const mongoose = require('mongoose')
const { DATABASE_URL } = require('../config/Constants')

mongoose.connect(DATABASE_URL)
.then(() => {})
.catch(err => {});

module.exports = { mongoose }