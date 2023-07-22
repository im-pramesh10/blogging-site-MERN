require('dotenv').config()
require('./helpers/init_mongoDb')
const express = require('express')
const mongoose = require('mongoose')


const userRouter = require('./Routers/userRouter')
const blogRouter = require('./Routers/blogRouter')
const commentRouter = require('./Routers/commentRouter')
const likeRouter = require('./Routers/likeRouter')

const server = express()
server.use(express.json())

// Routers
server.use('/api/users', userRouter.router)
server.use('/api/blogs', blogRouter.router)
server.use('/api/comments', commentRouter.router)
server.use('/api/likes',likeRouter.router)


mongoose.connection.once('open', () => {
    console.log('connected to DB')
    server.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${
            process.env.PORT
        }`)
    })
})
