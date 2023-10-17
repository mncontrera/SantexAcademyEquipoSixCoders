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
      image: '../resources/assets/uploads/profesor1.jpg',
      name: 'Profesor1',
      lastname: 'De Prueba',
      email: 'Profesor1@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Profesor1',
        10
      ),
      rolId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      image: '../resources/assets/uploads/profesor2.jpg',
      name: 'Profesor2',
      lastname: 'De Prueba',
      email: 'Profesor2@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Profesor2',
        10
      ),
      rolId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      image: '../resources/assets/uploads/profesor3.jpg',
      name: 'Profesor3',
      lastname: 'De Prueba',
      email: 'Profesor3@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Profesor3',
        10
      ),
      rolId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      image: '../resources/assets/uploads/alumno1.jpg',
      name: 'Alumno1',
      lastname: 'De Prueba',
      email: 'Alumno1@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Alumno1',
        10
      ),
      rolId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      image: '../resources/assets/uploads/alumno2.jpg',
      name: 'Alumno2',
      lastname: 'De Prueba',
      email: 'Alumno2@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Alumno2',
        10
      ),
      rolId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 6,
      image: '../resources/assets/uploads/alumno3.jpg',
      name: 'Alumno3',
      lastname: 'De Prueba',
      email: 'Alumno3@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Alumno3',
        10
      ),
      rolId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 7,
      image: '../resources/assets/uploads/alumno4.jpg',
      name: 'Alumno4',
      lastname: 'De Prueba',
      email: 'Alumno4@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Alumno4',
        10
      ),
      rolId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 8,
      image: '../resources/assets/uploads/alumno5.jpg',
      name: 'Alumno5',
      lastname: 'De Prueba',
      email: 'Alumno5@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Alumno5',
        10
      ),
      rolId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 9,
      image: '../resources/assets/uploads/alumno6.jpg',
      name: 'Alumno6',
      lastname: 'De Prueba',
      email: 'Alumno1@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Alumno6',
        10
      ),
      rolId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 10,
      image: '../resources/assets/uploads/alumno7.jpg',
      name: 'Alumno7',
      lastname: 'De Prueba',
      email: 'Alumno7@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Alumno7',
        10
      ),
      rolId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 11,
      image: '../resources/assets/uploads/alumno8.jpg',
      name: 'Alumno8',
      lastname: 'De Prueba',
      email: 'Alumno1@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Alumno8',
        10
      ),
      rolId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 12,
      image: '../resources/assets/uploads/alumno9.jpg',
      name: 'Alumno9',
      lastname: 'De Prueba',
      email: 'Alumno9@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Alumno9',
        10
      ),
      rolId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 13,
      image: '../resources/assets/uploads/alumno10.jpg',
      name: 'Alumno10',
      lastname: 'De Prueba',
      email: 'Alumno10@gmail.com',
      telephone: '3542888666',
      password: await bcrypt.hash(
        'Alumno10',
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
