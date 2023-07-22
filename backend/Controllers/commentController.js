const {Comment} = require("../models/commentModel")

exports.create = async (req, res) => {
    try {
        const comment = await Comment.create({
            ...req.body
        })
        console.log(comment)
        res.json({message: "comment succesfully created"})
    } catch (err) {
        res.json(err)
    }
}

exports.update = async (req, res) => {
    try {
        const _id = req.params.id
        let comment = await Comment.findById(_id)
        comment.content = req.body.content
        comment.save().then(() => {
            res.json({
                    message: `comment ${
                    comment._id
                } Updated`
            })
        }).catch((err) => {
            res.json(err)
        })

    } catch (err) {
        res.json(err)
    }
}
exports.delete = async (req, res) => {
    try {
        const _id = req.params.id
        const comment = await Comment.findByIdAndDelete(_id)
        res.json(`Comment ${
            comment._id
        } deleted`)

    } catch (err) {
        res.json(err)
    }
}
