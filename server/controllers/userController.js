const { User } = require("../models");
const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library")
const client = new OAuth2Client()

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
      // console.log(error);
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
        // console.log(error)
        next(error)
    }
  }
  static async googleLogin(req, res, next){
    try {
      const {google_token} = req.body
      // console.log(req.body)
      // console.log(google_token)
      const ticket = await client.verifyIdToken({
        idToken : google_token,
        audience : process.env.GOOGLE_CLIENT_ID,
      })
      const payload = ticket.getPayload()
      const [user, created] = await User.findOrCreate({
        where : {
          email : payload.email
        },
        defaults : {
          username : payload.email.split("@")[0],
          email : payload.email,
          password : Math.random().toString()
        }
      })
      const access_token = signToken({ id: user.id, role: user.role });
      res.status(created ? 201:200).json({
        "message" : `User ${user.email} found`,
        "access_token" : access_token,
        "user" : {
          "name" : user.username
        }
      })
    } catch (error) {
      next(error) 
    }
  }
}

module.exports = UserController;
