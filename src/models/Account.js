const { mongoose } = require('../database/MongoConfig');

const AccountSchema = new mongoose.Schema(
  {
    cpf: {
      type: 'string',
      unique: true,
      immutable: true,
      required: true
    },
    name: {
      type: 'string',
      required: true
    }
  }
);

AccountSchema.set('timestamps', true);

const AccountModel = mongoose.model('Account', AccountSchema);

module.exports = AccountModel;