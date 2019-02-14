/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createToken = (user, secret, expiresIn) => {
  // NOTE: AHA! this is how you do that destructuring trick!:
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

module.exports = {
  Query: {
    getCurrentUser: async (
      _,
      args,
      { User, currentUserInfo },
    ) => User
      .findOne({
        username: currentUserInfo.username,
      }),
  },

  Mutation: {
    signupUser: async (_, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error('User already exists');
      }

      const newUser = await new User({
        username,
        email,
        password,
      }).save();

      return { token: createToken(newUser, process.env.SECRET, '24hr') };
    },

    signinUser: async (_, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }

      return { token: createToken(user, process.env.SECRET, '1hr') };
    },

    createPlayerCharacter: async (
      _,
      { name },
      { User, PlayerCharacter, currentUserInfo },
    ) => {
      const user = User.findOne({ username: currentUserInfo.username });

      const newPlayerCharacter = await new PlayerCharacter({
        name,
        createdBy: user,
      }).save();

      return newPlayerCharacter.populate('createdBy').execPopulate();
    },
  },

  User: {
    playerCharacters: async (user, _, { PlayerCharacter }) => PlayerCharacter.find({ createdBy: user }),
  },
};

// MIKE: move this to a different file for mongoose/mongo-specific funtions,
// (and don't pass in the models - just import them all in that file)
// const getPopulatedUser = async (userInfo, User) => {
//   if (!userInfo) {
//     return null;
//   }

//   return User
//     .findOne({
//       username: userInfo.username,
//     })
//     .populate('playerCharacters')
//     .exec();
// };