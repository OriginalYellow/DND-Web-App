/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */

// MIKE: use a function from graphql-tools to merge schemas:
// https://www.apollographql.com/docs/graphql-tools/schema-stitching.html

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

// const { skip, combineResolvers } = require('graphql-resolvers');
const jwt = require('jsonwebtoken');
const { camelToEnumCase } = require('./util');

const NEW_TOKEN_AGE = '24hr';

const createToken = (user, secret, expiresIn) => {
  const { username, email, id } = user;
  return jwt.sign({ username, email, id: id.toString() }, secret, { expiresIn });
};

module.exports = {
  Query: {
    getCurrentUser: (_, args, { dataSources: { userAPI } }) => userAPI.getCurrentUser(),
  },

  Mutation: {
    signupUser: async (_, { username, email, password }, { dataSources: { userAPI } }) => {
      const newUser = await userAPI.createUser(username, email, password);

      return { token: createToken(newUser, process.env.SECRET, NEW_TOKEN_AGE) };
    },

    signinUser: async (_, { username, password }, { dataSources: { userAPI } }) => {
      const user = await userAPI.signinUser(username, password);

      return { token: createToken(user, process.env.SECRET, NEW_TOKEN_AGE) };
    },

    createPlayerCharacter: async (_, { name }, { dataSources: { userAPI } }) => {
      return userAPI.createPlayerCharacter(name);
    },

    overrideAbilityScoreValue: async (
      _,
      { name, value, playerCharacter },
      { dataSources: { userAPI } },
    ) => {
      return userAPI.setAbilityScoreValue(playerCharacter.id, name, value);
    },

    overrideAbilityScoreProficiency: async (
      _,
      { name, proficient, playerCharacter },
      { dataSources: { userAPI } },
    ) => {
      return userAPI.setAbilityScoreProficiency(playerCharacter.id, name, proficient);
    },

    overrideSkillValue: async (
      _,
      { name, value, playerCharacter },
      { dataSources: { userAPI } },
    ) => {
      return userAPI.setSkillValue(playerCharacter.id, name, value);
    },

    overrideSkillProficiency: async (
      _,
      { name, proficient, playerCharacter },
      { dataSources: { userAPI } },
    ) => {
      return userAPI.setSkillProficiency(playerCharacter.id, name, proficient);
    },
  },

  User: {
    playerCharacters: async (user, _, { dataSources: { userAPI } }) => {
      return userAPI.getPlayerCharactersOfUser();
    },

    joinDate: user => user.joinDate.toString(),
  },

  PlayerCharacter: {
    createdBy: async (playerCharacter, _, { dataSources: { userAPI } }) => {
      return userAPI.getUserById(playerCharacter.createdBy);
    },
  },

  AbilityScore: {
    name: (_, __, ___, info) => info.path.prev.key.toUpperCase(),

    info: (_, __, { dataSources: { rulesAPI } }, info) => {
      return rulesAPI.getAbilityScore(info.path.prev.key);
    },
  },

  Skill: {
    name: (_, __, ___, info) => {
      return camelToEnumCase(info.path.prev.key);
    },

    info: async (_, __, { dataSources: { rulesAPI } }, info) => {
      const skill = await rulesAPI.getSkill(info.path.prev.key);
      skill.name = camelToEnumCase(info.path.prev.key);
      return skill;
    },
  },

  AbilityScoreInfo: {
    skills: async (parent, __, { dataSources: { rulesAPI } }) => {
      return rulesAPI.getSkills(parent.skills);
    },
  },

  SkillInfo: {
    abilityScore: async (parent, __, { dataSources: { rulesAPI } }) => {
      return rulesAPI.getAbilityScore(parent.abilityScore);
    },
  },
};
