const { mongoose } = require('../database/MongoConfig');

const CategorySchema = new mongoose.Schema(
  {
    key: {
      type: 'string',
      unique: true,
      immutable: true,
      required: true
    },
    name: {
      type: 'string',
      unique: true,
      required: true
    },
    icon: {
      type: 'string',
      unique: true,
      required: true
    }
  }
);

CategorySchema.set('timestamps', true);

const CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = CategoryModel;