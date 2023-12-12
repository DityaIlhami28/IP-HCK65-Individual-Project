const {Games, Genre} = require("../models")

class GameController{
    static async getGame(req, res, next){
        try {
            const game = await Games.findAll({
                include : Genre
            })
            res.status(200).json(game)
        } catch (error) {
            next(error)
        }
    }
    static async getGameId(req, res, next){
        try {
            const {id} = req.params
            const game = await Games.findByPk(id)
            if(!game) {
                throw {name : "Not Found", message : "Game not Found"}
            }
            res.status(200).json(game)
        } catch (error) {
            next(error)
        }
    }
}
module.exports = GameController