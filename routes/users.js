const express = require('express');
const router = express.Router();
const userModel = require('../models/user-models');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const secret = process.env.JWT_SECRET;
const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);




// REGISTER NEW USERS
router.post('/users',async(req,res)=>{
    res.type('json');
    const msg = {
        to: req.body.email,
        from: 'netiapaul23@gmail.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };

    const emailExists = await userModel.findOne({email:req.body.email});
    // const emailExists = false;

    if(emailExists){
        res.status(400).json({message:"Email already exists"});
    }else{
        const newUser = new userModel({
            fullname : req.body.fullname,
            username : req.body.username,
            email : req.body.email,
            password : req.body.password,
        });
    
        newUser.save()
        .then(data => res.status(200).json(data),console.log(newUser),sgMail.send(msg))
        .catch(error => res.status(404).json({message:error}));
    };
});

// LOGIN USERS
router.post('/login',async(req,res)=>{

    const usernameExists = await userModel.findOne({username:req.body.username});
    const passwordExists = await userModel.findOne({password:req.body.password});

    if(usernameExists && passwordExists){
        res.status(200);

        // create and assign token
        const token = jwt.sign({_id:usernameExists._id},secret);
        res.header('auth-token',token).json({message:token})
    }else{
        res.status(404).json({message:"Username or Password is incorrect"});
    }

})

// RETRIEVE ALL USERS
router.get('/users',(req,res)=>{
    userModel.find()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(404).json({message:error}))
});




module.exports = router;