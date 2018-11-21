//Models
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  }
});

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(100).required().email(),
        password: Joi.string().min(3).max(1024).required()
    };
    return Joi.validate(user, schema);
}


const User = mongoose.model('User', userSchema);
userSchema.method.generateAuthToken = function() {
    const token = jwt.sign({_id : this._id}, config.get('SECRET_KEY'));
}

exports.User = User;
exports.validate = validateUser;
 