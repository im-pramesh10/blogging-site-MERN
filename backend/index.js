const express = require('express')
require('dotenv').config()
require('./helpers/init_mongoDb')

const userRouter = require('./Routers/userRouter')

const server = express()
server.use(express.json())


server.use('/api/users',userRouter.router)

server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})
