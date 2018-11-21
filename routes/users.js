//Route
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
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
    if(user) return res.status(400).send('User already exists.');
    
    //Create new object and set its properties.
    user = new User({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    });
    
    //Update password with hashed password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    //Save user object to DB.
    await user.save();

    const token = jwt.sign({_id : user._id}, config.get('SECRET_KEY'));
    res.send({
        name: user.name,
        email: user.email,
        token: token
    });
});

module.exports = router;