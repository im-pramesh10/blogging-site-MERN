const express = require('express')
const commentController = require('../Controllers/commentController')
const router = express.Router()

router
    .post('/',commentController.create)
    .patch('/:id',commentController.update)
    .delete('/:id',commentController.delete)    

module.exports= router