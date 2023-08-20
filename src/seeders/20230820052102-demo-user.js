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
    await queryInterface.bulkInsert('Users', [
      {
        username: 'John Doe',
        email: 'jonhdoe@gmail.com',
        password: '123456'
      },
      {
        username: 'John Doe2',
        email: 'jonhdoe2@gmail.com',
        password: '123456'
      },
      {
        username: 'John Doe3',
        email: 'jonhdoe3@gmail.com',
        password: '123456'
      }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
