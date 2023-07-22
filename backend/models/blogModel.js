const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        immutable: true, // not changeable
        default: () => Date.now()
    },
    updatedAt: {
        type: Date
    }
})

exports.Blog = mongoose.model('Blog', blogSchema)
