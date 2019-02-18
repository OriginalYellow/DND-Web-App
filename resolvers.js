/* eslint-disable arrow-body-style */
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

// MIKE: you can use something like this to wrap resolvers for authentication
// and authorization so your error handling is centralized in functions like
// this one (you can use graphql-resolvers to save typing):

// export const authenticated = next => (root, args, context, info) => {
//   if (!context.currentUser) {
//       throw new Error(`Unauthenticated!`);
//   }

//   return next(root, args, context, info);
// };

/* eslint-disable no-underscore-dangle */
const { skip, combineResolvers } = require('graphql-resolvers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const R = require('ramda');

const NEW_TOKEN_AGE = '24hr';

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

module.exports = {
  Query: {
    getCurrentUser: (_, args, { dataSources: { userAPI } }) => userAPI.getCurrentUser(),
  },

  Mutation: {
    signupUser: async (_, { username, email, password }, { dataSources: { userAPI } }) => {
      const user = await userAPI.getUserByName(username);
      if (user) {
        throw new Error('User already exists');
      }

      const newUser = await userAPI.createUser(username, email, password);

      return { token: createToken(newUser, process.env.SECRET, NEW_TOKEN_AGE) };
    },

    signinUser: async (_, { username, password }, { dataSources: { userAPI } }) => {
      const user = await userAPI.getUserByName(username);
      if (!user) {
        throw new Error('User not found');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }

      return { token: createToken(user, process.env.SECRET, NEW_TOKEN_AGE) };
    },

    createPlayerCharacter: async (_, { name }, { dataSources: { userAPI } }) => {
      return userAPI.createPlayerCharacter(name);
    },

    overrideAbilityScoreValue: async (
      _,
      { abilityScore: { playerCharacterId, abilityScoreName }, value },
      { dataSources: { userAPI } },
    ) => {
      return userAPI.setAbilityScoreValue(playerCharacterId, abilityScoreName, value);
    },

    overrideAbilityScoreProficiency: async (
      _,
      { abilityScore: { playerCharacterId, abilityScoreName }, proficient },
      { dataSources: { userAPI } },
    ) => {
      return userAPI.setAbilityScoreProficiency(playerCharacterId, abilityScoreName, proficient);
    },

    overrideSkillValue: async (
      _,
      { skill: { playerCharacterId, skillName }, value },
      { dataSources: { userAPI } },
    ) => {
      return userAPI.setSkillValue(playerCharacterId, skillName, value);
    },

    overrideSkillProficiency: async (
      _,
      { skill: { playerCharacterId, skillName }, proficient },
      { dataSources: { userAPI } },
    ) => {
      return userAPI.setSkillValue(playerCharacterId, skillName, proficient);
    },
  },

  User: {
    playerCharacters: async (user, _, { dataSources: { userAPI } }) => {
      return userAPI.getPlayerCharacters();
    },
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
