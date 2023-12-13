const express = require("express")
const app = express()
const port = 3000
const cors = require("cors")
const UserController = require("./controllers/userController")
const errorHandler = require("./middlewares/errorHandler")
const GameController = require("./controllers/gameController")
const GenreController = require("./controllers/genreController")
const authentication = require("./middlewares/authentication")

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(cors())

app.get("/", (req,res) => {
    res.status(200).json({
        message : "Hello World"
    })
})

//endpoint public get game list
app.get("/pub/games", GameController.getGamePub)
app.get("/pub/games/:id", GameController.getGamePubId)
app.get("/pub/genres", GenreController.getGenrePub)
app.get("/pub/genres/:id", GenreController.getGenrePubId)

//endpoint login & register
app.post("/login", UserController.Login)
app.post("/register", UserController.Register)

//endpoint get game list CMS
app.use(authentication)
app.get("/games", GameController.getGame)
app.post("/games", GameController.addGame)
app.delete("/games/:id", GameController.deleteGame)
app.get("/games/:id", GameController.getGameId)
app.put("/games/:id", GameController.editGame)

//endpoint get genre list
app.get("/genres", GenreController.getGenre)
app.post("/genres", GenreController.addGenre)
app.get("/genres/:id", GenreController.getGenreId)
app.put("/genres/:id", GenreController.editGenre)
app.delete("/genres/:id", GenreController.deleteGenre)


app.use(errorHandler)

app.listen(port, () => {
    console.log(`Running Apps on port ${port}`)
})

module.exports = app