const { validationResult } = require('express-validator');

const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw();
  } catch (error) {
    res.status(403);
    res.send({ errors: error.array() });
  }
  next();
};

module.exports = { validateResults };
