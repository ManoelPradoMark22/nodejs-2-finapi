const { mongoose } = require('../database/MongoConfig');

const AccountSchema = new mongoose.Schema(
  {
    cpf: {
      type: 'string',
      unique: true,
      immutable: true,
      required: true
    },
    email: {
      type: 'string',
      unique: true,
      required: true
    },
    cellphone: {
      type: 'string',
      unique: true,
      required: true
    },
    firstName: {
      type: 'string',
      required: true
    },
    lastName: {
      type: 'string',
      required: true
    }
  }
);

AccountSchema.set('timestamps', true);

const AccountModel = mongoose.model('Account', AccountSchema);

module.exports = AccountModel;