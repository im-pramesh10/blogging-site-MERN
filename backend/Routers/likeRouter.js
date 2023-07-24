const express = require('express')
const likeController = require('../Controllers/likeController')
const { checkLikeExists } = require('../middlewares/checkLikesExists')
const router = express.Router()

router.post('/',checkLikeExists,likeController.create)
      .delete('/',likeController.delete)

module.exports = router
