const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');
const { arrayBufferToBase64 } = require('../helpers/handlerArrayBufer');

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
    throw new Error('usuario no encontrado');
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    throw new Error('Contrasena incorrecta');
  }
  const token = jwt.sign({
    id: user.id,
    name: user.name,
  }, 'claveSixCoders');

  const imageByteArray = new Uint8Array(user.image);
  const base64Image = arrayBufferToBase64(imageByteArray);

  return {
    accessToken: token,
    user: {
      id: user.id,
      name: user.name,
      image: `data:image/jpeg;base64,${base64Image}`,
    },
  };
}

async function edit(id, name, lastname, email, password, rolId, image) {
  // const passwordHash = await bcrypt.hash(password, saltRound);
  const user = await db.User.findByPk(id);

  if (!user) {
    throw new Error(JSON.stringify('Usuario no encontrado')); //
  }
  const updatedFields = {
    name,
    lastname,
    email,
    // password: passwordHash,
    rolId,
    image,
  };
  await user.update(updatedFields);
  return user;
}

module.exports = { login, create, edit };
