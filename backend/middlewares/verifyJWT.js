require('dotenv').config()
const jwt = require('jsonwebtoken')

const verifyJWT = (req,res,next)=>{
    const authHeader = req.headers['authorization']; //comes as Bearer token
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded) => {
            if(err) return res.sendStatus(403); //may have been tampered with / invalid token
            req.userid = decoded._id
            req.username = decoded.username
            next()
        }
        );
}
module.exports = verifyJWT