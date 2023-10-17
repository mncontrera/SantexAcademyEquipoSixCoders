'use strict';
const bcrypt = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users',[{
      id: 1,
      image: 'profesor1.jpg',
      name: 'Profesor1',
      lastname: 'De Prueba',
      email: 'Profesor1@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Profesor123',
        10
      ),
      rolId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      image: 'profesor2.jpg',
      name: 'Profesor2',
      lastname: 'De Prueba',
      email: 'Profesor2@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Profesor123',
        10
      ),
      rolId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      image: 'profesor3.jpg',
      name: 'Profesor3',
      lastname: 'De Prueba',
      email: 'Profesor3@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Profesor123',
        10
      ),
      rolId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      image: 'alumno1.jpg',
      name: 'Alumno1',
      lastname: 'De Prueba',
      email: 'alumno1@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Alumno123',
        10
      ),
      rolId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      image: 'alumno1.jpg',
      name: 'Alumno2',
      lastname: 'De Prueba',
      email: 'alumno2@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Alumno123',
        10
      ),
      rolId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 6,
      image: 'alumno1.jpg',
      name: 'Alumno3',
      lastname: 'De Prueba',
      email: 'alumno3@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Alumno123',
        10
      ),
      rolId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 7,
      image: 'alumno1.jpg',
      name: 'Alumno4',
      lastname: 'De Prueba',
      email: 'alumno4@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Alumno123',
        10
      ),
      rolId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 8,
      image: 'alumno1.jpg',
      name: 'alumno5',
      lastname: 'De Prueba',
      email: 'Alumno5@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Alumno123',
        10
      ),
      rolId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 9,
      image: 'alumno1.jpg',
      name: 'Alumno6',
      lastname: 'De Prueba',
      email: 'alumno1@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Alumno123',
        10
      ),
      rolId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 10,
      image: 'alumno1.jpg',
      name: 'Alumno7',
      lastname: 'De Prueba',
      email: 'alumno7@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Alumno123',
        10
      ),
      rolId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 11,
      image: 'alumno1.jpg',
      name: 'Alumno8',
      lastname: 'De Prueba',
      email: 'alumno1@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Alumno123',
        10
      ),
      rolId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 12,
      image: 'alumno1.jpg',
      name: 'Alumno9',
      lastname: 'De Prueba',
      email: 'alumno9@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Alumno123',
        10
      ),
      rolId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 13,
      image: 'alumno1.jpg',
      name: 'Alumno10',
      lastname: 'De Prueba',
      email: 'alumno10@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Alumno123',
        10
      ),
      rolId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
