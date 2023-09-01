const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs/promises');
const path = require('path');
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
  return user;
}

async function login(email, password) {
  const user = await db.User.findOne({
    where: { email },
  });
  if (user.deleted === 1) {
    throw new Error('Usuario no encontrado');
  }
  if (!user) {
    throw new Error('Correo electrónico no encontrado');
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    throw new Error('Contrasena incorrecta');
  }

  let imageBuffer = null;
  if (user.image) {
    const imagePath = path.join(__dirname, '../resources/assets/uploads', user.image);
    imageBuffer = await fs.readFile(imagePath);
  }

  const token = jwt.sign({
    id: user.id,
    name: user.name,
  }, 'claveSixCoders');

  return {
    accessToken: token,
    user: {
      id: user.id,
      name: user.name,
      image: imageBuffer,
    },
  };
}

async function edit(id, name, lastname, telephone, image) {
  const user = await db.User.findByPk(id);

  const updatedFields = {

    name,

    lastname,

    telephone,

    image,
  };
  await user.update(updatedFields);
  return user;
}
async function deleteUser(id, deleted) {
  const user = await db.User.findByPk(id);

  const deletedFields = {

    deleted,
  };
  await user.update(deletedFields);
  return user;
}

async function profile(email) {
  const user = await db.User.findOne({
    where: { email },
  });
  if (!user) {
    throw new Error('Correo electrónico no encontrado');
  }

  let imageBuffer = null;
  if (user.image) {
    const imagePath = path.join(__dirname, '../resources/assets/uploads', user.image);
    imageBuffer = await fs.readFile(imagePath);
  }

  return {

    user: {
      id: user.id,
      name: user.name,
      image: imageBuffer,
      telephone: user.telephone,
      lastname: user.lastname,

    },
  };
}

module.exports = {
  login, create, edit, deleteUser, profile,
};
