const { body } = require('express-validator');
const { validateResults } = require('../helpers/validateHelpers');

const validateCreate = [
  body('name')
    .exists()
    .not()
    .isEmpty(),
  body('lastname')
    .exists()
    .isEmpty(),
  body('email')
    .exists()
    .isEmpty()
    .isEmail(),
  body('password')
    .exists()
    .isAlphanumeric()
    .isLength({ min: 5, max: 9 }),
  body('rolId')
    .exists()
    .isEmpty()
    .isNumeric(),
  (req, res, next) => {
    validateResults(req, res, next);
  },
];

const validateLogin = [
  body('email')
    .exists()
    .not()
    .isEmpty()
    .isEmail(),
  body('password')
    .exists()
    .isAlphanumeric()
    .isLength({ min: 5, max: 9 }),
  (req, res, next) => {
    validateResults(req, res, next);
  },
];

const validateEdit = [
  body('name')
    .exists(),
  body('lastname')
    .exists(),
  (req, res, next) => {
    validateResults(req, res, next);
  },
];

module.exports = { validateCreate, validateLogin, validateEdit };
