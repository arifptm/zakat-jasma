const httpStatus = require('http-status');
const { User, Income } = require('../models');
const ApiError = require('../utils/ApiError');

const createIncome = async (incomeBody) => {
  return Income.create(incomeBody);
};

const queryIncomes = async (filter, options) => {
  const incomes = await Income.paginate(filter, options);
  return incomes;
};


const getIncomeById = async (id) => {
  return Income.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};


const deleteIncomeById = async (incomeId) => {
  const income = await getIncomeById(incomeId);
  if (!income) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Income not found');
  }
  await income.remove();
  return income;
};

const statIncomes = async () => {
  
}

module.exports = {
  createIncome,
  queryIncomes,
  getIncomeById,
  getUserByEmail,
  updateUserById,
  deleteIncomeById,
};
