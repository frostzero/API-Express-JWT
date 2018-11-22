const Express = require('express');
const app = Express();

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const Mongoose = require('mongoose');
const config = require('config');
const users = require('./routes/users');
const auth = require('./routes/auth');


//JWT Check
if (!config.get('SECRET_KEY')) {
    console.error('FATAL ERROR: KEY is not defined.');
    process.exit(1);
}

//Mongo Connection Example : mongoose.connect('mongodb://username:password@host:port/database?options...');
//Mongose Connection
Mongoose.connect('mongodb://localhost/RTVTS')
    .then( () => console.log('Connected to database...'))
    .catch( err => console.error('Error in connecting database: ', err));

//Express Setup
app.use(Express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);

//Port setup
const port = process.env.PORT || 3000;

//Listen to requests
app.listen(port, () => console.log(`Listening on Port: ${port}...`));
