const {Like} = require('../models/likesModel')

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
exports.checkLikeExists = checkLikeExists