//Route
const {User} = require('../models/user');
const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    //Valiadte Request.
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if user already exists if true then send BAD Request error.
    let user = await User.findOne({ email : req.body.email });
    if(!user) return res.status(400).send('Invalid email or password.');
    
    //Authentication
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = jwt.sign({_id : user._id}, config.get('SECRET_KEY'));
    res.send(token);

});

function validate(user) {
    const schema = {
        email: Joi.string().min(5).max(100).required().email(),
        password: Joi.string().min(3).max(1024).required()
    };
    return Joi.validate(user, schema);
}

module.exports = router;