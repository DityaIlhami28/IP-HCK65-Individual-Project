'use strict';
const fs = require("fs");
const { hashPass } = require("../helpers/bcrypt");
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
    let user = await JSON.parse(fs.readFileSync("./data/user.json", "utf8"))
              .map((el) => {
                el.createdAt = new Date()
                el.updatedAt = new Date()
                el.password = hashPass(el.password)
                return el
              })
      await queryInterface.bulkInsert("Users", user, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {})
  }
};
