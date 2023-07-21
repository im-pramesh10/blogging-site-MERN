const express = require('express')
const userController = require('../Controllers/userController')
router = express.Router()

router
    .post('/',userController.create)
    .patch('/:id',userController.update)
    .get('/', userController.getAll)
    .delete('/:id',userController.delete)
    

exports.router = router
