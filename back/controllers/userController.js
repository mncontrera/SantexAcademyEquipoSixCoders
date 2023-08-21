const userService = require('../services/userService');

async function createUser(req, res) {
  const {
    name, lastname, email, password, rolId,
  } = req.body;
  await userService.create(name, lastname, email, password, rolId);
  res.status(201).send(JSON.stringify('Usuario creado correctamente'));
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
  const { id } = req.params;
  const {
    name, lastname, email, password, rolId,
  } = req.body;
  try {
    await userService.edit(id, name, lastname, email, password, rolId);
    res.status(200).send(JSON.stringify('Usuario editado correctamente'));
  } catch (error) {
    next(error);
  }
}

module.exports = { loginUser, createUser, editUser };
