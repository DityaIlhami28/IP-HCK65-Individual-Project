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
    static async getGenreId(req, res, next) {
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
    static async addGenre(req, res, next) {
        try {
            const {name, imgUrl} = req.body
            await Genre.create({name, imgUrl})
            res.status(201).json({
                message : `${name} Genre successfully added`
            })
        } catch (error) {
            next(error)
        }
    }
    static async deleteGenre(req, res, next){
        try {
            const {id} = req.params
            const genreId = await Genre.findByPk(id)
            if(!genreId) {
                throw {name : "Not Found", message : "Genre not Found"}
            }
            await genreId.destroy({
                where : {
                    id : id
                }
            })
            res.status(200).json({
                message : `${genreId.name} Genre has been Deleted`
            })
        } catch (error) {
            next(error)
        }
    }
    static async editGenre(req, res, next){
        try {
            const {id} = req.params
            const {name, imgUrl} = req.body
            const genreId = await Genre.findByPk(id)
            if(!genreId) {
                throw {name : "Not Found", message : "Genre not Found"}
            }
            await genreId.update({name,imgUrl})
            res.status(200).json(genreId)
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