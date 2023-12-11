const {User} = require("../models")
const {comparePass} = require("../helpers/bcrypt")
const {signToken} = require("../helpers/jwt")

class UserController{
    static async Login (req,res,next) {
        try {
            const {email, password} = req.body
            if(!email) {
                throw {name : "Bad Request", message : "Email is Required"}
            }
            if(!password) {
                throw {name : "Bad Request", message : "Password is Required"}
            }
            const user = await User.findOne({where : {email}})
            if(!user){
                throw {name : "Bad Request", message : "Email/Password is Invalid"}
            }
            const IsPassCorrect = comparePass(password, user.password)
            if (!IsPassCorrect){
                throw {name : "Unauthorized", message : "Email/Password is Invalid"}
            }
            const access_token = signToken({id : user.id})

            res.status(200).json({access_token})
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}
module.exports = UserController