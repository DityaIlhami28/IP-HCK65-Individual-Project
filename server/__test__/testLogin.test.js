const request = require("supertest")
const app = require("../app")
const fs = require("fs")
const { hashPass } = require("../helpers/bcrypt");

const {sequelize, User} = require("../models")
const { queryInterface } = sequelize


beforeAll(async () => {
    let user = JSON.parse(fs.readFileSync("./data/user.json", "utf8"))
              .map(el => {
                delete el.id
                el.createdAt = new Date()
                el.updatedAt = new Date()
                // const salt = bcrypt.genSaltSync(10)
                // const hash = bcrypt.hashSync(el.password, salt)
                el.password = hashPass(el.password)
                return el
              })
    // console.log(user)
    await queryInterface.bulkInsert("Users", user, {})
})

describe("post /login", () => {
    test("should login", async () => {
        const userTest = {
            email : "admin@jgg.com",
            password : "admin12345"
        }
    let {status, body} = await request(app).post("/login").send(userTest)
    expect(status).toBe(200)
    expect(body).toHaveProperty("access_token", expect.any(String))
    })
    test("should failed", async () => {
        const userTest = {
            email : "",
            password : "12345"
        }
        let {status, body} = await request(app).post("/login").send(userTest)
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Email is Required")
    })
    test("should failed", async () => {
        const userTest = {
            email : "admin@jgg.com",
            password : ""
        }
        let {status, body} = await request(app).post("/login").send(userTest)
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Password is Required")
    })
    test("Should Failed", async () => {
        const userTest = {
            email : "jane.smith2@example.com",
            password : "12345"
        }
        let {status, body} = await request(app).post("/login").send(userTest)
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Email/Password is Invalid")
    })
    test("Should Failed", async () => {
        const userTest = {
            email : "admin@jgg.com",
            password : "123456"
        }
        let {status, body} = await request(app).post("/login").send(userTest)
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Email/Password is Invalid")
    })
    
})
afterAll(async () => {
    await queryInterface.bulkDelete("Users", null, {
        truncate : true,
        cascade : true,
        restartIdentity : true
    })
})