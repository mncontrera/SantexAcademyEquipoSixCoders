const userService = require('../services/userService');
const multerMiddleware = require('../middleware/multer.middleware');
const {
  nameValidation, lastnameValidation, telephoneValidation,
  emailValidation, passwordValidation, rolValidation,
  validateLoginEmail,
} = require('../helpers/validate.helpers');
const { checkValidationResult } = require('../middleware/validation.middleware');

async function createUser(req, res) {
  await Promise.all([
    nameValidation.run(req),
    lastnameValidation.run(req),
    passwordValidation.run(req),
    emailValidation.run(req),
    rolValidation.run(req),
  ]);

  checkValidationResult(req, res, async () => {
    const {
      name, lastname, email, password, rolId, image,
    } = req.body;

    try {
      await userService.create(name, lastname, email, password, rolId, image);
      return res.status(201).json({ message: 'Usuario creado correctamente' });
    } catch (error) {
      return res.status(500).json({ error: 'Error al crear el usuario' });
    }
  });
}

async function loginUser(req, res, next) {
  try {
    await Promise.all([
      validateLoginEmail.run(req),
      passwordValidation.run(req),
    ]);

    checkValidationResult(req, res, async () => {
      const { email, password } = req.body;
      try {
        const result = await userService.login(email, password);
        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
}

async function editUser(req, res, next) {
  try {
    await multerMiddleware.uploadFileMiddleware(req, res);

    await Promise.all([
      telephoneValidation.run(req),
    ]);

    checkValidationResult(req, res, async () => {
      const { id } = req.params;
      const image = req.file ? req.file.originalname : null;
      const {
        name, lastname, telephone,
      } = JSON.parse(req.body.data);

      try {
        await userService.edit(id, name, lastname, telephone, image);
        return res.status(200).json({ message: 'Usuario editado correctamente' });
      } catch (error) {
        return res.status(500).json({ error: 'Error al editar el usuario' });
      }
    });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    await userService.deleteUser(id);
    return res.status(200).json({ message: `El usuario ${id} fue eliminado correctamente` });
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
}

async function userProfile(req, res, next) {
  const { id } = req.params;
  try {
    const result = await userService.profile(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function sendEmail(req, res) {
  const { correo, asunto, description } = req.body;

  try {
    await userService.sendEmail(correo, asunto, description);
    return res.status(200).json({ message: 'Correo electrónico enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    return res.status(500).json({ error: 'Error al enviar el correo electrónico' });
  }
}

module.exports = {
  createUser, loginUser, editUser, deleteUser, userProfile, sendEmail,
};
