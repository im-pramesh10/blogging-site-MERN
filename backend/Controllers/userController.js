// const mongoose = require('mongoose')
const {User} = require('../models/userModel')

exports.getAll = async (req, res) => {
    console.log(req.method)
    const user = await User.find({}, "-password").exec()
    console.log(user)
    res.json(user)
}
exports.create = async (req, res) => { // const {firstname, lastname, username, email, password} = req.body
    try {
        const user = await User.create({
            ...req.body
        })
        console.log(user)
        res.json({message: "user succesfully created"})
    } catch (err) {
        res.json({message: err.message})
    }
}
exports.update = async (req, res) => { // console.log(req.params.id)
    try {
        const _id = req.params.id
        let user = await User.findById(_id)
        for (const key in req.body) {
            user[key] = req.body[key]
        }
        user.save()
        res.json({message: `User ${
                user.username
            } Updated`})
    } catch (err) {
        res.json({err})
    }
}
exports.delete = async (req, res) => {
    try{
        const _id = req.params.id
        const user = await User.findByIdAndDelete(_id)
        res.json(`${user.username} deleted`)

    }catch (err){
        res.json(err)
    }
}
