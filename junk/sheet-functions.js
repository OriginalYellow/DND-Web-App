const L = require('partial.lenses');
const R = require('ramda');
const V = require('partial.lenses.validation');
const S = require('sanctuary');
const RA = require('ramda-adjunct');
const State = require('crocks/state');

// im a genius!:
const cur = R.curry;


// dummy data:

const testSheet = {
  scores: [
    {
      name: 'cha',
    },
    {
      name: 'str',
    },
    {
      name: 'dex',
    },
  ],
  skills: [
    {
      name: 'athletics',
    },
    {
      name: 'arcana',
    },
    {
      name: 'acrobatics',
    },
    {
      name: 'sleight of hand',
    },
    {
      name: 'stealth',
    },
    {
      name: 'deception',
    },
    {
      name: 'intimidation',
    },
    {
      name: 'perception',
    },
    {
      name: 'performance',
    },
    {
      name: 'persuasion',
    },
  ],
};

const scoreNames = ['cha', 'str', 'dex'];
const skillNames = ['athletics', 'arcana', 'acrobatics', 'sleight of hand', 'stealth', 'deception', 'intimidation', 'performance', 'persuasion'];

const ScoreSkillMappings = {
  ['str']: ['athletics'],
  ['dex']: ['acrobatics', 'sleight of hand', 'stealth'],
  ['cha']: ['deception', 'intimidation', 'performance', 'persuasion'],
};


// sheet validation:

const isUniqueBy = (p, xs) => {
  const counts = L.counts([L.elems, p], xs);
  return x => counts.get(x) <= 1;
};

// MIKE: you might want to couple this validation with the sheet in an object
// because it'll only be used with that object and probably used in random
// places - so its convenient
const validateSheet = ({ scoreNames, skillNames }) => V.props({
  scores: V.choose(scores => 
    V.and(
      [() => scores.length === scoreNames.length, 'incorrect amount of scores'],
      V.arrayIx(V.props({
        base: V.optional(V.and(
          [RA.isInteger, 'must be a whole number'],
          [RA.inRange(0, 20), 'must be between 0 and 20'],
        )),
        name: V.and(
          [RA.isString, 'must be a string'],
          [R.includes(R.__, scoreNames), 'must be a valid score name'],
          [isUniqueBy('name', scores), 'duplicate']
        ),
        proficient: [RA.isBoolean, 'must be a boolean'],
      })),
    )
  ),
  skills: V.choose(skills => 
    V.and(
      [() => skills.length === skillNames.length, 'incorrect amount of skills'],
      V.arrayIx(V.props({
        base: V.optional(V.and(
          [RA.isInteger, 'must be a whole number'],
          [RA.inRange(0, 20), 'must be between 0 and 20'],
        )),
        name: V.and(
          [RA.isString, 'must be a string'],
          [R.includes(R.__, skillNames), 'must be a valid skill name'],
          [isUniqueBy('name', skills), 'duplicate']
        ),
        proficient: [RA.isBoolean, 'must be a boolean'],
        bonuses: V.optional(V.and(
          [RA.isArray, 'must be an array'],
          V.arrayIx(V.props({
            source: [RA.isString, 'source must be a string'],
            val: [RA.isNumber, 'value must be a number'],
          })),
        ))
      })),
    )
  ),
});


// lenses:

const Model = {
  scores: ['scores', L.normalize(R.sortBy(L.get('name')))],
  skills: ['skills', L.normalize(R.sortBy(L.get('name')))],
  race: ['race'],
  size: ['size'],
  speed: ['speed'],
  languages: ['languages'],
  abilities: ['abilities'],
  resistances: ['resistances'],
  subrace: ['subrace'],
};

const Skills = {
  skillByName: name => [L.find(R.propEq('name', name))],
  bonuses: ['bonuses', L.define({})],
};

const Skill = {
  bonuses: ['bonuses', L.define({})],

  vals: [L.branch({
    bonuses: [L.define({}), L.children, 'val'],
    base: [L.define(0)],
  })],
}

Skill.Fold = {
  total: L.foldTraversalLens(L.sum, Skill.vals),
}

const Scores = {
  scoreByName: name => [L.find(R.propEq('name', name))],
};

const Score = {
  bonuses: ['bonuses', L.define({})],

  vals: [L.branch({
    bonuses: [L.define({}), L.children, 'val'],
    base: [L.define(0)],
  })],
}

Score.Fold = {
  total: L.foldTraversalLens(L.sum, Score.vals),
}

Model.Readonly = {
  bonusFromScore: scoreName => [    
    Model.scores,
    Scores.scoreByName(scoreName),
    Score.Fold.total,
    cur(Helper.createSkillBonusFromScore)(scoreName)
  ],
}

// misc lenses mainly for viewing stuff:

const View = {
  scoreByNameTotal: (scoreName) => [Model.scores, Scores.scoreByName(scoreName), Score.Fold.total],
  scoreByNameBonuses: (scoreName) => [Model.scores, Scores.scoreByName(scoreName), Skill.bonuses],
  skillByNameTotal: (skillName) => [Model.skills, Skills.skillByName(skillName), Skill.Fold.total],
  skillByNameBonuses: (skillName) => [Model.skills, Skills.skillByName(skillName), Skill.bonuses]
};


// misc helpers:

const Helper = {
  calcModifier: x => RA.floor((x - 10) / 2),

  createSkillBonusFromScore: (sourceName, scoreVal) => ({
    [sourceName]: {
      val: Helper.calcModifier(scoreVal),
    }
  }),

  createScoreValBonus: (sourceName, scoreVal) => ({
    [sourceName]: {
      val: scoreVal,
    }
  }),

  createScoreNominalBonus: sourceName => ({
    [sourceName]: {
      type: 'proficiency',
    }
  }),

  createScoreBonusNew: (sourceName, bonusVals) => ({
    [sourceName]: bonusVals,
  }),
};


// transforming:

const Transform = {
  addBonusToSkill: (bonus, skillName) => [
    Model.skills,
    Skills.skillByName(skillName),
    Skill.bonuses,
    L.assignOp(bonus),
  ],

  addBonusToScore: (bonus, scoreName) => [
    Model.scores,
    Scores.scoreByName(scoreName),
    Score.bonuses,
    L.assignOp(bonus),
  ],

  addBonusToSkills: (sourceTargets, bonus) => L.seq(...R.map(
      cur(Transform.addBonusToSkill)(bonus),
      sourceTargets[R.keys(bonus)[0]],
  )),
};


// MIKE: move these 2 state utilities to a different file:
const putResultant = a =>
  State.put(a)
    .map(R.always(a));

const putState = R.always(State.get());

const Stateful = {
  addBonusToScore: (scoreSkillMappings, sourceName, scoreName, val) => State.modify(
    L.transform(
      Transform.addBonusToScore(
        Helper.createScoreValBonus(sourceName, val),
        scoreName,
  )))
  .chain(putState)
  .map(
    L.get(
      Model.Readonly.bonusFromScore(scoreName)
  ))
  .chain(bonus => State.modify(
    L.transform(
      Transform.addBonusToSkills(scoreSkillMappings, bonus)
  ))),

  setScoreBase: (scoreSkillMappings, scoreName, val) => State.modify(
    L.set(
      [Model.scores, Scores.scoreByName(scoreName), 'base'],
      val,
  ))
  .chain(putState)
  .map(
    L.get(
      Model.Readonly.bonusFromScore(scoreName)
  ))
  .chain(bonus => State.modify(
    L.transform(
      Transform.addBonusToSkills(scoreSkillMappings, bonus)
  ))),
}


// testing transforms:

// MIKE: if you change race after it was already set, you will need to overrite
// abilities set by the previous race
// - you could do this by grouping all race-granted abililties under a property
//   and then setting that property when setting the race
// - EDIT: the above will not be necessary if you repopulate the sheet after
//   changing the race
const raceTransforms = {
  ['halfling']: [
    [Model.race, L.setOp('halfling')],
    [Model.size, 'val', L.setOp('small')],
    [Model.speed, 'val', L.setOp(25)],
    [Model.languages, 'val', L.setOp(['common', 'halfling'])],
    [L.modifyOp(Stateful.addBonusToScore(ScoreSkillMappings, 'race', 'dex', 2).execWith)],
    [Model.abilities, L.appendOp({
      name: 'naturally stealthy',
      explanation: 'You can move through the space of any creature that is of a size larger than yours.',
      source: 'race',
    })],
    [Model.abilities, L.appendOp({
      name: 'lucky',
      explanation: 'When you roll a 1 on the d20 for an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.',
      source: 'race',
    })],
    [Model.resistances, L.appendOp({
      name: 'brave',
      condition: 'frightened',
      source: 'race',
    })],
  ],
  ['elf']: [
    [Model.race, L.setOp('elf')],
    [Model.size, 'val', L.setOp('medium')],
    [Model.speed, 'val', L.setOp(30)],
    [Model.languages, 'val', L.setOp(['common', 'elvish'])],
    [L.modifyOp(Stateful.addBonusToScore(ScoreSkillMappings, 'race', 'dex', 2).execWith)],
    L.seq(
      [
        Model.skills,
        Skills.skillByName('perception'),
        Skill.bonuses,
        L.assignOp(Helper.createScoreBonusNew('race', { proficient: true }))
      ],
      [Model.skills, Skills.skillByName('perception'), 'proficient', L.setOp(true)]
    ),
    [Model.resistances, L.appendOp({
      name: 'Fey Ancestry',
      condition: 'charmed',
      source: 'race',
    })],
  ]
};

const subraceTransforms = {
  ['lightfoot']: [
    [Model.subrace, L.setOp('lightfoot')],
    [L.modifyOp(Stateful.addBonusToScore(ScoreSkillMappings, 'subrace', 'cha', 1).execWith)],
    [Model.abilities, L.appendOp({
      name: 'naturally stealthy',
      explanation: 'You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you.',
      source: 'subrace',
    })],
  ]
};

const baseAbilityScoreTransforms = [
  // [L.modifyOp(Stateful.setScoreBase(ScoreSkillMappings, 'cha', 12).execWith)],
  // [L.modifyOp(Stateful.setScoreBase(ScoreSkillMappings, 'dex', 10).execWith)],
  // [L.modifyOp(Stateful.setScoreBase(ScoreSkillMappings, 'str', 10).execWith)],
];

const testTransforms1 = [
  // [L.modifyOp(Stateful.setScoreBase(ScoreSkillMappings, 'cha', 14).execWith)],
  // [L.modifyOp(Stateful.addBonusToScore(ScoreSkillMappings, 'race', 'dex', 5).execWith)],
  // [L.modifyOp(Stateful.addBonusToScore(ScoreSkillMappings, 'some other source', 'dex', 2).execWith)],
];


const testTransforms2 = [
  // MIKE: with ur current bonus data structure, there is no way to impart both
  // a nominal and a value bonus from the same source - they would overrwrite
  // eachother:
  // [Model.skills, Skills.skillByName('perception'), Skill.bonuses,L.assignOp(Helper.createScoreValBonus('race'))],

  // MIKE: to solve the above, restructure bonuses thusly:
  // - each key on the bonuses object will still represent a unique source
  // - the value will be an array of values that represent a type of bonus -
  //   "bonus values"
  // - you have two options for data structures to use for bonus values:
  // 1. an object with the type of the value as the sole key, with its value
  //    being the bonus value itself: { val: 5 } or { proficient: true }
  // 2. a primitive value of type string | number. it will be a number for
  //    numeric values and a string for nominal values

  // [Model.skills, Skills.skillByName('perception'), Skill.bonuses, L.assignOp(Helper.createScoreBonusNew())],
];

const transforms = L.seq(...[
  ...raceTransforms['elf'],
  // ...subraceTransforms['lightfoot'],
  ...baseAbilityScoreTransforms,
  ...testTransforms1,
  ...testTransforms2,
]);

const newSheet = L.transform(transforms, testSheet); // ?

L.get(View.scoreByNameBonuses('dex'), newSheet); // ?
L.get([Model.scores, Scores.scoreByName('dex'), 'base'], newSheet); // ?
L.get(View.scoreByNameTotal('dex'), newSheet); // ?

L.get(View.scoreByNameBonuses('cha'), newSheet); // ?
L.get([Model.scores, Scores.scoreByName('cha'), 'base'], newSheet); // ?
L.get(View.scoreByNameTotal('cha'), newSheet); // ?

L.get(View.skillByNameTotal('sleight of hand'), newSheet); // ?
L.get(View.skillByNameBonuses('sleight of hand'), newSheet); // ?

L.get(View.skillByNameTotal('intimidation'), newSheet); // ?
L.get(View.skillByNameBonuses('intimidation'), newSheet); // ?

L.get(View.skillByNameBonuses('perception'), newSheet); // ?
L.get([Model.skills, Skills.skillByName('perception')], newSheet); // ?
L.get(View.skillByNameTotal('perception'), newSheet); // ?



















// MIKE: implement these:
// - races
// - skill/score proficiency
// - classes
// - profeciency bonus
// - levels


// MIKE: add this option thing:

// const newProps = {
//   options: ['race']
// };


// NOTE: this is how you would turn something into a closure used like a class
// (not necessary in this case but demonstrates how to do it):

// const Utility = (() => {
//   const calcModifier = x => RA.floor((x - 10) / 2);

//   return {
//     createBonus: score => ({
//       source: score.name,
//       val: calcModifier(score.base),
//     }),
//   };
// })();


// MIKE: redo this to use new method

// gets addBonusToSkill transforms for a specific bonus
// const getFinalTransforms = (sourceTargets, bonus) => R.map(
//   cur(Transform.addBonusToSkill)(bonus),
//   sourceTargets[bonus.source],
// );

// const addFinalTransforms = (sourceTargets, sheet) => {
//   const bonuses = L.collect([Model.scores, L.elems, Helper.createBonusOld], sheet);
//   const transforms = R.chain(cur(getFinalTransforms)(sourceTargets), bonuses);
//   return L.transform([L.seq(...transforms)], sheet);
// };

// let populatedSheet = addFinalTransforms(sourceTargets, testSheet); // ?