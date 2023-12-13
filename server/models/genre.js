'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Genre.hasMany(models.Games, {
        foreignKey : "genreId"
      })
    }
  }
  Genre.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Name of the Genre is Required"
        }
      }
    },
    imgUrl : {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        isUrl : {
          msg : "Invalid Url"
        },
        notContains : {
          msg : "URL is "
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Genre',
  });
  return Genre;
};