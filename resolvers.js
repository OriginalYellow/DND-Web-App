/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */

// const { isDependee, pipeResolvers, resolveDependee } = require('graphql-resolvers');
// const R = require('ramda');
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
    // users:

    signupUser: async (_, { username, email, password }, { dataSources: { userAPI } }) => {
      const newUser = await userAPI.createUser(username, email, password);

      return { token: createToken(newUser, process.env.SECRET, NEW_TOKEN_AGE) };
    },

    signinUser: async (_, { username, password }, { dataSources: { userAPI } }) => {
      const user = await userAPI.signinUser(username, password);

      return { token: createToken(user, process.env.SECRET, NEW_TOKEN_AGE) };
    },

    // campaigns:

    createCampaign: async (_, { name }, { dataSources: { userAPI } }) => {
      return userAPI.createCampaign(name);
    },

    deleteCampaign: async (_, { campaign }, { dataSources: { userAPI } }) => {
      userAPI.deleteCampaign(campaign.id);
      return userAPI.getCurrentUser();
    },

    joinCampaign: async (_, { campaign, playerCharacter }, { dataSources: { userAPI } }) => {
      return userAPI.joinCampaign(campaign.id, playerCharacter.id);
    },

    // player characters:

    createPlayerCharacter: async (_, { name }, { dataSources: { userAPI } }) => {
      return userAPI.createPlayerCharacter(name);
    },

    createRandomPlayerCharacter: async (_, __, { dataSources: { userAPI } }) => {
      return userAPI.createRandomPlayerCharacter();
    },

    deletePlayerCharacter: async (_, { playerCharacter }, { dataSources: { userAPI } }) => {
      userAPI.deletePlayerCharacter(playerCharacter.id);
      return userAPI.getCurrentUser();
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

    campaigns: async (user, _, { dataSources: { userAPI } }) => {
      return userAPI.getCampaignsOfUser(user);
    },

    joinDate: user => user.joinDate.toString(),
  },

  Campaign: {
    createdBy: async (campaign, _, { dataSources: { userAPI } }) => {
      return userAPI.getUserById(campaign.createdBy);
    },

    playerCharacters: async (campaign, _, { dataSources: { userAPI } }) => {
      return userAPI.getPlayerCharactersOfCampaign(campaign);
    },
  },

  PlayerCharacter: {
    createdBy: async (playerCharacter, _, { dataSources: { userAPI } }) => {
      return userAPI.getUserById(playerCharacter.createdBy);
    },
  },

  AbilityScore: {
    info: (abilityScore, _, { dataSources: { rulesAPI } }) => {
      return rulesAPI.getAbilityScore(abilityScore.name);
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
    skills: async (abilityScoreInfo, __, { dataSources: { rulesAPI } }) => {
      return rulesAPI.getSkills(abilityScoreInfo.skills);
    },
  },

  SkillInfo: {
    abilityScore: async (skillInfo, __, { dataSources: { rulesAPI } }) => {
      return rulesAPI.getAbilityScore(skillInfo.abilityScore);
    },
  },
};

// TODO:

// MIKE: use a function from graphql-tools to merge schemas:
// https://www.apollographql.com/docs/graphql-tools/schema-stitching.html

// MIKE: you can use a graphql projection package (i have a few saved in my
// bookmarks) to match mongoose projections to specific queries to reduce
// network load
