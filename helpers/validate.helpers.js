const { body } = require('express-validator');

const nameValidation = body('name')
  .notEmpty()
  .withMessage('El nombre es requerido');

const lastnameValidation = body('lastname')
  .notEmpty().withMessage('El apellido es requerido');

const telephoneValidation = body('telephone')
  .notEmpty().withMessage('El teléfono es requerido');

const emailValidation = body('email')
  .notEmpty().withMessage('Correo electrónico es requerido')
  .isEmail();

const passwordValidation = body('password')
  .notEmpty().withMessage('Contraseña es requerida')
  .isLength({ min: 5 })
  .withMessage(`La clave debe tener al 
  menos 5 caracteres`)
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  .withMessage(`
  la clave debe tener al menos 1 letra mayuscula, 1 letra minuscula,
  1 caracter numerico`);

const rolValidation = body('rolId')
  .notEmpty()
  .withMessage('Rol es requerido');

const validateLoginEmail = body('email')
  .notEmpty().withMessage('Debe ingresar un usuario')
  .isEmail()
  .withMessage('Debe ingresar un email');

module.exports = {
  nameValidation,
  lastnameValidation,
  telephoneValidation,
  emailValidation,
  passwordValidation,
  rolValidation,
  validateLoginEmail,
};
