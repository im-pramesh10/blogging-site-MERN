const express = require('express')
const likeController = require('../Controllers/likeController')
const {Like} = require('../models/likesModel')
router = express.Router()

// middlewares
const checkLikeExists = async function (req, res, next) {
    try{
        const like = await Like.where("user")
            .equals(req.body.user)
            .where("blog")
            .equals(req.body.blog)
        if(like.length>0){
            return res.json({"message":"user already likes this blogpost"})
        } else {
            next()
        }
    } catch(err) {
        console.log(err)
    }

}

router.post('/',checkLikeExists,likeController.create)
      .delete('/',likeController.delete)

exports.router = router
