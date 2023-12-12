'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Games extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Games.belongsToMany(models.User, {
        through : "Transactions",
        foreignKey : "userId"
      })
      Games.belongsTo(models.Genre, {
        foreignKey : "genreId"
      })
    }
  }
  Games.init({
    name: DataTypes.STRING,
    released: DataTypes.DATE,
    imgUrl: DataTypes.STRING,
    rating: DataTypes.STRING,
    price: DataTypes.INTEGER,
    genreId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Games',
  });
  return Games;
};