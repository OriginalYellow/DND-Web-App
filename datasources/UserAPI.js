/* eslint-disable class-methods-use-this */
const { DataSource } = require('apollo-datasource');
const bcrypt = require('bcryptjs');
const DataLoader = require('dataloader');

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
    this.context = config.context;

    this.userLoader = new DataLoader(batchFindById(User));
    this.playerCharacterLoader = new DataLoader(batchFindById(PlayerCharacter));
    this.campaignLoader = new DataLoader(batchFindById(Campaign));

    this.playerCharactersOfUserLoader = new DataLoader(
      batchOneToMany(PlayerCharacter, 'createdBy', this.playerCharacterLoader),
    );

    this.campaignsOfUserLoader = new DataLoader(
      batchOneToMany(Campaign, 'createdBy', this.campaignLoader),
    );

    this.playerCharactersOfCampaignLoader = new DataLoader(
      batchManyToMany(PlayerCharacter, 'playerCharacters', this.campaignLoader, this.playerCharacterLoader),
    );
  }

  // users:

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
    const user = await User.findOne({ username });
    if (user) {
      throw new Error('User already exists');
    }

    return new User({
      username,
      email,
      password,
    }).save();
  }

  async signinUser(name, password) {
    const user = await this.getUserByName(name);
    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    return user;
  }

  // player characters:

  getPlayerCharacterById(id) {
    return this.playerCharacterLoader.load(id);
  }

  async getPlayerCharactersOfUser() {
    const user = await this.getCurrentUser();
    return this.playerCharactersOfUserLoader.load(user.id.toString());
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

  // MIKE: maybe reduce redundant code here with composition

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

  // campaigns:

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

// const batchOneToMany = (childModel, byField, childIdLoader) => R.pipe(
//   R.map(
//     R.pipeP(
//       findChildrenOneToMany(childModel, byField),
//       R.tap(
//         R.forEach(prime(childIdLoader)),
//       ),
//     ),
//   ),
//   promiseAll,
// );

// const findChildrenOneToMany = R.curry(
//   (childModel, byField, parentId) => childModel.find({ [byField]: parentId }),
// );
