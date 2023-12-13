'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Games, {
        through : "Transactions",
        foreignKey : "gameId"
      })
    }
  }
  User.init({
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Username is Required"
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique: true,
      validate : {
        isEmail : {
          msg : "Invalid Email Format"
        },
        notEmpty : {
          msg : "Email is Required"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Password is Required"
        },
        len : {
          args : [5],
          msg : "Minimum Password is 5 Characthers"
        }
      }
    },
    role: {
      type : DataTypes.STRING,
      allowNull : false,
      defaultValue : "Customer"
    },
  }, {
    hooks : {
      beforeCreate(instance, option) {
        instance.password = hashPass(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};