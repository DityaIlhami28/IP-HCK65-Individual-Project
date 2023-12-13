'use strict';
const fs = require("fs")
const axios = require("axios")
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
      const response = await axios.get("https://api.rawg.io/api/games?key=374fc9f7c6354f5393361b350cae490e")
      
      const games = response.data.results

      const game = games.map((item) => {
        const {name, released, background_image, rating} = item
        return {
          name,
          released,
          imgUrl : background_image,
          rating,
          price : 200000,
          createdAt : new Date(),
          updatedAt : new Date()
        }
      })
      await queryInterface.bulkInsert("Games", game, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Games", null, {})
  }
};
