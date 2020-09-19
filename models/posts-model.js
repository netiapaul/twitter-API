const mongoose = require('mongoose');

const schema = mongoose.Schema({
    message : {
        type:String,
        required:true
    },
});

const postModel = mongoose.model('POST',schema);

module.exports = postModel;