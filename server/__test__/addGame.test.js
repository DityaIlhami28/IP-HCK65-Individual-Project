const request = require("supertest")
const app = require("../app")
const fs = require("fs")
const { signToken } = require("../helpers/jwt")

const {sequelize, User, Game} = require("../models")
const { queryInterface } = sequelize

let sign_token
let data
beforeAll(async () => {
    let dataUser = {
        "username" : "AdminJGG",
        "email" : "admin@jgg.com",
        "password" : "admin12345",
        "role" : "Admin"
    }
    data = await User.create(dataUser)
    sign_token = signToken({id : data.id})
})
describe("post /games", () => {
    test("add new game", async () => {
        const gameTest = {
            name : "Amog",
            released : "2020-10-05",
            imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMZnIxIPRPZQQLDfr_J4TqEHDPgujXc1JH0Q&usqp=CAU",
            genreId : "1"
        }
        let {status, body} = await request(app)
        .post("/games")
        .set(`Authorization, Bearer ${sign_token}`)
        .send(gameTest)
        expect(status).toBe(201)
    })
    test("should failed add game", async () => {
        const gameTest = {
            name : "",
            released : "2020-10-05",
            imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMZnIxIPRPZQQLDfr_J4TqEHDPgujXc1JH0Q&usqp=CAU",
            genreId : "1"
        }
        let {status, body} = await request(app)
        .post("/games")
        .set(`Authorization, Bearer ${sign_token}`)
        .send(gameTest)
        expect(status).toBe(400)
    })
    test("should failed add game", async () => {
        const gameTest = {
            name : "Amog",
            released : "2020-10-05",
            imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMZnIxIPRPZQQLDfr_J4TqEHDPgujXc1JH0Q&usqp=CAU",
            genreId : "1"
        }
        let {status, body} = await request(app)
        .post("/games")
        .send(gameTest)
        expect(status).toBe(500)
    })
    test("should failed add game", async () => {
        const gameTest = {
            name : "Amog",
            released : "2020-10-05",
            imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMZnIxIPRPZQQLDfr_J4TqEHDPgujXc1JH0Q&usqp=CAU",
            genreId : "1"
        }
        let {status, body} = await request(app)
        .post("/games")
        .set(`Authorization, Bearer ASLDJAKSKDDDLASMDKDSLAK`)
        .send(gameTest)
        expect(status).toBe(401)
    })
    
})