//Model
const mongoose = require('mongoose');
const Jio = require('jio');

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
        name: Jio.string().min(3).max(50).required(),
        email: Jio.string().min(5).max(100).required().email(),
        password: Jio.string().min(3).max(1024).required()
    };
    return Jio.validate(user, schema);
}

const User = mongoose.model('User', userSchema);

exports.User = User;
exports.validate = validateUser;
