require('dotenv').config()
require('./helpers/init_mongoDb')
const express = require('express')
const mongoose = require('mongoose')
const server = express()
// const cors = require('cors')
// server.use(cors())
server.use(express.json())

// Routers
server.use('/auth', require('./Routers/authRouter'))
server.use('/api/users', require('./Routers/userRouter'))
server.use('/api/blogs', require('./Routers/blogRouter'))
server.use('/api/comments', require('./Routers/commentRouter'))
server.use('/api/likes',require('./Routers/likeRouter'))


mongoose.connection.once('open', () => {
    console.log('connected to DB')
    server.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${
            process.env.PORT
        }`)
    })
})
