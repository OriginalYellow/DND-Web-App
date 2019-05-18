import * as R from 'ramda';
import * as RA from 'ramda-adjunct';

const abilityScoreTest = {
  name: 'INT',
  value: 17,
  proficient: false,
  bonusSources: [],
  bonusTargets: ['a', 'b'],
};

const abilityScoreTest2 = {
  name: 'DEX',
  value: 11,
  proficient: false,
  bonusSources: [],
  bonusTargets: ['c', 'd'],
};

const abilityScoreTest3 = {
  name: 'STR',
  value: 11,
  proficient: false,
  bonusSources: [],
  bonusTargets: ['e', 'f'],
};

const playerCharacterTest = {
  abilityScores: {
    wis: abilityScoreTest,
    dex: abilityScoreTest2
    con: abilityScoreTest3,
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

const bonusMap = [{
  abilityScoreName: 'STR',
  skillNames: [
    'ATHLETICS',
  ],
},
{
  abilityScoreName: 'DEX',
  skillNames: [
    'ACROBATICS',
    'SLEIGHT_OF_HAND',
    'STEALTH',
  ],
},
{
  abilityScoreName: 'CON',
  skillNames: [],
},
{
  abilityScoreName: 'INT',
  skillNames: [
    'ARCANA',
    'HISTORY',
    'INVESTIGATION',
    'NATURE',
    'RELIGION',
  ],
},
{
  abilityScoreName: 'WIS',
  skillNames: [
    'ANIMAL_HANDLING',
    'INSIGHT',
    'MEDICINE',
    'PERCEPTION',
    'SURVIVAL',
  ],
},
{
  abilityScoreName: 'CHA',
  skillNames: [
    'DECEPTION',
    'INTIMIDATION',
    'PERFORMANCE',
    'PERSAUSION',
  ],
},

];

const getModifier = R.memoizeWith(
  R.identity,
  abilityScore => RA.floor((abilityScore.value - 10) / 2),
);

const guardExplanation = R.ifElse(
  R.isNil,
  R.always('not yet entered'),
  R.identity,
);

const createBonusTarget = (value, explanation, source, target) => ({
  sourceName: source.name,
  sourceType: source.type,
  targetName: target.name,
  targetType: target.type,
  value,
  explanation: guardExplanation(explanation),
});

const getBonusTargets2 = (sourceAbilityScore, map) => R.pipe(
  R.find(R.propEq('abilityScoreName', sourceAbilityScore.name)),
  R.prop('skillNames'),
  R.map(targetSkillName => createBonusTarget(
    getModifier(sourceAbilityScore),
    // `your ${sourceAbilityScore.name} score grants a bonus or penalty of ${getModifier(sourceAbilityScore)} to your ${targetSkillName}`,
    undefined, {
      name: sourceAbilityScore.name,
      type: 'ABILITY_SCORE',
    }, {
      name: targetSkillName,
      type: 'SKILL',
    },
  )),
)(map);


// const findMatchingMapElement = (map, abilityScore) => map.find(R.propEq('abilityScoreName', abilityScore.name));
const findMatchingMapElement = abilityScore => R.find(
  R.propEq('abilityScoreName', abilityScore.name),
);

const findTargetSkillNames = abilityScore => R.pipe(
  findMatchingMapElement(abilityScore),
  R.prop('skillNames'),
);

// const createBonusTarget2 = (sourceName, sourceType, targetName, targetType, value, explanation) => ({
//   sourceName,
//   sourceType,
//   targetName,
//   targetType,
//   value,
//   explanation: guardExplanation(explanation),
// });

// const createBonusTarget3 = bonusTargetToCreate => ({
//   ...bonusTargetToCreate,
//   explanation: guardExplanation(bonusTargetToCreate.explanation),
// });

const createBonusTarget4 = ({
  sourceName, sourceType, targetName, targetType, value, explanation,
}) => ({
  sourceName,
  sourceType,
  targetName,
  targetType,
  value,
  explanation: guardExplanation(explanation),
});

// createBonusTarget4(
//   {
//     sourceName: 'some source name',
//     sourceType: 'some source type',
//     targetName: 'some target name',
//     targetType: 'some target type',
//     value: 5,
//   },
// ); // ?

const getBonusTargets3 = (sourceAbilityScore, map) => {
  const targetSkillNames = findTargetSkillNames(sourceAbilityScore)(map); // ?

  const bonusTargets = R.map(
    targetSkillName => createBonusTarget4({
      sourceName: sourceAbilityScore.name,
      sourceType: 'ABILITY_SCORE',
      targetName: targetSkillName,
      targetType: 'SKILL',
      value: getModifier(sourceAbilityScore),
    }),
    targetSkillNames,
  );

  return bonusTargets;
};

getBonusTargets3(abilityScoreTest, bonusMap); // ?

createBonusTarget(
  5,
  'blab ladfsd', {
    name: 'some abilityscore name',
    type: 'ABILITY_SCORE',
  }, {
    name: 'some skill name',
    type: 'SKILL',
  },
);

const testFunc = abilityScore => RA.floor((abilityScore.value - 10) / 2);
const testFunc2 = R.memoizeWith(R.identity, abilityScore => RA.floor((abilityScore.value - 10) / 2));

// R.memoize()

testFunc({
  value: 5,
});
testFunc2({
  value: 5,
});

getModifier(abilityScoreTest);
getBonusTargets2(abilityScoreTest, bonusMap);

// testing playercharacter model:

const transformFirstLetter = transform => R.pipe(
  R.juxt([
    R.pipe(
      R.head,
      transform,
    ),
    R.tail,
  ]),
  R.join(''),
);

const screamingToCamelCase = R.pipe(
  R.split('_'),
  R.map(
    R.pipe(
      R.toLower,
      transformFirstLetter(R.toUpper),
    ),
  ),
  R.join(''),
  transformFirstLetter(R.toLower),
);

const getBonusTargets = R.pipe(
  R.prop('abilityScores'),
  R.values,
  R.map(R.prop('bonusTargets')),
  R.flatten,
);

const findBonusSourceIndex = bonusTarget => R.findIndex(
  R.allPass([
    R.propEq('sourceName', bonusTarget.sourceName),
    R.propEq('sourceType', bonusTarget.sourceType),
  ]),
);

const setBonusSources = (bonusTargets, playerCharacter) => R.forEach(
  (bonusTarget) => {
    const skill = playerCharacter.skills[screamingToCamelCase(bonusTarget.targetName)];

    if (skill) {
      // eslint-disable-next-line prefer-destructuring
      const bonusSources = skill.bonusSources;
      const oldBonusSourceIndex = findBonusSourceIndex(bonusTarget)(bonusSources);

      // eslint-disable-next-line no-bitwise
      if (~oldBonusSourceIndex) {
        skill.bonusSources[oldBonusSourceIndex] = bonusTarget;
      } else {
        skill.bonusSources.push(bonusTarget);
      }
    }
  },
)(bonusTargets);

abilityScoreTest.bonusTargets = getBonusTargets2(abilityScoreTest, bonusMap);
abilityScoreTest2.bonusTargets = getBonusTargets2(abilityScoreTest2, bonusMap);
abilityScoreTest3.bonusTargets = getBonusTargets2(abilityScoreTest3, bonusMap);

// R.pipe(
//   getBonusTargets,
//   setBonusSources(playerCharacterTest),
// )(playerCharacterTest);

const bonusTargets = getBonusTargets(playerCharacterTest);
setBonusSources(bonusTargets, playerCharacterTest);

playerCharacterTest.skills.arcana.bonusSources;
