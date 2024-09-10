// Import required modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Create a schema for the User model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

// Hash the password before saving
userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;