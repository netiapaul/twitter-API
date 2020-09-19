const express = require('express');
const app = express();
require('dotenv/config');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
const URI = process.env.MONGO_URI;
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');

// MIDDLEWARES 
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// DB CONNECTION
mongoose.connect(URI,{ useNewUrlParser: true,useUnifiedTopology: true },()=>{
    console.log("DB CONNECTED and RUNNING")
});

// ROUTES
app.use('/api',cors(),userRoute);
app.use('/api',postRoute);
   
//  HOST APPLICATION
app.listen(port,()=>{
    console.log(`App running on port:${port}`);
})