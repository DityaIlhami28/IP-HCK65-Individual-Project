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
    // const genre = JSON.parse(fs.readFileSync("./data/genre.json", "utf-8"))
    //             .map((el) => {
    //               el.createdAt = new Date()
    //               el.updatedAt = new Date()
    //               return el
    //             })
      const response = await axios.get(`https://api.rawg.io/api/genres?key=374fc9f7c6354f5393361b350cae490e`)
      // console.log(data)
      const genres = response.data.results
      const genre = genres.map((el) => {
        const {name, image_background} = el
        return {
          name,
          imgUrl : image_background,
          createdAt : new Date(),
          updatedAt : new Date()
        }
      })
      await queryInterface.bulkInsert("Genres", genre, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Genres", null, {})
  }
};
