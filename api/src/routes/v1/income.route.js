const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const incomeValidation = require('../../validations/income.validation');
const incomeController = require('../../controllers/income.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(incomeValidation.createIncome), incomeController.createIncome)
  .get(validate(incomeValidation.getIncomes), incomeController.getIncomes);

router
  .route('/:incomeId')
  .delete(validate(incomeValidation.deleteIncome), incomeController.deleteIncome);

// router
//   .route('/')
//   .get(incomeController.getIncomes);

// router
//   .route('/:userId')
//   .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
//   .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
//   .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;