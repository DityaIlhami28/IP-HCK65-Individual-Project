'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Transactions", "orderId", {type : Sequelize.INTEGER})
    await queryInterface.addColumn("Transactions", "status", {type : Sequelize.STRING})
    await queryInterface.addColumn("Transactions", "paidDate", {type : Sequelize.DATE})
    await queryInterface.addColumn("Transactions", "token", {type : Sequelize.STRING})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Transactions", "orderId", {})
    await queryInterface.removeColumn("Transactions", "status", {})
    await queryInterface.removeColumn("Transactions", "paidDate", {})
    await queryInterface.removeColumn("Transactions", "token", {})
  }
};
