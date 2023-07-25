const express = require('express')
const refreshTokenController = require('../Controllers/resfreshTokenController')
const router = express.Router()

router
    .get('/', refreshTokenController.handleRefreshToken)

module.exports = router
