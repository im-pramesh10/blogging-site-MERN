const { User } = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async(req,res) => {
    const { usernameOrEmail, pwd } = req.body 
    if(!usernameOrEmail || !pwd) return res.status(400).json({message:"username or email and password are required"})
    const foundUser = await User.findOne({username: usernameOrEmail}) || await User.findOne({email: usernameOrEmail})
    if (!foundUser) return res.sendStatus(401)

    const passMatches = bcrypt.compare(pwd,foundUser.password)

    if(passMatches){
        //create access token and refresh token
        const accessToken = jwt.sign({
            _id : foundUser._id,
            username : foundUser.username
        }, process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" } //change this later
        );
        const refreshToken = jwt.sign({
            _id : foundUser._id,
            username : foundUser.username
        }, process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
        );

        //save refresh token associated to the user to the database
        foundUser.refreshToken = refreshToken
        await foundUser.save()
        //send the tokens to the client
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24*60*60*1000, secure: true})
        res.json({ accessToken })
    } else {
        res.sendStatus(401)
    }
}
