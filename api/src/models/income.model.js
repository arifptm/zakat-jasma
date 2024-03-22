const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const incomeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    member: {
      type: Number
    },
    rice: {
      type: Number
    },
    money: {
      type: Number
    },
  },
  {
    timestamps: true,
  }
);

incomeSchema.plugin(toJSON);
incomeSchema.plugin(paginate);

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
