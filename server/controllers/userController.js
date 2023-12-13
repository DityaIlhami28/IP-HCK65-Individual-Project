const { User } = require("../models");
const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class UserController {
  static async Login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "Bad Request", message: "Email is Required" };
      }
      if (!password) {
        throw { name: "Bad Request", message: "Password is Required" };
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "Bad Request", message: "Email/Password is Invalid" };
      }
      const IsPassCorrect = comparePass(password, user.password);
      if (!IsPassCorrect) {
        throw { name: "Unauthorized", message: "Email/Password is Invalid" };
      }
      const access_token = signToken({ id: user.id, role: user.role });

      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async Register(req, res, next) {
    try {
        const {username, email, password} = req.body
        if (!email) {
            throw {name : "Bad Request", message : "Email is required"}
        }
        if(!password) {
            throw {name : "Bad Request", message : "Password is required"}
        }
        const user = await User.create({
            username, email, password
        })
        res.status(201).json({
            id : user.id,
            username : user.username,
            email : user.email,
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
  }
}
module.exports = UserController;
