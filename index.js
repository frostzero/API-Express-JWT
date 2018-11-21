const Express = require('express');
const app = Express();

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const Mongoose = require('mongoose');
const users = require('./routes/users');


//JWT Check

//Mongose Connection
Mongoose.connect('mongodb://localhost/RTVTS')
    .then( () => console.log('Connected to database...'))
    .catch( err => console.error('Error in connecting database: ', err));

//Express Setup
app.use(Express.json());
app.use('/api/users', users);

//Port setup
const port = process.env.PORT || 3000;

//Listen to requests
app.listen(port, () => console.log(`Listening on Port: ${port}...`));