'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('LessonsAttendants', [
      
      { id: 1, lessonId: 1, userId: 4, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, lessonId: 2, userId: 4, createdAt: new Date(), updatedAt: new Date() },
      { id: 3, lessonId: 3, userId: 4, createdAt: new Date(), updatedAt: new Date() },
      
      { id: 4, lessonId: 1, userId: 5, createdAt: new Date(), updatedAt: new Date() },
      { id: 5, lessonId: 2, userId: 5, createdAt: new Date(), updatedAt: new Date() },
      { id: 6, lessonId: 3, userId: 5, createdAt: new Date(), updatedAt: new Date() },
      
      { id: 7, lessonId: 4, userId: 6, createdAt: new Date(), updatedAt: new Date() },
      { id: 8, lessonId: 5, userId: 6, createdAt: new Date(), updatedAt: new Date() },
      { id: 9, lessonId: 6, userId: 6, createdAt: new Date(), updatedAt: new Date() },
      
      { id: 10, lessonId: 4, userId: 7, createdAt: new Date(), updatedAt: new Date() },
      { id: 11, lessonId: 5, userId: 7, createdAt: new Date(), updatedAt: new Date() },
      { id: 12, lessonId: 6, userId: 7, createdAt: new Date(), updatedAt: new Date() },
      
      { id: 13, lessonId: 7, userId: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 14, lessonId: 8, userId: 13, createdAt: new Date(), updatedAt: new Date() },
      { id: 15, lessonId: 9, userId: 13, createdAt: new Date(), updatedAt: new Date() },
      
      { id: 16, lessonId: 7, userId: 8, createdAt: new Date(), updatedAt: new Date() },
      { id: 17, lessonId: 8, userId: 8, createdAt: new Date(), updatedAt: new Date() },
      { id: 18, lessonId: 9, userId: 8, createdAt: new Date(), updatedAt: new Date() },
      
      { id: 19, lessonId: 7, userId: 9, createdAt: new Date(), updatedAt: new Date() },
      { id: 20, lessonId: 8, userId: 9, createdAt: new Date(), updatedAt: new Date() },
      { id: 21, lessonId: 9, userId: 9, createdAt: new Date(), updatedAt: new Date() }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
