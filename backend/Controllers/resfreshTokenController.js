const { User } = require("../models/userModel")
const jwt = require('jsonwebtoken')

exports.handleRefreshToken = async (req,res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({refreshToken: refreshToken})
    if (!foundUser) return res.sendStatus(403) //forbidden
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
            
            const accessToken = jwt.sign({
                _id : decoded._id,
                username : decoded.username
            }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" } //change this later
            );
            res.json({ accessToken })
        }
    );
}
