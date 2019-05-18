import * as R from 'ramda';
import * as RA from 'ramda-adjunct';


// let count = 0;

// data.forEach((element) => {
//   if (
//     element.value === 'a'
//     && element.value2 === 'b'
//     && element.value3 === 'c'
//   ) {
//     count++;
//   }
// });

// count; 

// my solution:


const capitalizeFirst = R.compose(
  R.join(''),
  R.juxt([
    R.compose(
      R.toUpper,
      R.head,
    ),
    R.tail,
  ]),
);

const lowerCaseFirst = R.compose(
  R.join(''),
  R.juxt([
    R.compose(
      R.toLower,
      R.head,
    ),
    R.tail,
  ]),
);

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

// enumToCamelCase2('COOL_FUCKING_ENUM'); 

const nestedObject = {
  level1: {
    level2: 'level 2 text',
  },
};

const spreadTest1 = ({ level1: { level2: renamedLevel2 } }) => {
  renamedLevel2; 
};

spreadTest1(nestedObject);


// fucking noobs on wdg discord think ramda is "bloated", fucking noobs holy shit:

// const fuckSwitchStatements = R.reduce(
//   (acc, cur) => R.cond([
//     [condition1, R.always(R.inc(acc))],
//     [condition2, R.always(R.inc(acc))],
//     [condition3, R.always(R.inc(acc))],
//     [R.T, R.always(acc)],
//   ])(cur),
//   0,
// );


const switchReducer = conditions => (acc, curr) => R.cond(
  R.append(
    [R.T, R.always(acc)],
    R.map(
      R.pipe(
        R.of,
        R.append(R.always(R.inc(acc))),
      ),
      conditions,
    ),
  ),
)(curr);

const switchFunction = conditions => R.reduce(
  switchReducer(conditions),
  0,
);

const condition1 = R.allPass([
  R.propEq('value', 'a'),
  R.propEq('value2', 'b'),
  R.propEq('value3', 'c'),
]);

const condition2 = R.allPass([
  R.propEq('value', 'd'),
  R.propEq('value2', 'e'),
  R.propEq('value3', 'f'),
]);

const condition3 = R.anyPass([
  R.propEq('value', 'a'),
  R.propEq('value2', 'b'),
  R.propEq('value3', 'c'),
]);

const condition4 = R.propEq('coolestValue', 'your mother');

const myConditions = [condition1, condition2, condition3, condition4];

const data = [
  { value: 'a', value2: 'b', value3: 'c' },
  { value: 'a', value2: 'd', value3: 'f' },
  { value: 'x', value2: 'y', value3: 'z' },
  { coolestValue: 'your mother' },
];

switchFunction(myConditions)(data); // returns 3

// another distraction from /wdg/:

const eq = (inputString, isEqualToVar) => inputString === isEqualToVar;

eq('ayy', 'ayy'); 
eq('ayy', 'ayyy'); 

const isEqualToAnyVars = (inputVar, varsToCompareTo) => {
  let ret = false;
  let i = 0;

  while ((i < varsToCompareTo.length) && (ret === false)) {
    ret = inputVar === varsToCompareTo[i];
    i++;
  }

  return ret;
};

isEqualToAnyVars('ayy', ['', 'sheet']); // returns false
isEqualToAnyVars('ayy', ['', 'sheet', 'ayy', 'fug']); // returns true

// testing out bonuses:

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
    dex: abilityScoreTest2,
    con: abilityScoreTest3,
  },
  skills: {
    acrobatics: {
      name: 'ACROBATICS', baseValue: 4, proficient: false, bonusSources: [],
    },
    arcana: {
      name: 'ARCANA', baseValue: 4, proficient: false, bonusSources: [],
    },
    athletics: {
      name: 'ATHLETICS', baseValue: 4, proficient: false, bonusSources: [],
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
      name: 'INVESTIGATION', baseValue: 4, proficient: false, bonusSources: [],
    },
    nature: {
      name: 'NATURE', baseValue: 4, proficient: false, bonusSources: [],
    },
    religion: {
      name: 'RELIGION', baseValue: 4, proficient: false, bonusSources: [],
    },
    sleightOfHand: {
      name: 'SLEIGHT_OF_HAND', baseValue: 4, proficient: false, bonusSources: [],
    },
    stealth: {
      name: 'STEALTH', baseValue: 4, proficient: false, bonusSources: [],
    },
  },
};

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

getBonusTargets(abilityScoreTest)(bonusMap); 
getBonusTargets(abilityScoreTest3)(bonusMap); 

// const setBonusTargets = R.pipe(
//   R.prop('abilityScores'),
//   R.forEach((abilityScore) => {
//     // eslint-disable-next-line no-param-reassign
//     abilityScore.bonusTargets = getBonusTargets(abilityScore);
//   }),
// );

playerCharacterTest.abilityScores.dex.bonusTargets = getBonusTargets(playerCharacterTest.abilityScores.dex)(bonusMap);
playerCharacterTest.abilityScores.con.bonusTargets = getBonusTargets(playerCharacterTest.abilityScores.con)(bonusMap);
playerCharacterTest.abilityScores.wis.bonusTargets = getBonusTargets(playerCharacterTest.abilityScores.wis)(bonusMap);

const getPlayerCharacterBonusTargets = R.pipe(
  R.prop('abilityScores'),
  R.values,
  R.map(R.prop('bonusTargets')),
  R.flatten,
);

const bonusTargetsTest = getPlayerCharacterBonusTargets(playerCharacterTest); 

// const setBonusSources = playerCharacter => R.map(
//   R.pipe(
//     (bonusTarget) => {
//       const skill = playerCharacter.skills[screamingToCamelCase(bonusTarget.targetName)];

//       if (skill) {
//         skill.bonusSources.push(bonusTarget);
//       }
//     },
//   ),
// );

// const bonusSources = [{ sourceName: 'fug', sourceType: 'fugu' }];

// const oldBonusSourceIndex = R.findIndex(
//   R.allPass([
//     R.propEq('sourceName', bonusTargetsTest[0].sourceName),
//     R.propEq('sourceType', bonusTargetsTest[0].sourceType),
//   ]),
//   bonusSources,
// );

// oldBonusSourceIndex; 

const setBonusSources2 = playerCharacter => R.forEach(
  (bonusTarget) => {
    const skill = playerCharacter.skills[screamingToCamelCase(bonusTarget.targetName)];

    if (skill) {
    // eslint-disable-next-line prefer-destructuring
      const bonusSources = skill.bonusSources;

      const oldBonusSourceIndex = R.findIndex(
        R.allPass([
          R.propEq('sourceName', bonusTarget.sourceName),
          R.propEq('sourceType', bonusTarget.sourceType),
        ]),
        bonusSources,
      );

      // eslint-disable-next-line no-bitwise
      if (~oldBonusSourceIndex) {
        skill.bonusSources[oldBonusSourceIndex] = bonusTarget;
      } else {
        skill.bonusSources.push(bonusTarget);
      }
    }
  },
);

setBonusSources2(playerCharacterTest)(bonusTargetsTest);
playerCharacterTest.skills.history.bonusSources;

const calcBonuses = R.pipe(
  R.prop('bonuses'),
  R.map(R.prop('value')),
  R.sum,
);

calcBonuses(playerCharacterTest);

// const guardExplanation = R.ifElse(
//   R.isNil,
//   R.always('not yet entered'),
//   R.identity,
// );

// const createBonusTarget = (value, explanation, source, target) => ({
//   sourceName: source.name,
//   sourceType: source.type,
//   targetName: target.name,
//   targetType: target.type,
//   value,
//   explanation: guardExplanation(explanation),
// });

// const getBonusTargets2 = (sourceAbilityScore, map) => R.pipe(
//   R.tap(x => console.log(x)),
//   // R.find(R.propEq('abilityScoreName', sourceAbilityScore.name)),
//   // R.tap(x => console.log(x)),
//   // R.prop('skillNames'),
//   // R.map(targetSkillName => createBonusTarget(
//   //   getModifier(sourceAbilityScore),
//   //   `your ${sourceAbilityScore.name} score grants a bonus or penalty of ${getModifier(sourceAbilityScore)} to your ${targetSkillName}`,
//   //   {
//   //     name: sourceAbilityScore.name,
//   //     type: 'ABILITY_SCORE',
//   //   },
//   //   {
//   //     name: targetSkillName,
//   //     type: 'SKILL',
//   //   },
//   // )),
// )(map);

// getBonusTargets2(abilityScoreTest, bonusMap);

"fug" // ?
