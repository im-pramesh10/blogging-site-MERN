const express = require('express')
const userController = require('../Controllers/userController')
const router = express.Router()

router
    .post('/',userController.create) //protect with api key
    .get('/', userController.getAll)
    .get('/:id',userController.getOne)
    .patch('/:id',userController.update)
    .delete('/:id',userController.delete)
    

module.exports = router
