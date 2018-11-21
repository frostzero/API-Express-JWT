const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
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

    //Save user object to DB.
    await user.save();

    res.send(user);
});

module.exports = router;