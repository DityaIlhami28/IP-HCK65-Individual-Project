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
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Name of the Game is Required"
        }
      }
    },
    released: {
      type : DataTypes.DATE,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Date is Required"
        }
      }
    },
    imgUrl: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        isUrl : {
          msg : "Invalid Url"
        },
        notEmpty : {
          msg : "Url is Required"
        }
      }
    },
    rating: {
      type : DataTypes.STRING,
      allowNull : false,
      defaultValue : 1.00
    },
    price: {
      type : DataTypes.INTEGER,
      defaultValue : 200000
    },
    genreId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Games',
  });
  return Games;
};