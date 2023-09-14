'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lessons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lessonTitle: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      lessonDateTime: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      courseId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Courses',
          key:'id'
        }
      },
      deleted: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Lessons');
  }
};