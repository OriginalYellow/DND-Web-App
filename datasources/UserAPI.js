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

const setEntityProperty = async (
  entityId,
  property,
  newVal,
  asyncGetter,
  parentProperty,
  grandparentProperty,
  propertyTransform = R.identity,
) => {
  const entity = await asyncGetter(entityId);
  entity
    [grandparentProperty]
    [propertyTransform(parentProperty)]
    [property] = newVal;
  return entity.save();
};

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

    // binding "this" for convenience:
    this.getPlayerCharacterById = this.getPlayerCharacterById.bind(this);
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

  // MIKE: awww yeah fluent api time!!!

  setAbilityScoreValue(playerCharacterId, abilityScoreName, value) {
    return setEntityProperty(
      playerCharacterId,
      abilityScoreName,
      value,
      this.getPlayerCharacterById,
      'abilityScores',
      'value',
      screamingToCamelCase,
    );
  }

  setAbilityScoreProficiency(playerCharacterId, abilityScoreName, proficient) {
    return setEntityProperty(
      playerCharacterId,
      abilityScoreName,
      proficient,
      this.getPlayerCharacterById,
      'abilityScores',
      'proficient',
      screamingToCamelCase,
    );
  }

  setSkillValue(playerCharacterId, skillName, value) {
    return setEntityProperty(
      playerCharacterId,
      skillName,
      value,
      this.getPlayerCharacterById,
      'skills',
      'value',
      screamingToCamelCase,
    );
  }

  setSkillProficiency(playerCharacterId, skillName, proficient) {
    return setEntityProperty(
      playerCharacterId,
      skillName,
      proficient,
      this.getPlayerCharacterById,
      'skills',
      'proficient',
      screamingToCamelCase,
    );
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
