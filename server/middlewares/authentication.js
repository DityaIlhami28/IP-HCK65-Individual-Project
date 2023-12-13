const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models")

module.exports = async function authentication(req, res, next) {
    try {
        let token = req.headers.authorization
        // console.log(token);
        if(!token) {
            throw {name : "Invalid Token"}
        }
        if(token.slice(0, 7) !== "Bearer ") {
            throw {name : "Invalid Token"}
        }
        token = token.slice(7)
        let payload = verifyToken(token)
        let user = await User.findByPk(payload.id)
        if(!user){
            throw {name : "Invalid Token"}
        }
        req.user = {
            id : user.id,
            role : user.role
        }
        next()
    } catch (error) {
        // console.log("ayam", error);
        next (error)
    }
} 