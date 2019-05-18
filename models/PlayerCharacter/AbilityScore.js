/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const R = require('ramda');
const RA = require('ramda-adjunct');

const bonusSource = require('./BonusSource');

// schema:

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

// source-targets: when scores ("sources") add their modifier to relevant skills ("targets"),
// that value is called a "bonus"
const sourceTargets = [{
  source: 'STR',
  targets: [
    'ATHLETICS',
  ],
},
{
  source: 'DEX',
  targets: [
    'ACROBATICS',
    'SLEIGHT_OF_HAND',
    'STEALTH',
  ],
},
{
  source: 'CON',
  targets: [],
},
{
  source: 'INT',
  targets: [
    'ARCANA',
    'HISTORY',
    'INVESTIGATION',
    'NATURE',
    'RELIGION',
  ],
},
{
  source: 'WIS',
  targets: [
    'ANIMAL_HANDLING',
    'INSIGHT',
    'MEDICINE',
    'PERCEPTION',
    'SURVIVAL',
  ],
},
{
  source: 'CHA',
  targets: [
    'DECEPTION',
    'INTIMIDATION',
    'PERFORMANCE',
    'PERSAUSION',
  ],
},
];

const sourceTargetsMapCommon = {
  sourceType: 'ABILITY_SCORE',
  targetType: 'SKILL',
};

// util:

const findMatchingMapElement = abilityScore => R.find(
  R.propEq('source', abilityScore.name),
);

const findTargetNames = abilityScore => R.pipe(
  findMatchingMapElement(abilityScore),
  R.prop('targets'),
);

const defaultIfUndefined = defaultVal => R.ifElse(
  R.isNil,
  R.always(defaultVal),
  R.identity,
);

const guardExplanation = defaultIfUndefined('explanation is not yet set');

const createBonusTarget = ({
  sourceName, sourceType, targetName, targetType, value, explanation,
}) => ({
  sourceName,
  sourceType,
  targetName,
  targetType,
  value,
  explanation: guardExplanation(explanation),
});

// DND-specific:

const calcModifier = x => RA.floor((x - 10) / 2);

// getters:

const getModifier = R.memoizeWith(
  R.identity,
  R.pipe(
    R.prop('value'),
    calcModifier,
  ),
);

const getOutgoingBonuses = (source, map, mapCommon) => {
  if (source.name !== 'UNSET') {
    const targetNames = findTargetNames(source)(map);

    const bonusTargets = targetNames.map(targetName => createBonusTarget({
      sourceName: source.name,
      sourceType: mapCommon.sourceType,
      targetName,
      targetType: mapCommon.targetType,
      value: getModifier(source),
    }));

    return bonusTargets;
  }

  return [];
};

// mongoose:

abilityScoreSchema.virtual('modifier').get(function () {
  return getModifier(this);
});

abilityScoreSchema.virtual('bonusTargets').get(function () {
  return getOutgoingBonuses(this, sourceTargets, sourceTargetsMapCommon);
});

// module.exports = abilityScoreSchema;

module.exports = {
  abilityScoreSchema,
  tests: {
    sourceTargetsMap: sourceTargets,
    sourceTargetsMapCommon,
    findMatchingMapElement,
    findTargetNames,
    defaultIfUndefined,
    guardExplanation,
    createBonusTarget,
    calcModifier,
    getModifier,
    getOutgoingBonuses,
  },
};
