const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');

const saltRound = 10;

async function create(name, lastname, email, password, rolId, image) {
  const passwordHash = await bcrypt.hash(password, saltRound);
  const user = await db.User.create({
    name,
    lastname,
    email,
    password: passwordHash,
    rolId,
    image,
  });
  const logedUser = user;
  return logedUser;
}

async function login(email, password) {
  const user = await db.User.findOne({
    where: { email },
  });

  if (!user) {
    throw new Error(JSON.stringify('usuario no encontrado'));
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    throw new Error(JSON.stringify('Contrasena incorrecta'));
  }
  const token = jwt.sign({
    id: user.id,
    name: user.name,
  }, 'claveSixCoders');

  return {
    accesToken: token,
    user: db.User.name,
  };
}

async function edit(id, name, lastname, email, password, rolId, image) {
  // const passwordHash = await bcrypt.hash(password, saltRound);

  const user = await db.User.findByPk(id);
  if (!user) {
    throw new Error(JSON.stringify('Usuario no encontrado'));
  }
  const updatedFields = {};

  updatedFields.name = name;

  updatedFields.lastname = lastname;

  updatedFields.email = email;

  updatedFields.password = password;

  updatedFields.rolId = rolId;

  updatedFields.image = image;
  await user.update(updatedFields);
  return user;
}

module.exports = { login, create, edit };
