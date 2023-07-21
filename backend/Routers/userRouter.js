const express = require('express')
const userController = require('../Controllers/userController')
router = express.Router()

router
    .post('/',userController.create)
    .get('/', userController.getAll)

exports.router = router
