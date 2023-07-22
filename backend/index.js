require('dotenv').config()
require('./helpers/init_mongoDb')
const express = require('express')
const mongoose = require('mongoose')


const userRouter = require('./Routers/userRouter')
const blogRouter = require('./Routers/blogRouter')

const server = express()
server.use(express.json())

// Routers
server.use('/api/users', userRouter.router)
server.use('/api/blogs', blogRouter.router)


mongoose.connection.once('open', () => {
    console.log('connected to DB')
    server.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${
            process.env.PORT
        }`)
    })
})
