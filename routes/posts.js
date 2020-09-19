const express = require('express');
const router = express.Router();
const auth = require('./auth');
const postModel = require('../models/posts-model');

router.post('/posts',auth,(req,res)=>{
    res.type('json');
    const newPost = new postModel({
        message : req.body.message
    });

    newPost.save()
    .then(data => res.status(200).json(data),console.log(newPost))
    .catch(error => res.status(404).json({message:error}));
});

router.get('/posts',(req,res)=>{
    postModel.find()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(404).json({message:error}))
});

module.exports = router;