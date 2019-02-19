const { RESTDataSource } = require('apollo-datasource-rest');
const R = require('ramda');
const RA = require('ramda-adjunct');

// util:

const snakeToSentenceCase = R.pipe(
  R.replace(/([A-Z])/g, ' $1'),
  R.trim,
  R.juxt([
    R.pipe(
      R.head,
      R.toUpper,
    ),
    R.tail,
  ]),
  R.join(''),
);

// MIKE: there is only one line difference between these - if all of the other
// URL extraction things you have are similar, refactor them all into the same
// function that uses the strategy pattern or just passes in a preformatted
// value
const extractAbilityScoreURL = name => R.pipe(
  R.prop('results'),
  R.find(
    R.propEq('name', R.toUpper(name)),
  ),
  R.prop('url'),
);

const extractSkillURL = name => R.pipe(
  R.prop('results'),
  R.find(
    R.propEq('name', snakeToSentenceCase(name)),
  ),
  R.prop('url'),
);

class RulesAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://www.dnd5eapi.co/api/';
    this.abilityScoresURL = 'ability-scores/';
    this.skillsURL = 'skills/';

    // binding "this" to methods so i can compose them with ramda
    this.get = this.get.bind(this);
    this.trimFullURL = this.trimFullURL.bind(this);
  }

  trimFullURL(string) {
    return string.substring(this.baseURL.length);
  }

  async getAbilityScore(name) {
    const transform = R.pipe(
      RA.renameKeys({ _id: 'id', desc: 'description', full_name: 'fullName' }),
      R.pick(['id', 'description', 'fullName', 'name']),
      R.evolve({ description: R.join('') }),
    );

    return R.pipeP(
      this.get,
      R.pipe(
        extractAbilityScoreURL(name),
        this.trimFullURL,
        this.get,
      ),
      transform,
    )(this.abilityScoresURL);
  }

  async getSkill(name) {
    const transform = R.pipe(
      RA.renameKeys({ _id: 'id', desc: 'description', name: 'fullName' }),
      R.pick(['id', 'description', 'fullName']),
      R.evolve({ description: R.join('') }),
    );

    return R.pipeP(
      this.get,
      R.pipe(
        extractSkillURL(name),
        this.trimFullURL,
        this.get,
      ),
      transform,
    )(this.skillsURL);
  }
}

module.exports = RulesAPI;
