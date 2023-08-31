const { body } = require('express-validator');

const nameValidation = body('name')
  .notEmpty()
  .withMessage('El nombre es requerido');

const lastnameValidation = body('lastname')
  .notEmpty()
  .withMessage('El apellido es requerido');

const telephoneValidation = body('telephone')
  .notEmpty()
  .withMessage('El teléfono es requerido');

const emailValidation = body('email')
  .notEmpty()
  .isEmail()
  .withMessage('Correo electrónico es requerido');

const passwordValidation = body('password')
  .notEmpty()
  .isAlphanumeric()
  .withMessage('Contraseña es requerida');

const rolValidation = body('rolId')
  .notEmpty()
  .withMessage('Rol es requerido');

module.exports = {
  nameValidation,
  lastnameValidation,
  telephoneValidation,
  emailValidation,
  passwordValidation,
  rolValidation,
};
