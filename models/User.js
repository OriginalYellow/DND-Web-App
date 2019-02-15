/* eslint-disable func-names */
/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// const dummyPassword = '12345678';
// const wrongDummyPassword = '12345345';
// const saltRounds = 10;

// bcrypt.genSalt();

// bcrypt.genSalt(saltRounds)
//   .then(salt => bcrypt.hash(dummyPassword, salt))
//   .then(async (hash) => {
//     hash; // ?
//     await bcrypt.compare(dummyPassword, hash); // ?
//     await bcrypt.compare(wrongDummyPassword, hash); // ?
//   });

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
