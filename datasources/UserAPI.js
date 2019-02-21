/* eslint-disable class-methods-use-this */
const { DataSource } = require('apollo-datasource');
const bcrypt = require('bcryptjs');
const R = require('ramda');
const DataLoader = require('dataloader');
// eslint-disable-next-line import/nyo-unresolved
const { mongooseLoader } = require('@entria/graphql-mongoose-loader');

const { screamingToCamelCase } = require('../util');
const User = require('../models/User');
const PlayerCharacter = require('../models/PlayerCharacter');

// util:

const promiseAll = Promise.all.bind(Promise);

// i thought the name "mongooseLoader" wasn't appropriate so i renamed it:
const batchFindById = R.curry(mongooseLoader);

const find = R.curry(
  (many, byField, parentId) => many.find({ [byField]: parentId }),
);

const prime = R.curry(
  (findByIdLoader, child) => findByIdLoader.prime(child.id, child),
);

const batchOneToMany = (manyModel, byField, findByIdLoader) => R.pipe(
  R.map(
    R.pipeP(
      find(manyModel, byField),
      R.tap(
        R.forEach(prime(findByIdLoader)),
      ),
    ),
  ),
  promiseAll,
);

class UserAPI extends DataSource {
  initialize(config) {
    this.context = config.context;

    this.userLoader = new DataLoader(batchFindById(User));
    this.playerCharacterLoader = new DataLoader(batchFindById(PlayerCharacter));

    this.playerCharactersOfUserLoader = new DataLoader(
      batchOneToMany(PlayerCharacter, 'createdBy', this.playerCharacterLoader),
    );
  }

  getUserById(id) {
    return this.userLoader.load(id);
  }

  getUserByName(username) {
    return User.findOne({ username });
  }

  getCurrentUser() {
    return this.getUserById(this.context.currentUserInfo.id);
  }

  getPlayerCharacterById(id) {
    return this.playerCharacterLoader.load(id);
  }

  async getPlayerCharactersOfUser() {
    const user = await this.getCurrentUser();
    return this.playerCharactersOfUserLoader.load(user.id.toString());
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
