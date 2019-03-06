import * as R from 'ramda';


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

// count; // ?

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


const screamingToCamelCase = R.compose(
  lowerCaseFirst,
  R.join(''),
  R.map(
    R.compose(
      capitalizeFirst,
      R.toLower,
    ),
  ),
  R.split('_'),
);

// enumToCamelCase2('COOL_FUCKING_ENUM'); // ?

const nestedObject = {
  level1: {
    level2: 'level 2 text',
  },
};

const spreadTest1 = ({ level1: { level2: renamedLevel2 } }) => {
  renamedLevel2; // ?
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

eq('ayy', 'ayy'); // ?
eq('ayy', 'ayyy'); // ?

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
