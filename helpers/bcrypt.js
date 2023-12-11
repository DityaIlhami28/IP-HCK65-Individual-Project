const bcrypt = require("bcrypt")

const hashPass = (password) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

const comparePass = (password, hashpassword) => {
    return bcrypt.compareSync(password, hashpassword)
}

module.exports = {hashPass, comparePass}