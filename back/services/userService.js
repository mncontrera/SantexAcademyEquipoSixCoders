// const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const db = require('../models');

async function create(name, lastname, email, password, rolId) {
  const user = await db.User.create({
    name,
    lastname,
    email,
    password,
    rolId,
  });
  const logedUser = user;
  return logedUser;
}

async function login(email, password) {
  const user = await db.User.findOne({
    where: {
      [Op.and]: [
        { email },
        { password },
      ],
    },
  });
  return user;
  // if(!user){
  //     throw new Error(`Id y/o password incorrectos`)
  // }

  // const token = jwt.sign({
  //     id:user.id,
  //     name:user.name,
  // }, 'claveUltraSecreta')

  // return {
  //     accesToken: token
  // }
}

async function edit(id, name, lastname, email, password, rolId) {
  const user = await db.User.findByPk(id);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  const updatedFields = {};

  updatedFields.name = name;

  updatedFields.lastname = lastname;

  updatedFields.email = email;

  updatedFields.password = password;

  updatedFields.rolId = rolId;

  await user.update(updatedFields);

  return user;
}

module.exports = { login, create, edit };
