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

  if (!user) {
    throw new Error('usuario no encontrado');
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

async function edit(id, name, lastname, email, password, rolId, image) {
  const passwordHash = await bcrypt.hash(password, saltRound);

  const user = await db.User.findByPk(id);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  const updatedFields = {

    name,

    lastname,

    email,

    password: passwordHash,

    rolId,

    image,
  };
  await user.update(updatedFields);
  return user;
}

module.exports = { login, create, edit };
