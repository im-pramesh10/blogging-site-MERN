const express = require('express')
const likeController = require('../Controllers/likeController')
const { checkLikeExists } = require('../middlewares/checkLikesExists')
const verifyJWT = require('../middlewares/verifyJWT')
const router = express.Router()

router.use(verifyJWT)

router.post('/',checkLikeExists,likeController.create)
      .delete('/',likeController.delete)

module.exports = router
