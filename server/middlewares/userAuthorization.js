const {Games} = require("../models")

module.exports = async function authorization(req, res, next) {
    try {
        if(req.user.role === "Admin") {
            return next()
        }
        let game = await Games.findByPk(req.params.id)
        if(!game) {
            throw {message : "Not Found"}
        }
        let {id} = req.user
        if(game.userId !== id) {
            throw {message : "Forbidden"}
        }
        next()
    } catch (error) {
        next(error)
    }
}