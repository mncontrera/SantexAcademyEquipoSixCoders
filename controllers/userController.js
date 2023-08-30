const userService = require('../services/userService');
const multerMiddleware = require('../middleware/multer.middleware');

async function createUser(req, res) {
  const {
    name, lastname, email, password, rolId, image,
  } = req.body;
  await userService.create(name, lastname, email, password, rolId, image);
  return res.status(201).send('Usuario creado correctamente');
}

async function loginUser(req, res, next) {
  const { email, password } = req.body;
  try {
    await multerMiddleware.loginUploadFileMiddleware(req, res, async () => {
      const image = req.file;
      const result = await userService.login(email, password, image);
      return res.status(200).send(result);
    });
  } catch (error) {
    next(error);
  }
}

async function editUser(req, res) {
  try {
    await multerMiddleware.uploadFileMiddleware(req, res);

    if (req.file === undefined) {
      return res.status(400).send({ message: 'Please upload a file!' });
    }

    const { id } = req.params;
    const {
      name, lastname,
    } = req.body;
    const image = req.file.originalname;

    await userService.edit(id, name, lastname, image);
    return res.status(200).send('Usuario editado correctamente');
  } catch (error) {
    return res.status(500).send({
      message: `Could not upload the file: ${req.file}. ${error}`,
    });
  }
}

async function deleteUserController(req, res) {
  const { id } = req.params;
  await userService.deleteUser(id);
  return res.status(200).send(`El usuario ${id} fue eliminado correctamente`);
}

module.exports = {
  loginUser, createUser, editUser, deleteUserController,
};
