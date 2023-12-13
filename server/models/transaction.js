'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User)
      Transaction.belongsTo(models.Games)
    }
  }
  Transaction.init({
    userId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    status : DataTypes.STRING,
    paidDate : DataTypes.DATE,
    token : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};