const jwt = require('jsonwebtoken');
require('dotenv/config');
const secret = process.env.JWT_SECRET;


const auth = (req,res,next)=>{
    const token = req.header('auth-token');

    if(!token){
        res.status(401).send("Request Denied");
    }else{
        try {
            const verified = jwt.verify(token,secret);
            req.user = verified;
            next();
        } catch (error) {
            res.status(400).send(error)
        }
    }
}

module.exports = auth;