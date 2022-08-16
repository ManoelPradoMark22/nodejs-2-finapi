const { mongoose } = require('../database/MongoConfig');
const EnumTypes = require('../support/enum/EnumTypes');

const StatementSchema = new mongoose.Schema(
  {
    account_cpf: {
      type: 'string',
      unique: true,
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    type: {
      type: [EnumTypes.TRANSACTION_ENTRY, EnumTypes.TRANSACTION_OUT],
      required: true
    }
  }
);

const StatementModel = mongoose.model('Statement', StatementSchema)

module.exports = StatementModel