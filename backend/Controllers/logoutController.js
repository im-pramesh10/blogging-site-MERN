const { User } = require("../models/userModel");

exports.handleLogout = async (req,res)=>{
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204) //no content
    const refreshToken = cookies.jwt;

    //check the database for refresh token
    const foundUser = await User.findOne({refreshToken: refreshToken})

    if(!foundUser){
        res.clearCookie('jwt', { httpOnly: true, secure: true }); 
        res.sendStatus(204) //successful but no content
    }

    //Delete refresh token from database
    foundUser.refreshToken="";
    foundUser.save();

    res.clearCookie('jwt',{ httpOnly: true, secure: true });
    res.sendStatus(204) //successful but no content
}