const { mongoose } = require('../database/MongoConfig');
const EnumTypes = require('../support/enum/EnumTypes');

const StatementSchema = new mongoose.Schema(
  {
    accountCpf: {
      type: 'string',
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
    type: {
      type: String,
      enum: [EnumTypes.TRANSACTION_ENTRY, EnumTypes.TRANSACTION_OUT],
      required: true
    }
  }
);

StatementSchema.set('timestamps', true);

const StatementModel = mongoose.model('Statement', StatementSchema)

module.exports = StatementModel