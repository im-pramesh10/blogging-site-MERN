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
        res.json({message:"user succesfully created"})
    } catch (e) {
        res.json({message: e.message})
    }
}
