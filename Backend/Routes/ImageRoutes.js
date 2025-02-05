const express = require('express');
const generateImage = require('../Controllers/ImageController')
const useAuth = require('../Middleware/auth')


const imageRouter = express.Router();


imageRouter.post('/generate-image', useAuth, generateImage)


module.exports = imageRouter

