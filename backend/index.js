require('dotenv').config()
require('./helpers/init_mongoDb')
const express = require('express')
const mongoose = require('mongoose')


const userRouter = require('./Routers/userRouter')

const server = express()
server.use(express.json())


server.use('/api/users', userRouter.router)


mongoose.connection.once('open', () => {
    console.log('connected to DB')
    server.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${
            process.env.PORT
        }`)
    })
})
