/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const R = require('ramda');
const RA = require('ramda-adjunct');

const bonusSource = require('./BonusSource');

const bonusMap = [
  {
    abilityScore: 'STR',
    skills: [
      'ATHLETICS',
    ],
  },
  {
    abilityScore: 'DEX',
    skills: [
      'ACROBATICS',
      'SLEIGHT_OF_HAND',
      'STEALTH',
    ],
  },
  {
    abilityScore: 'CON',
    skills: [],
  },
  {
    abilityScore: 'INT',
    skills: [
      'ARCANA',
      'HISTORY',
      'INVESTIGATION',
      'NATURE',
      'RELIGION',
    ],
  },
  {
    abilityScore: 'WIS',
    skills: [
      'ANIMAL_HANDLING',
      'INSIGHT',
      'MEDICINE',
      'PERCEPTION',
      'SURVIVAL',
    ],
  },
  {
    abilityScore: 'CHA',
    skills: [
      'DECEPTION',
      'INTIMIDATION',
      'PERFORMANCE',
      'PERSAUSION',
    ],
  },
];

const getModifier = abilityScore => RA.floor((abilityScore.value - 10) / 2);

const getBonusTargets = abilityScore => R.pipe(
  R.find(R.propEq('abilityScore', abilityScore.name)),
  R.prop('skills'),
  R.map(
    R.applySpec({
      targetName: R.identity,
      targetType: R.always('SKILL'),
      sourceName: R.always(abilityScore.name),
      sourceType: R.always('ABILITY_SCORE'),
      value: R.always(getModifier(abilityScore)),
      explanation: R.always('placeholder'),
    }),
  ),
);

const abilityScoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'UNSET',
  },
  value: {
    type: Number,
    required: true,
    default: 0,
  },
  proficient: {
    type: Boolean,
    required: true,
    default: false,
  },
  bonusSources: [bonusSource],
});

abilityScoreSchema.virtual('modifier').get(function () {
  return getModifier(this);
});

abilityScoreSchema.virtual('bonusTargets').get(function () {
  return getBonusTargets(this)(bonusMap);
});

module.exports = abilityScoreSchema;
