const express = require('express')
const weatherRoute=require('./routes/weatherRoute')
const cors = require('cors')
const bodyParser = require('body-parser');
const app= express();
const db = require('./db/config');
const weatherScheduler = require('./utils/jobScheduler');
require("dotenv").config();
const PORT = process.env.PORT||8080;
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
setInterval(weatherScheduler,300000);
app.use('/',weatherRoute);
app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Listening to ${PORT}`);
});