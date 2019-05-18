const L = require('partial.lenses');
const R = require('ramda');
const V = require('partial.lenses.validation');
const RA = require('ramda-adjunct');



// USING PARTIAL LENSES ON THE CHARACTER SHEET:

// test data:
const playerCharacterDocument = {
  abilityScores: {
    wis: {
      name: 'INT',
      value: 17,
      proficient: false,
      // bonusSources: [],
      bonusTargets: ['a', 'b'],
    },
    dex: {
      name: 'DEX',
      value: 11,
      proficient: false,
      // bonusSources: [],
      bonusTargets: ['c', 'd'],
    },
    str: {
      name: 'STR',
      value: 11,
      proficient: false,
      // bonusSources: [],
      bonusTargets: ['e', 'f'],
    },
  },
  skills: {
    acrobatics: {
      name: 'ACROBATICS',
      baseValue: 4,
      proficient: false,
      // bonusSources: [],
    },
    arcana: {
      name: 'ARCANA',
      baseValue: 4,
      proficient: false,
      // bonusSources: [],
    },
    athletics: {
      name: 'ATHLETICS',
      baseValue: 4,
      proficient: false,
      // bonusSources: [],
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
      // bonusSources: [],
    },
    nature: {
      name: 'NATURE',
      baseValue: 4,
      proficient: false,
      // bonusSources: [],
    },
    religion: {
      name: 'RELIGION',
      baseValue: 4,
      proficient: false,
      // bonusSources: [],
    },
    sleightOfHand: {
      name: 'SLEIGHT_OF_HAND',
      baseValue: 4,
      proficient: false,
      // bonusSources: [],
    },
    stealth: {
      name: 'STEALTH',
      baseValue: 4,
      proficient: false,
      // bonusSources: [],
    },
  },
};


// THE PLAN!:

// how the heck do i make virtual properties?
// - how would you make a virtual property on a specific stat? don't!
// - maybe you could use a join table to map the sources with targets

// this is how!
// - just transform the json between retreval from the db and display 
// - you could store the application of a rule which mutates the json as an
//   actual lens/function and just mutate away like an absolute madman. 
// - you could store the fully populated sheet in a chache if you need to
//   optimize later 


// PARTIAL.LENSES.VALIDATION NOTES:
// - this lets you only apply a rule if the value is undefined (so it allows for
//   optional values)
// 1. "V.optional(rule) acts like the given rule except that in case the focus
//    is undefined it is accepted without invoking the given rule. This is
//    particularly designed for specifying that an object property is optional."
// - useful for when you need to identify an invalid property (the value of the
//   property is placed where the error message would have been)
// 1. "V.keep('prop', rule) acts like the given rule except that in case the
//    rule rejects the focus, the specified property is copied from the original
//    object to the error object. This is useful when e.g. validating arrays of
//    objects with an identifying property. Keeping the identifying property
//    allows the rejected object to be identified."


// TODO:

// CRAZY IDEAS:
// - instead of sending over an entirely new object when a modification is made
//   on the server that must be reflected on the client, see if you can send
//   over a patch created with some object diffing library (to save network
//   resources)
// - using lenses, create a mapper that can convert a mongoose model into a
//   validation compatable with the partial.lenses.validation library. NOTE:
//   this may not be necessary if mongoose already comes with this kind of
//   functionality

// LESS CRAZY IDEAS:
// - take into account that a bonus source from an override will make it so the
//   other sources are completely ignored when calculating the total
// - store bonus information on the same model property as the source of the
//   bonus as before but with differences:
// 1. on the model, only store it by reference somehow (use some kind of unique
//    key)
// 2. the reference will correspond to an actual function or specification
//    object to be given to a function
// 3. the corresponding function/spec object will be stored in a js file and
//    read to memory when needed

// MAKE FUNCTIONS THAT...
// - create a new character w/defaults
// - generate a random character 
// - populate computed/virtual/dependent properties
// - modify ability scores
// - modify skills
// - format existing properties/values (changing case, etc.)

// NOTE: i think you will have to accept that you will have to write out the
// object's form twice - once for the in-memory version and once for the db
// model. but you should be able to create some kind of automatic generator for
// the model at some point


// CREATE A BLANK CHARACTER:

// BASE STRUCTURE:
// - create a "base" object (maybe it should be similar to a spec object in that
//   the leaves are functions?)
// 1. alternatively, you could create a base array and just include the property
//    names
// 2. you would have to actually have objects as well - the basic idea though is
//    to avoid having to specify anything but the structure and property names
//    at this point 
// - use the base structure to create new, blank character sheets


// NEW IDEA: USE VALIDATION OBJECT AS BASE STRUCTURE
// - NOTE: you may still want to create the base structure with a mongoose model
//   in the database, but you will still need some kind of in-memory validation
//   at some point anyway so for now im going to do the webserver-first approach
// - use V.props to validate all properties of the sheet and any properties that
//   are objects (the spec object you pass in should mirror the validated
//   structure)


// NEW IDEA: SOMEHOW USE AN OBJECT AS BOTH A SPECIFICATION AND VALIDATION
// - to specify empty values, have those values be functions
// - the functions should probably be validation rules
// - EDIT: it may be more doable to wrap base objects in V.props or something
//   similar
// - when necessary
// 1. this may get you a similar result (less typing, more reusability)

const score = {
  // - you may need to provide an error message if you lift a predicate into a
  //   rule like this:
  base: RA.inRange(0, 20),
  proficient: RA.isBoolean,
  // add bonus targets later
}

const scoreValidator = V.props(score);

// do not have a validator for non-leaves like this - automatically apply
// validation to these somehow instead:
// const scoresValidator = {}

const baseSheet = {
  scores: {
    wis: score,
    dex: score,
    str: score,
  }
}

// trying out "pairing" the validation and generation information together:
const score2 = {
  validator: V.props({
    base: RA.inRange(0, 20),
    proficient: RA.isBoolean,
  }),
  genRandom: () => ({
    base: Math.floor(Math.random() * 21),
    proficient: !!Math.floor(Math.random() * 2),
  }),
  genBlank: () => ({
    base: 0,
    proficient: false,
  })
};

const randScore = score2.genRandom(); // ?
const blankScore = score2.genBlank(); // ?
V.errors(score2.validator, randScore); // ?
V.errors(score2.validator, blankScore); // ?


// going back to the original style (just using the validator as the base
// object). Also trying to make the scores an array:

const isUniqueBy = (p, xs) => {
  const counts = L.counts([L.elems, p], xs)
  return x => counts.get(x) <= 1
};

const validateSheet = ({ scoreNames, skillNames }) => V.props({
  scores: V.choose(scores => 
    V.and(
      [() => scores.length === scoreNames.length, 'incorrect amount of scores'],
      V.arrayIx(V.props({
        base: V.and(
          [RA.isInteger, 'must be a whole number'],
          [RA.inRange(0, 20), 'must be between 0 and 20'],
        ),
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
        base: V.and(
          [RA.isInteger, 'must be a whole number'],
          [RA.inRange(0, 20), 'must be between 0 and 20'],
        ),
        name: V.and(
          [RA.isString, 'must be a string'],
          [R.includes(R.__, skillNames), 'must be a valid skill name'],
          [isUniqueBy('name', skills), 'duplicate']
        ),
        proficient: [RA.isBoolean, 'must be a boolean'],
      })),
    )
  ),
});

const testSheet = {
  scores: [
    {
      name: 'cha',
      base: 10,
      proficient: false,
    },
    {
      name: 'str',
      base: 15,
      proficient: false,
    },
    {
      name: 'dex',
      base: 15,
      proficient: false,
    },
  ],
  skills: [
    {
      name: 'athletics',
      base: 10,
      proficient: false,
    },
    {
      name: 'arcana',
      base: 10,
      proficient: false,
    },
    {
      name: 'acrobatics',
      base: 10,
      proficient: false,
    },
    {
      name: 'sleight of hand',
      base: 10,
      proficient: false,
    },
    {
      name: 'stealth',
      base: 10,
      proficient: false,
    },
    {
      name: 'deception',
      base: 10,
      proficient: false,
    },
    {
      name: 'intimidation',
      base: 10,
      proficient: false,
    },
    {
      name: 'performance',
      base: 10,
      proficient: false,
    },
    {
      name: 'persuasion',
      base: 10,
      proficient: false,
    },
  ],
};

// const scoreNames = ['cha', 'dex', 'int', 'str', 'wis', 'con'];
const scoreNames = ['cha', 'str', 'dex'];
const skillNames = ['athletics', 'arcana', 'acrobatics', 'sleight of hand', 'stealth', 'deception', 'intimidation', 'performance', 'persuasion'];
V.errors(validateSheet({scoreNames, skillNames}), testSheet); // ?

const Model = {
  scores: ['scores', L.normalize(R.sortBy(L.get('name')))],
  skills: ['skills', L.normalize(R.sortBy(L.get('name')))],
};

const Skills = {
  byName: name => [L.find(R.propEq('name', name))],
};

const Scores = {
  byName: name => [L.find(R.propEq('name', name))],
};

// just testing the above a little:
const getScores = L.get(Model.scores, testSheet); // ?
L.get([Model.skills, Skills.byName('athletics')], testSheet); // ?
L.modify([Model.skills, Skills.byName('athletics'), 'base'], R.inc, testSheet); // ?


// NEW PLAN (going back to using a structure for storing the bonuses):
// - for maximum flexibility, you should map the bonuses to actual setters
// - in the end (for the toy example), you will have:
// 1. lenses for each skill (make one function and pass in the skill name)
// 2. a getter/fold/transform that returns a list of bonuses. each bonus is a
//    mapping function + a reference to the skill lense it should be used with
// - then you will have everything you need to apply the bonuses to the sheet in
//   sequence

// MIKE: consider that character level's effect on stats will have to be
// calculated in the same way (it will be considered a bonus) 

// MIKE: you could simply pass getters thru memoizeWith for easy caching

const calcModifier = x => RA.floor((x - 10) / 2);

const sourceLen = [
  Model.scores,
  Scores.byName('str')
];

const targetLen = [
  Model.skills,
  Skills.byName('athletics')
];

const applyTheRule = (sourceLen, targetLen, sheet) => L.modify(
  [targetLen, 'final', L.define(L.get([targetLen, 'base'], sheet))],
  R.add(
    R.pipe(
      L.get([sourceLen, 'base']),
      calcModifier
    )(sheet)
  ),
)(sheet);

applyTheRule(sourceLen, targetLen, testSheet); // ?
 
// MIKE: you need to figure out how to store the effect info so it can be
// displayed to the user
// - instead of calculating the final value when applying the rule, apply the
//   rule by adding/modifying a new property/value and then calculate the final
//   in a getter

const applyTheRule2 = (sourceLen, targetLen, sheet) => L.modify(
  [targetLen, 'bonuses', L.define([])],
  R.append({
    explanation: `bonus from ${L.get([sourceLen, 'name'], sheet)}`,
    val: calcModifier(L.get([sourceLen, 'base'], sheet))
  }),
)(sheet);

const result = applyTheRule2(sourceLen, targetLen, testSheet); // ?
result.skills[1].bonuses; // ?

// where do you stop lol?
// - you could make absolutely everything about a rule customizable, but that
//   would be ridiculous
// - so you need to figure out a good point at which to stop making it
//   customizable and hard-code part of the logic
// - a good middle ground would be to pass in as much functionality as possible
//   with the strategy pattern

// MIKE: try to make it so that you can reverse each bonus application - that
// way, if something about the char sheet changes you can recalculate just the
// part that changed
// - this is only possible if you store each bonus as a separate value on the
//   sheet (like you are already doing)
// - then you can just use some kind of "remove" lens method to remove it
// - but how do maintain the link between the source and the bonus?
// 1. you could hold a reference in the bonus value itself, but that would dirty
//    up the structure with more context-specific details

const applyBonus = (sourceLen, targetLen, sheet) => L.modify(
  [targetLen, 'bonuses', L.define([])],
  R.append({
    explanation: `bonus from ${L.get([sourceLen, 'name'], sheet)}`,
    val: calcModifier(L.get([sourceLen, 'base'], sheet))
  }),
)(sheet);

// PLAN:
// - create a read-only lense for calculating bonus totals on a given property
// - traverse with two lenses (at the same time using something like L.partsOf):
// 1. the first one will look for bonuses relating to the property
// 2. the second one will target the property itself
// - after completing those traversals, just fold the resultant array into the
//   "final form" of the property
// - this is different from/better than the last version of applyBonus because
//   it shouldn't require you to create lenses within the function - it just
//   uses optics
// - that being said, you may want to pass in some sort of "rule defintion"
//   (similar to your source-targets map) so you can keep the rule information
//   separate from the structure. but feel this out and see if it makes sense.
// - MIKE: figure out how to "label" the result of each traversal so that you
//     can sort them out
// - NOTE: the only way to turn a fold into a bidirectional traversal is with
//   "L.foldTraversalLense", and for it to work properly you need to follow
//   certain rules (see definition)
// - If you can't create a bidirectional traversal, you'll have to make a
//   read-only optic: "You can also directly compose optics with ordinary
//   functions. The result of such a composition is a read-only optic."


// NEW PLAN:
// - ignore the last plan!

// const applyBonus = (sourceLen, targetLen, sheet) => L.modify(
//   [targetLen, 'bonuses', L.define([])],
//   R.append({
//     explanation: `bonus from ${L.get([sourceLen, 'name'], sheet)}`,
//     val: calcModifier(L.get([sourceLen, 'base'], sheet))
//   }),
// )(sheet);

const createBonus = score => ({
  source: score.name,
  val: calcModifier(score.base),
});

const scoreByName = scoreName => [Model.scores, Scores.byName(scoreName)];
const getBonus = (scoreName, sheet) => L.getAs(createBonus, scoreByName(scoreName), sheet);

getBonus('str', testSheet); // ?

const bonusesLense = (skillName) => [
  Model.skills,
  Skills.byName(skillName),
  'bonuses',
  L.define([]),
];

L.get(bonusesLense('atheletics'), testSheet); // ?

// getting the bonus and applying it:

const strBonus = getBonus('str', testSheet);

const transformedSheet = L.transform([bonusesLense('atheletics'), L.appendOp(strBonus)], testSheet); // ?

// check if transformation worked:
L.get([Model.skills, L.elems, L.prop('bonuses')], transformedSheet); // ?

// MIKE: figure out how to use a map of scores to skills instead of doing it one
// by one like above (that way you can use L.seq)

// const sourceTargets = [
//   ['str', ['atheletics']],
//   ['dex', ['acrobatics', 'sleight of hand', 'stealth']]
// ];

const sourceTargets = {
  ['str']: ['athletics'],
  ['dex']: ['acrobatics', 'sleight of hand', 'stealth'],
  ['cha']: ['deception', 'intimidation', 'performance', 'persuasion'],
};

const bonuses = L.collect([Model.scores, L.elems, createBonus], testSheet); // ?

const reducer = (transforms, bonus) => R.append(
  R.map(
    (skillName) => L.transform([bonusesLense(skillName), L.appendOp(bonus)]),
    sourceTargets[bonus.source]
  ),
  transforms
);

// MIKE: try to use chain instead
const transforms = R.flatten(R.reduce(reducer, [], bonuses)); // ?

R.pipe(...transforms)(testSheet); // ?




// MIKE: im going to go with the original plan of having a getter for each
// source for now (EDIT: NEVERMIND)

// R.map((mapping) => [
//   getBonus(mapping[0], testSheet),
//   mapping[1]
// ], sourceTargets); // ?





// SCRATCH:

L.get(L.mapping((x, y) => [[x, L._, ...y], {x, y}]), ['a', 'b', 'c', 'd']); // ?
// { x: 'a', y: ['c', 'd'] }

L.getInverse(
  L.array(L.alternatives(L.mapping(['foo', 'bar']), L.mapping(['you', 'me']))),
  ['me', 'bar']
); // ?
// ['you', 'foo']


L.get(
  [
    L.joinIx('a'),
    L.joinIx('b'),
    L.joinIx('c'),
    L.mapIx(L.collect(L.flatten)),
    R.pair
  ],
  {a: {b: {c: 'abc'}}}
); // ?
// [ 'abc', [ 'a', 'b', 'c' ] ]

L.get([L.joinIx('a'), L.joinIx('b'), L.joinIx('c'), R.pair], {
  a: {b: {c: 'abc'}}
}); // ?
// [ 'abc', [ [ 'a', 'b' ], 'c' ] ]

const getMetrics = R.applySpec({
  sum: R.add,
  nested: { mul: R.multiply }
});
getMetrics(2, 4); // ?

// PLAYING WITH VALIDATION LIBRARY:
const rules = V.choose(events => V.arrayIx(V.props({
  date: V.and(
    [isNonEmpty,                  'required'],
    [isValidDate,                 'yyyy-mm-dd'],
    [isUniqueBy('date', events),  'duplicate']),
  event: V.and(
    [isNonEmpty,                  'required'],
    [isUniqueBy('event', events), 'duplicate'])
})));

const isNonEmpty = R.identity;

const isValidDate = R.test(/^\d{4}-\d{2}-\d{2}$/);

V.errors(rules, [
  {"date": "2017-09-11", "event": "EFSA-H"},
  {"date": "2017-09-20", "event": "EFSA-T"},
  {"date": "",           "event": "EFSA-T"}
]); // ?


V.accepts(
  V.lazy(tree => V.arrayId(
    V.props({
      name: R.is(String),
      children: tree
    })
  )),
  [
    {
      name: 'root',
      children: [
        {name: '1st child', children: []},
        {
          name: '2nd child',
          children: [{name: 'You got the point', children: []}]
        },
      ]
    }
  ]
)
// true



// OLD NOTES: 


// i like how i did it above, now lets build on it by making these:
// - setters and getters (do first)
// - blank character generator
// - random character generator


// MAKING GETTERS:
// - try to put all of the logic for calculating how certain stats effect other
//   stats into the getter and not on the data itself. 
// - NOTE: this may not work, im just trying it to see how far i can get.

// DIFFERENT WAYS OF CALCULATING BONUSES:
// - you could try to pass the context down through the lenses transformation
//    functions (MIKE: research this more) and do all the work in a single optic
// - or you could just perform the getting in multiple transformation steps with
//    intermediate data in between, for example...:
// 1. ...first collect all of the bonuses from their sources
// 2. ...then use the collection to apply those bonuses to their targets
// 3. you should use L.seq to sequence the transformations


// MIKE: find optics that focus multiple values and/or optics that can pass
// context between eachother
// - L.branch
// - L.choose (similar to V.choose, this is probably what you want). you could
//   also use the other conditional optics like L.cond.
// - you can use the optics listed under "Indices" to pass down "context" or
//   "construct paths":
// 1. L.setIx and L.mapIx seem to be the most versatile

// MIKE: try not to do any expensive searching

// PLAN:
// - create getters for the bonuses
// 1. these getters should take static bonus info + the sheet
// - create getters for the properties that the bonuses are applied to
// 1. use the bonus getters INSIDE of the property getters 
// - UPDATE: even if you got this to work, i dont think it would be very
//   flexible
