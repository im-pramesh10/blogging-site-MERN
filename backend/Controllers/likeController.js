const {Like} = require("../models/likesModel")

exports.create = async function (req, res) {
    try {
        await Like.create({
            ... req.body
        })
        res.json({"message": "like has been created"})
    } catch (err) {
        res.json(err)
    }
}
exports.delete = async function(req,res){
    try {
        await Like.where("user")
            .equals(req.query.user)
            .where("blog")
            .equals(req.query.blog).deleteOne()
        res.json({"message":"like entry deleted"})
    } catch (err) {
        res.json(err)        
    }
}
