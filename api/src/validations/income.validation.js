const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createIncome = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    category: Joi.string().required(),
    rice: Joi.number().optional(),
    money: Joi.number().optional(),
    member: Joi.number().optional(),
  }).xor('rice', 'money'),
};

const getIncomes = {
  query: Joi.object().keys({
    name: Joi.string(),
    category: Joi.string(),
    member: Joi.number().integer(),
  }),
};

const getIncome = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateIncome = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
    })
    .min(1),
};

const deleteIncome = {
  params: Joi.object().keys({
    incomeId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createIncome,
  getIncomes,
  getIncome,
  updateIncome,
  deleteIncome,
};
