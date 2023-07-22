const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
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

exports.Comment = mongoose.model('Comment', commentSchema)