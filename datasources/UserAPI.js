/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-param-reassign */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable class-methods-use-this */
const { DataSource } = require('apollo-datasource');
const bcrypt = require('bcryptjs');
const DataLoader = require('dataloader');
const R = require('ramda');

const {
  screamingToCamelCase,
  batchFindById,
  batchOneToMany,
  batchManyToMany,
} = require('../util');

const {
  User,
  Campaign,
  PlayerCharacter,
} = require('../models');

class UserAPI extends DataSource {
  initialize(config) {
    // MIKE: maybe wrap your models in objects in different files just so the
    // naming is a bit better - it's a little wordy

    this.context = config.context;

    // create dataloaders for batching:
    this.userLoader = new DataLoader(batchFindById(User));
    this.playerCharacterLoader = new DataLoader(batchFindById(PlayerCharacter));
    this.campaignLoader = new DataLoader(batchFindById(Campaign));

    this.playerCharactersOfUserLoader = new DataLoader(
      batchOneToMany({
        childModel: PlayerCharacter,
        childField: 'createdBy',
        childIdLoader: this.playerCharacterLoader,
      }),
    );

    this.campaignsOfUserLoader = new DataLoader(
      batchOneToMany({
        childModel: Campaign,
        childField: 'createdBy',
        childIdLoader: this.campaignLoader,
      }),
    );

    this.playerCharactersOfCampaignLoader = new DataLoader(
      batchManyToMany({
        childModel: PlayerCharacter,
        parentField: 'playerCharacters',
        parentIdLoader: this.campaignLoader,
        childIdLoader: this.playerCharacterLoader,
      }),
    );

    // binding "this" for convenience:
    this.getPlayerCharacterById = this.getPlayerCharacterById.bind(this);
  }

  // Users:

  getUserById(id) {
    return this.userLoader.load(id);
  }

  getUserByName(username) {
    return User.findOne({ username });
  }

  getCurrentUser() {
    return this.getUserById(this.context.currentUserInfo.id);
  }

  async createUser(username, email, password) {
    // this should be a validation on the model:
    const user = await this.getUserByName(username);
    if (user) {
      throw new Error('User already exists');
    }

    return new User({
      username,
      email,
      password,
    }).save();
  }

  async signinUser(username, password) {
    const user = await this.getUserByName(username);
    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    return user;
  }

  // Player Characters:

  getPlayerCharacterById(id) {
    return this.playerCharacterLoader.load(id);
  }

  async getPlayerCharactersOfUser() {
    // const user = await this.getCurrentUser();
    // return this.playerCharactersOfUserLoader.load(user.id.toString());
    // DEBUG:
    const user = await this.getCurrentUser();
    const ret = await this.playerCharactersOfUserLoader.load(user.id.toString());
    return ret;
  }

  async createPlayerCharacter(name) {
    const user = await this.getCurrentUser();

    return new PlayerCharacter({
      name,
      createdBy: user,
    }).save();
  }

  // MIKE: you need to use a different database than mongodb to properly implement this
  async deletePlayerCharacter(id) {
    const playerCharacter = await this.getPlayerCharacterById(id);

    Campaign.updateMany(
      { playerCharacters: { $in: id } },
      { playerCharacters: { $pull: { $eq: id } } },
    );

    playerCharacter.delete();
    playerCharacter.save();
  }

  async createRandomPlayerCharacter() {

  }

  async setAbilityScoreValue(playerCharacterId, abilityScoreName, value) {
    const playerCharacter = await this.getPlayerCharacterById(playerCharacterId);
    playerCharacter.abilityScores[screamingToCamelCase(abilityScoreName)].value = value;
    return playerCharacter.save();
  }

  async setAbilityScoreProficiency(playerCharacterId, abilityScoreName, proficient) {
    const playerCharacter = await this.getPlayerCharacterById(playerCharacterId);
    playerCharacter
      .abilityScores[screamingToCamelCase(abilityScoreName)].proficient = proficient;
    return playerCharacter.save();
  }

  async setSkillValue(playerCharacterId, skillName, value) {
    const playerCharacter = await this.getPlayerCharacterById(playerCharacterId);
    playerCharacter.skills[screamingToCamelCase(skillName)].value = value;
    return playerCharacter.save();
  }

  async setSkillProficiency(playerCharacterId, skillName, proficient) {
    const playerCharacter = await this.getPlayerCharacterById(playerCharacterId);
    playerCharacter.skills[screamingToCamelCase(skillName)].proficient = proficient;
    return playerCharacter.save();
  }

  // Campaigns:

  getCampaignById(id) {
    return this.campaignLoader.load(id);
  }

  getCampaignsOfUser(user) {
    return this.campaignsOfUserLoader.load(user.id.toString());
  }

  getPlayerCharactersOfCampaign(campaign) {
    return this.playerCharactersOfCampaignLoader.load(campaign.id.toString());
  }

  async createCampaign(name) {
    const user = await this.getCurrentUser();

    return new Campaign({
      name,
      createdBy: user,
    }).save();
  }

  async deleteCampaign(id) {
    const campaign = await this.getCampaignById(id);

    campaign.delete();
    campaign.save();
  }

  async joinCampaign(campaignId, playerCharacterId) {
    const campaign = await this.getCampaignById(campaignId);

    campaign.playerCharacters.push(playerCharacterId);
    return campaign.save();
  }
}

module.exports = UserAPI;

// TODO:

// MIKE: possibly split this into different files like "CampaignAPI", "playerCharacterAPI", etc.
