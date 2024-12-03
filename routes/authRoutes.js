const express = require('express')
const { register, login } = require('../controllers/authController')
const AuthRouter = express.Router()

AuthRouter.post('/register', register)
AuthRouter.get('/login', login)

module.exports = AuthRouter