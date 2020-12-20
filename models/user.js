const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

// will add on username, hash and salt field to schema and add a bunch of methods etc.
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
