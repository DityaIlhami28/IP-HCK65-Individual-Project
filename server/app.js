if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
const express = require("express")
const app = express()
const port = 3000
const cors = require("cors")
const UserController = require("./controllers/userController")
const errorHandler = require("./middlewares/errorHandler")
const GameController = require("./controllers/gameController")
const GenreController = require("./controllers/genreController")
const authentication = require("./middlewares/authentication");
const TransactionController = require("./controllers/transactionController");
const userAuthorization = require("./middlewares/userAuthorization");

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(cors())

app.get("/", (req,res) => {
    res.status(200).json({
        message : "Hello World"
    })
})

//endpoint public get game list
// app.get("/pub/games", GameController.getGamePub)
app.get("/pub/games", GameController.getPaginatedGames)
app.get("/pub/games/:id", GameController.getGamePubId)
app.get("/pub/genres", GenreController.getGenrePub)
app.get("/pub/genres/:id", GenreController.getGenrePubId)

//endpoint login & register
app.post("/login", UserController.Login)
app.post("/register", UserController.Register)
app.post("/google-login", UserController.googleLogin)

//endpoint get game list CMS
app.use(authentication)
app.get("/games", userAuthorization,GameController.getGame)
app.post("/games", userAuthorization,GameController.addGame)
app.delete("/games/:id", userAuthorization,GameController.deleteGame)
app.get("/games/:id", userAuthorization,GameController.getGameId)
app.put("/games/:id", userAuthorization,GameController.editGame)

//endpoint for payment
app.get("/payment/midtrans/initiate", TransactionController.intitateMidTransTrx)


app.use(errorHandler)

// app.listen(port, () => {
//     console.log(`Running Apps on port ${port}`)
// })

module.exports = app