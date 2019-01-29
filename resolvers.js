module.exports = {
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

      return newUser;
    },
  },

  Query: {
    user: async (_, { username }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User doesn\'t exist');
      }

      return user;
    },
  },
};
