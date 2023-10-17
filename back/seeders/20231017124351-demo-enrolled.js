'use strict';

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
   await queryInterface.bulkInsert('',[
    { id: 1, userId: 4, courseId: 1, createdAt: new Date(), updatedAt: new Date() },
    
    { id: 2, userId: 5, courseId: 1, createdAt: new Date(), updatedAt: new Date() },
    
    { id: 3, userId: 6, courseId: 2, createdAt: new Date(), updatedAt: new Date() },
    
    { id: 4, userId: 7, courseId: 2, createdAt: new Date(), updatedAt: new Date() },
    
    { id: 5, userId: 13, courseId: 3, createdAt: new Date(), updatedAt: new Date() },
    
    { id: 6, userId: 8, courseId: 3, createdAt: new Date(), updatedAt: new Date() },
    
    { id: 7, userId: 9, courseId: 3, createdAt: new Date(), updatedAt: new Date() },
    
    { id: 8, userId: 10, courseId: 1, createdAt: new Date(), updatedAt: new Date() },
    
    { id: 9, userId: 11, courseId: 2, createdAt: new Date(), updatedAt: new Date() },
    
    { id: 10, userId: 12, courseId: 3, createdAt: new Date(), updatedAt: new Date() },],{})
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
