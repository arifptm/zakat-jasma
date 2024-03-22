const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, incomeService } = require('../services');

const getIncomes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await incomeService.queryIncomes(filter, options);
  res.send(result);
});

const createIncome = catchAsync(async (req, res) => {
  const income = await incomeService.createIncome(req.body);
  res.status(httpStatus.CREATED).send(income);
});

const deleteIncome = catchAsync(async (req, res) => {
  const income = await incomeService.deleteIncomeById(req.params.incomeId);
  res.status(httpStatus.CREATED).send(income);
});

module.exports = {
  getIncomes,
  createIncome,
  deleteIncome
};