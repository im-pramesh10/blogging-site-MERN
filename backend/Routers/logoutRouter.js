const express = require('express')
const logoutController = require('../Controllers/logoutController')
const router = express.Router()

router
    .get('/', logoutController.handleLogout)

module.exports = router
