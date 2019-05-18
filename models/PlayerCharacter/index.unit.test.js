/* eslint-disable no-undef */
const {
  tests,
} = require('./index');

test('findBonusSourceIndex should return the default value', () => {
  const bonusTarget = {
    targetName: 'HISTORY',
    targetType: 'SKILL',
    sourceName: 'INT',
    sourceType: 'ABILITY_SCORE',
    value: 10,
    explanation: 'placeholder',
  };

  const bonusSources = [{
    targetName: 'HISTORY',
    targetType: 'SKILL',
    sourceName: 'INT',
    sourceType: 'ABILITY_SCORE',
    value: 10,
    explanation: 'placeholder',
  }];

  expect(tests.findBonusSourceIndex(bonusTarget)(bonusSources))
    .toBe(0);
});

const playerCharacterDocument = {
  abilityScores: {
    wis: {
      name: 'INT',
      value: 17,
      proficient: false,
      bonusSources: [],
      bonusTargets: ['a', 'b'],
    },
    dex: {
      name: 'DEX',
      value: 11,
      proficient: false,
      bonusSources: [],
      bonusTargets: ['c', 'd'],
    },
    str: {
      name: 'STR',
      value: 11,
      proficient: false,
      bonusSources: [],
      bonusTargets: ['e', 'f'],
    },
  },
  skills: {
    acrobatics: {
      name: 'ACROBATICS',
      baseValue: 4,
      proficient: false,
      bonusSources: [],
    },
    arcana: {
      name: 'ARCANA',
      baseValue: 4,
      proficient: false,
      bonusSources: [],
    },
    athletics: {
      name: 'ATHLETICS',
      baseValue: 4,
      proficient: false,
      bonusSources: [],
    },
    history: {
      name: 'HISTORY',
      baseValue: 4,
      proficient: false,
      bonusSources: [{
        targetName: 'HISTORY',
        targetType: 'SKILL',
        sourceName: 'INT',
        sourceType: 'ABILITY_SCORE',
        value: 10,
        explanation: 'placeholder',
      }],
    },
    investigation: {
      name: 'INVESTIGATION',
      baseValue: 4,
      proficient: false,
      bonusSources: [],
    },
    nature: {
      name: 'NATURE',
      baseValue: 4,
      proficient: false,
      bonusSources: [],
    },
    religion: {
      name: 'RELIGION',
      baseValue: 4,
      proficient: false,
      bonusSources: [],
    },
    sleightOfHand: {
      name: 'SLEIGHT_OF_HAND',
      baseValue: 4,
      proficient: false,
      bonusSources: [],
    },
    stealth: {
      name: 'STEALTH',
      baseValue: 4,
      proficient: false,
      bonusSources: [],
    },
  },
};

test('should get the correct bonus targets', () => {
  expect(tests.getBonusTargets(playerCharacterDocument))
    .toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
});

const bonusTargets = [{
  explanation: 'explanation is not yet set',
  sourceName: 'INT',
  sourceType: 'ABILITY_SCORE',
  targetName: 'ARCANA',
  targetType: 'SKILL',
  value: 1,
}, {
  explanation: 'explanation is not yet set',
  sourceName: 'INT',
  sourceType: 'ABILITY_SCORE',
  targetName: 'HISTORY',
  targetType: 'SKILL',
  value: 1,
}, {
  explanation: 'explanation is not yet set',
  sourceName: 'INT',
  sourceType: 'ABILITY_SCORE',
  targetName: 'INVESTIGATION',
  targetType: 'SKILL',
  value: 1,
}, {
  explanation: 'explanation is not yet set',
  sourceName: 'INT',
  sourceType: 'ABILITY_SCORE',
  targetName: 'NATURE',
  targetType: 'SKILL',
  value: 1,
}, {
  explanation: 'explanation is not yet set',
  sourceName: 'INT',
  sourceType: 'ABILITY_SCORE',
  targetName: 'RELIGION',
  targetType: 'SKILL',
  value: 1,
}];

test('should set the bonus sources correctly', () => {
  tests.setBonusSources(bonusTargets, playerCharacterDocument);
  expect(playerCharacterDocument).toMatchSnapshot();
});

test('ability score names should be set', () => {
  tests.setAbilityScoreNames(playerCharacterDocument);
  expect(playerCharacterDocument).toMatchSnapshot();
});
