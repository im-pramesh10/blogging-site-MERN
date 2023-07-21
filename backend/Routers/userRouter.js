const express = require('express')
const userController = require('../Controllers/userController')
router = express.Router()

router
    .post('/',userController.create)
    .get('/', userController.getAll)
    .get('/:id',userController.getOne)
    .patch('/:id',userController.update)
    .delete('/:id',userController.delete)
    

exports.router = router
