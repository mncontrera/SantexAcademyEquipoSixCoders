const userService = require('../services/userService');
const multerMiddleware = require('../middleware/multer.middleware');
const {
  nameValidation, lastnameValidation, telephoneValidation,
  emailValidation, passwordValidation, rolValidation,
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
      emailValidation.run(req),
      passwordValidation.run(req),
    ]);

    checkValidationResult(req, res, async () => {
      const { email, password } = req.body;

      try {
        const result = await userService.login(email, password);
        return res.status(200).json(result);
      } catch (error) {
        return res.status(401).json({ error: 'Error al crear usuario' });
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
      nameValidation.run(req),
      lastnameValidation.run(req),
      telephoneValidation.run(req),
    ]);

    checkValidationResult(req, res, async () => {
      const { id } = req.params;
      const image = req.file ? req.file.originalname : null;
      const {
        name, lastname, telephone,
      } = req.body;

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

async function deleteUserController(req, res) {
  const { id } = req.params;
  try {
    await userService.deleteUser(id);
    return res.status(200).json({ message: `El usuario ${id} fue eliminado correctamente` });
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
}

module.exports = {
  createUser, loginUser, editUser, deleteUserController,
};
