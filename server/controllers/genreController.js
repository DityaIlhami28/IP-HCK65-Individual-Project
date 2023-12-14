const {Genre, Games} = require("../models")

class GenreController {
    static async getGenre(req, res, next) {
        try {
            const genres = await Genre.findAll({
                include : Games
            })
            res.status(200).json(genres)
        } catch (error) {
            next(error)
        }
    }
    static async getGenrePub(req, res, next) {
        try {
            const genres = await Genre.findAll({
                include : Games
            })
            res.status(200).json(genres)
        } catch (error) {
            next(error)
        }
    }
    static async getGenrePubId(req, res, next) {
        try {
            const {id} = req.params
            const genresId = await Genre.findOne({
                include : Games,
                where :{
                    id : id
                }
            })
            if(!genresId) {
                throw {name : "Not Found", message : "Genre not found"}
            }
            res.status(200).json(genresId)
        } catch (error) {
            next(error)
        }
    }
}
module.exports = GenreController