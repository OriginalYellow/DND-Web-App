const { RESTDataSource } = require('apollo-datasource-rest');
const R = require('ramda');
const RA = require('ramda-adjunct');

const { snakeToTitleCase } = require('../util');

const extractURL = predicate => R.pipe(
  R.prop('results'),
  R.find(
    predicate,
  ),
  R.prop('url'),
);

const transformDescription = R.join('');

class RulesAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://www.dnd5eapi.co/api/';

    // binding "this" to methods so i can compose them with ramda
    this.get = this.get.bind(this);
    this.trimFullURL = this.trimFullURL.bind(this);
    // MIKE: you may not have to do these - check later:
    this.getResource = this.getResource.bind(this);
    this.getSkill = this.getSkill.bind(this);
  }

  trimFullURL(string) {
    return string.substring(this.baseURL.length);
  }

  getResource(URL, predicate, transform) {
    return R.pipeP(
      this.get,
      R.pipe(
        extractURL(predicate),
        this.trimFullURL,
        this.get,
      ),
      transform,
    )(URL);
  }

  async getAbilityScore(name) {
    const transform = R.pipe(
      RA.renameKeys({
        _id: 'id', desc: 'description', full_name: 'fullName',
      }),
      R.pick(['id', 'description', 'fullName', 'name', 'skills']),
      R.evolve({
        description: transformDescription,
        // only included so it can be passed to "skills" resolver:
        skills: R.map(R.prop(['name'])),
      }),
    );

    return this.getResource(
      'ability-scores/',
      R.propEq('name', R.toUpper(name)),
      transform,
    );
  }

  async getSkill(name) {
    const transform = R.pipe(
      R.tap(x => console.log(x)),
      RA.renameKeys({
        _id: 'id', desc: 'description', name: 'fullName', ability_score: 'abilityScore',
      }),
      R.pick(['id', 'description', 'fullName', 'abilityScore']),
      R.evolve({
        description: transformDescription,
        // only included so it can be passed to "abilityScore" resolver:
        abilityScore: R.prop(['name']),
      }),
    );

    return this.getResource(
      'skills/',
      R.propEq('name', snakeToTitleCase(name)),
      transform,
    );
  }

  async getSkills(names) {
    return R.map(this.getSkill, names);
  }
}

module.exports = RulesAPI;
