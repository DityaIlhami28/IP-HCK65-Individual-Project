const request = require("supertest")
const app = require("../app")
const fs = require("fs")
const { hashPass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt")

const {sequelize, User} = require("../models");
// const userAuthorization = require("../middlewares/userAuthorization");
const { queryInterface } = sequelize

let sign_token
let data
beforeAll(async () => {
    let dataUser = {
        username : "dodot",
        email : "dodot@gmail.com",
        password : "12345",
        role : "Admin",
    }
    data = await User.create(dataUser)
    sign_token = signToken({id : data.id})
    // console.log(sign_token)
});
// console.log(user)
describe("post /register", () => {
    test("create new User", async () => {
        const userTest = {
            username : "maldini",
            email : "ayam@gmail.com",
            password : "54321",
        }
        // console.log(body)
        let {status, body} = await request(app)
        .post("/register")
        .send(userTest)
        expect(status).toBe(201)
    })
    test("should failed", async () => {
        const userTest = {
            username: "maldini",
            email : "",
            password : "54321",
        }
        let {status, body} = await request(app)
        .post("/register")
        .send(userTest)
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Email is required")
    })
    test("should failed", async () => {
        const userTest = {
            username: "maldini",
            email : "ayam@gmail.com",
            password : "",
        }
        let {status, body} = await request(app)
        .post("/register")
        .send(userTest)
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Password is required")
    })
    test("should failed", async () => {
        const userTest = {
            username: "maldini",
            email : "ayamgmail",
            password : "54321",
        }
        let {status, body} = await request(app)
        .post("/register")
        .send(userTest)
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", "Invalid Email Format")
    })
    test("should failed", async () => {
        const userTest = {
            username: "maldini",
            password : "54321",
        }
        let {status, body} = await request(app)
        .post("/register")
        .send(userTest)
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Email is required")
    })
    test("should failed", async () => {
        const userTest = {
            username: "maldini",
            email : "ayam@gmail.com",
        }
        let {status, body} = await request(app)
        .post("/register")
        .send(userTest)
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Password is required")
    })
})