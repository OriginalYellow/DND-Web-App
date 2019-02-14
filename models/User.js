/* eslint-disable func-names */
/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  // playerCharacters: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     required: true,
  //     ref: 'PlayerCharacter',
  //   },
  // ],
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (saltErr, salt) => {
    if (saltErr) return next(saltErr);

    bcrypt.hash(this.password, salt, (hashErr, hash) => {
      if (hashErr) return next(hashErr);

      this.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
