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
    }
  }
  User.init({
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          message : "Username is Required"
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique: true,
      validate : {
        notEmpty : {
          message : "Email is Required"
        },
        isEmail : {
          message : "Invalid Email Format"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          message : "Password is Required"
        }
      }
    },
    role: {
      type : DataTypes.STRING,
      allowNull : false,
      defaultValue : "Customer"
    }
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