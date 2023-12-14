const request = require("supertest")
const app = require("../app")
const fs = require("fs")
const { hashPass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt")
const axios = require("axios")

const {sequelize, User, Type} = require("../models");
const user = require("../models/user");
// const userAuthorization = require("../middlewares/userAuthorization");
const { queryInterface } = sequelize

let sign_token
beforeAll(async () => {
    let dataUser = {
        username : "dodot",
        email : "dodot@gmail.com",
        password : "12345",
        role : "Admin",
    }
    data = await User.create(dataUser)
    sign_token = signToken({id : data.id})
    const response1 = await axios.get(`https://api.rawg.io/api/genres?key=374fc9f7c6354f5393361b350cae490e`)
      // console.log(data)
      const genres = response1.data.results
      const genre = genres.map((el) => {
        const {name, image_background} = el
        return {
          name,
          imgUrl : image_background,
          createdAt : new Date(),
          updatedAt : new Date()
        }
      })
      await queryInterface.bulkInsert("Genres", genre, {})
      const response2 = await axios.get("https://api.rawg.io/api/games?key=374fc9f7c6354f5393361b350cae490e")
      
      const games = response2.data.results

      const game = games.map((item) => {
        const {name, released, background_image, rating} = item
        return {
          name,
          released,
          imgUrl : background_image,
          rating,
          price : 200000,
          createdAt : new Date(),
          updatedAt : new Date()
        }
      })
      await queryInterface.bulkInsert("Games", game, {})
})

describe("Get /games/:id", () => {
    test("get game", async () => {
        let {status} = await request(app)
        .get("/games/1")
        .set("Authorization", `Bearer ${sign_token}`)
        expect(status).toBe(200)
    })
    test("failed get game", async () => {
        let {status, body} = await request(app)
        .get("/games/1")
        expect(status).toBe(500)
        expect(body).toHaveProperty("message", "Internal Server Error")
    })
    test("failed get game", async () => {
        let {status, body} = await request(app)
        .get("/games/1")
        .set("Authorization", `Bearer AWDJASKDJKSADSAKD`)
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Invalid Token")
    })
    test("failed get game", async () => {
        let {status, body} = await request(app)
        .get("/games/100")
        .set("Authorization", `Bearer ${sign_token}`)
        expect(status).toBe(404)
        expect(body).toHaveProperty("message", "Game not Found")
    })
})

afterAll(async () => {
    await queryInterface.bulkDelete("Games", null, {
        truncate : true,
        cascade : true,
        restartIdentity : true
    })
    await queryInterface.bulkDelete("Genres", null, {
        truncate : true,
        cascade : true,
        restartIdentity : true
    })
})