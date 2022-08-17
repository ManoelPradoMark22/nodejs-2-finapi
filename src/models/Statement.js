const { mongoose } = require('../database/MongoConfig');

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
      required: true
    }
  }
);

StatementSchema.set('timestamps', true);

const StatementModel = mongoose.model('Statement', StatementSchema);

module.exports = StatementModel;