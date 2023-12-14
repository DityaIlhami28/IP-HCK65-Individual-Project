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
    static async addGame(req, res, next){
        try {
            const {name, released, imgUrl, genreId} = req.body
            await Games.create({name, released, imgUrl, genreId})
            res.status(201).json({
                message: `${name} successfully added`
            })
        } catch (error) {
            next(error)
        }
    }
    static async deleteGame(req, res, next){
        try {
            const {id} = req.params
            const game = await Games.findByPk(id)
            if(!game) {
                throw {name : "Not Found", message : "Game not Found"}
            }
            await Games.destroy({
                where : {
                    id : id
                }
            })
            res.status(200).json({
                message : `${game.name} succesfully deleted`
            })
        } catch (error) {
            next(error)
        }
    }
    static async editGame(req, res, next) {
        try {
            const {id} = req.params
            const {name, released, imgUrl, genreId} = req.body
            const gameId = await Games.findByPk(id)
            if(!gameId) {
                throw {name : "Not Found", message : "Game not Found"}
            }
            await gameId.update({
                name,
                released,
                imgUrl,
                genreId,
            })
            res.status(200).json(gameId)
        } catch (error) {
            next(error)
        }
    }
    static async getGamePub(req, res, next) {
        try {
            const game = await Games.findAll({
                include : Genre
            })
            res.status(200).json(game)
        } catch (error) {
            next(error)
        }
    }
    static async getGamePubId(req, res, next) {
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
    static async getPaginatedGames(req, res, next) {
        try {
            const {page = 1, pageSize = 10} = req.query
            const offset = (page - 1) * pageSize
            const games = await Games.findAll({
                include: Genre,
                offset,
                limit: pageSize,
              });
        
              res.status(200).json(games);
        } catch (error) {
            next(error)
        }
    }
}
module.exports = GameController