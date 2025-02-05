const { registerUser, loginUser, userCredits } = require('../Controllers/UserController')
const express = require('express')
const userAuth = require('../Middleware/auth.js')

const userRouter = express.Router()


userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/credits', userAuth, userCredits)


module.exports = userRouter