const mongoose = require("mongoose")

connectDB().catch(err => console.log(err.message))

async function connectDB() {
    await mongoose.connect(process.env.DB_URI, {dbName: process.env.DB_NAME})
    console.log('Connected to DB')
}

mongoose.connection.on('connected', () => {
    console.log('Successfully established connection to mongoDB')
})

mongoose.connection.on('error', (err) => {
    console.log(err.message)
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose DB connection is disconnected.')
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})
