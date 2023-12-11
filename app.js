const express = require("express")
const app = express()
const port = 3000
const cors = require("cors")
const UserController = require("./controllers/userController")
const errorHandler = require("./middlewares/errorHandler")

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(cors())

app.get("/", (req,res) => {
    res.status(200).json({
        message : "Hello World"
    })
})

//endpoint login & register
app.post("/login", UserController.Login)



app.use(errorHandler)

app.listen(port, () => {
    console.log(`Running Apps on port ${port}`)
})