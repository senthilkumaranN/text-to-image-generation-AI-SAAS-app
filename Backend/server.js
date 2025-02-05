const express = require('express');
const cors = require('cors')
require('dotenv').config()
const connectdb = require('./Database')
const userRouter = require('./Routes/userRoutes')
const imageRouter = require('./Routes/ImageRoutes')

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials: true
}))
connectdb()
app.use('/api/user', userRouter)
app.use('/api/user', imageRouter)




app.listen(PORT, () => console.log(`server running on ${PORT}`))