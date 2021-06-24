const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MyUserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  facebookId: String,
  googleId: String,
});

module.exports = mongoose.model('MyUser', MyUserSchema);
