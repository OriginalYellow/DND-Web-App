// MIKE: ENTITY FRAMEWORK BUT BETTER!!!!!!!: https://www.prisma.io/with-graphql/
// switch to this when things get too unwieldly

// MIKE: you can use mongoose "virtuals" for aggregates and many-to-many
// relationships (and just doing random stuff within the query instead of after
// the fact - see https://github.com/Automattic/mongoose/issues/5801), although
// there may be other options that you should look into first

// MIKE: use this package to combine, pipe, etc. resolvers (you can use for
// access control, as well as having one field depend on the result of the
// resolver of another field):
// https://github.com/lucasconstantino/graphql-resolvers/blob/master/docs/API.md

// MIKE: you can use a graphql projection package (i have a few saved in my
// bookmarks) to match mongoose projections to specific queries to reduce
// network load

/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const R = require('ramda');

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

      return { token: createToken(user, process.env.SECRET, '24hr') };
    },

    createPlayerCharacter: async (
      _,
      { name },
      { User, PlayerCharacter, currentUserInfo },
    ) => {
      const user = await User.findOne({ username: currentUserInfo.username });

      const newPlayerCharacter = await new PlayerCharacter({
        name,
        createdBy: user,
      }).save();

      return newPlayerCharacter.populate('createdBy').execPopulate();
    },

    overrideAbilityScoreValue: async (
      _,
      { abilityScore: { playerCharacterId, abilityScoreName }, value },
      { User, PlayerCharacter, currentUserInfo },
    ) => {
      const user = await User.findOne({ username: currentUserInfo.username });

      const playerCharacter = await PlayerCharacter
        .findById(playerCharacterId);

      if (user.id !== playerCharacter.createdBy.toString()) {
        throw new Error('current user does not have authorization to modify that character');
      }

      playerCharacter.abilityScores[abilityScoreName.toLowerCase()].value = value;
      playerCharacter.save();
 
      return playerCharacter;
    },

    overrideAbilityScoreProficiency: async (
      _,
      { abilityScore: { playerCharacterId, abilityScoreName }, proficient },
      { User, PlayerCharacter, currentUserInfo },
    ) => {
      const user = await User.findOne({ username: currentUserInfo.username });

      const playerCharacter = await PlayerCharacter
        .findById(playerCharacterId);

      if (user.id !== playerCharacter.createdBy.toString()) {
        throw new Error('current user does not have authorization to modify that character');
      }

      playerCharacter.abilityScores[abilityScoreName.toLowerCase()].proficient = proficient;
      playerCharacter.save();

      return playerCharacter;
    },

    overrideSkillValue: async (
      _,
      { skill: { playerCharacterId, skillName }, value },
      { User, PlayerCharacter, currentUserInfo },
    ) => {
      const user = await User.findOne({ username: currentUserInfo.username });

      const playerCharacter = await PlayerCharacter
        .findById(playerCharacterId);

      if (user.id !== playerCharacter.createdBy.toString()) {
        throw new Error('current user does not have authorization to modify that character');
      }

      // YOU WHERE HERE (you just copy/pasted this from below, you how to
      // actually make it - it's the same as camelToEnumCase right now). Then
      // you have to make the overrideSkillProfeciency resolver
      // const enumToCamelCase = str => str
      //   .replace(
      //     /([A-Z])/g,
      //     x => R.concat('_', x),
      //   )
      //   .toUpperCase();

      playerCharacter.skills[skillName.toLowerCase()].value = value;
      playerCharacter.save();

      return playerCharacter;
    },

    overrideSkillProficiency: async (
      _,
      { skill: { playerCharacterId, skillName }, proficient },
      { User, PlayerCharacter, currentUserInfo },
    ) => {
      const user = await User.findOne({ username: currentUserInfo.username });

      const playerCharacter = await PlayerCharacter
        .findById(playerCharacterId);

      if (user.id !== playerCharacter.createdBy.toString()) {
        throw new Error('current user does not have authorization to modify that character');
      }

      playerCharacter.skills[skillName.toLowerCase()].proficient = proficient;
      playerCharacter.save();

      return playerCharacter;
    },
  },

  User: {
    playerCharacters: async (user, _, { PlayerCharacter }) => PlayerCharacter.find({ createdBy: user }),
  },

  AbilityScore: {
    name: (_, __, ___, info) => info.path.prev.key.toUpperCase(),
  },

  Skill: {
    name: (_, __, ___, info) => {
      // MIKE: put this somewhere else when u start using it in other places
      const camelToEnumCase = str => str
        .replace(
          /([A-Z])/g,
          x => R.concat('_', x),
        )
        .toUpperCase();

      return camelToEnumCase(info.path.prev.key);
    },
  },
};

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
