/* eslint-disable consistent-return */
const userService = require('../services/userService');
const uploadFile = require('../middleware/multer.middleware');

async function createUser(req, res) {
  const {
    name, lastname, email, password, RoleId, image, enrolledId, CourEnrolledId,
  } = req.body;
  await userService.create(name, lastname, email, password, RoleId,
    image, enrolledId, CourEnrolledId);
  res.status(201).send('Usuario creado correctamente');
}

async function loginUser(req, res, next) {
  const { email, password } = req.body;
  try {
    const result = await userService.login(email, password);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
}

async function editUser(req, res, next) {
  try {
    await uploadFile(req, res);

    if (req.file === undefined) {
      return res.status(400).send({ message: 'Please upload a file!' });
    }
    // console.log(`Uploaded the file successfully: ${req.file.originalname}`);
    // res.status(200).send({
    //   message: `Uploaded the file successfully: ${req.file.originalname}`,
    // });
  } catch (err) {
    return err;
  }

  const { id } = req.params;
  const {
    name, lastname, email, password, RoleId, enrolledId, CourEnrolledId,
  } = req.body.data;
  const image = `./resources/assets/uploads/${req.file.originalname}`;
  try {
    await userService.edit(id, name, lastname, email, password, RoleId, image,
      enrolledId, CourEnrolledId);
    res.status(200).send('Usuario editado correctamente');
  } catch (error) {
    next(error);
  }
}

module.exports = { loginUser, createUser, editUser };
