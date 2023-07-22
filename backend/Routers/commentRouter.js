const express = require('express')
const commentController = require('../Controllers/commentController')
router = express.Router()

router
    .post('/',commentController.create)
    .patch('/:id',commentController.update)
    .delete('/:id',commentController.delete)    

exports.router = router