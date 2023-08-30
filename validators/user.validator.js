const { body } = require('express-validator');
const { validateResults } = require('../helpers/validateHelpers');

const validateCreate = [
  body('name')
    .not()
    .isEmpty(),
  body('lastname')
    .not()
    .isEmpty(),
  body('email')
    .not()
    .isEmpty()
    .isEmail(),
  body('password')
    .not()
    .isEmpty()
    .isAlphanumeric()
    .isLength({ min: 5, max: 9 }),
  body('rolId')
    .not()
    .isEmpty()
    .isNumeric(),
  (req, res, next) => {
    validateResults(req, res, next);
  },
];

const validateLogin = [
  body('email')
    .not()
    .isEmpty()
    .isEmail(),
  body('password')
    .not()
    .isEmpty()
    .isAlphanumeric()
    .isLength({ min: 5, max: 9 }),
  (req, res, next) => {
    validateResults(req, res, next);
  },
];

const validateEdit = [
  body('name')
    .not()
    .isEmpty(),
  body('lastname')
    .not()
    .isEmpty(),
  (req, res, next) => {
    validateResults(req, res, next);
  },
];

module.exports = { validateCreate, validateLogin, validateEdit };
