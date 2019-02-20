/* eslint-disable class-methods-use-this */
const { DataSource } = require('apollo-datasource');
const bcrypt = require('bcryptjs');

const { screamingToCamelCase } = require('../util');
const User = require('../models/User');
const PlayerCharacter = require('../models/PlayerCharacter');

class UserAPI extends DataSource {
  initialize(config) {
    // MIKE: there is a "cache" object in the config object - prob want to use
    // for something (see https://www.npmjs.com/package/apollo-server-caching)
    this.context = config.context;
  }

  async getCurrentUser() {
    return User.findOne({ username: this.context.currentUserInfo.username });
  }

  async getUserByName(username) {
    return User.findOne({ username });
  }

  async getPlayerCharacterById(id) {
    return PlayerCharacter.findById(id);
  }

  async getPlayerCharacters() {
    const user = await this.getCurrentUser();
    return PlayerCharacter.find({ createdBy: user.id });
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

  async createPlayerCharacter(name) {
    const user = await this.getCurrentUser();

    return new PlayerCharacter({
      name,
      createdBy: user,
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
}

module.exports = UserAPI;
