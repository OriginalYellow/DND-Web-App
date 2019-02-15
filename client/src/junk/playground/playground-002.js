/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-properties */
/* eslint-disable no-unused-vars */

import lensMap from 'ramda-lens-map';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import * as U from '../util';

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

// leanring about "transducers" by following along with
// https://medium.freecodecamp.org/efficient-data-transformations-using-transducers-c779043ba655

const bigCollectionOfData = [
  {
    age: 20,
    gender: 'female',
    country: 'NL',
    fullName: 'sheeeet1',
  },
  {
    age: 20,
    gender: 'female',
    country: 'US',
    fullName: 'sheeeet2',
  },
  {
    age: 20,
    gender: 'female',
    country: 'NL',
    fullName: 'sheeeet3',
  },
  {
    age: 3,
    gender: 'female',
    country: 'NL',
    fullName: 'sheeeet4',
  },
];

// NOTE: this approach will create a "temporary collection" between each
// filter/map - less effecient than it could be

const ageAbove18 = person => person.age > 18;
const isFemale = person => person.gender === 'female';
const livesInTheNetherlands = person => person.country === 'NL';
const pickFullName = person => person.fullName;
const output = bigCollectionOfData
  .filter(livesInTheNetherlands)
  .filter(isFemale)
  .filter(ageAbove18)
  .map(pickFullName); // ?

// NOTE: this approach only creates 2 collections - one after each reduce step -
// more effecient than above
const mapReducer = mapper => (result, input) => result.concat(mapper(input));
const filterReducer = predicate => (result, input) => (predicate(input) ? result.concat(input) : result);
const personRequirements = person => ageAbove18(person) && isFemale(person) && livesInTheNetherlands(person);
const output2 = bigCollectionOfData
  .reduce(filterReducer(personRequirements), [])
  .reduce(mapReducer(pickFullName), []); // ?

// NOTE: this approach uses transducers

// NOTE: "Transducers are functions that accept a reducing function and return a
// reducing function."

// NOTE: "When we compose multiple transducers into a single function, most of
// the time it’s called a xform transducer. So when you see this somewhere, you
// know what it means."

// NOTE: "Although function composition applies functions from right to left,
// the transformations will actually be evaluated from left to right at
// execution time"

const mapTransducer = mapper => reducingFunction => (result, input) => reducingFunction(result, mapper(input));
const filterTransducer = predicate => reducingFunction => (result, input) => (predicate(input)
  ? reducingFunction(result, input)
  : result);


const concatReducer = (result, input) => result.concat(input);
const lowerThan6 = filterTransducer(value => value < 6);
const double = mapTransducer(value => value * 2);
const numbers = [1, 2, 3];

const xform = R.compose(double, lowerThan6);
const output3 = numbers.reduce(xform(concatReducer), []); // ?

// NOTE: this approach uses ramda more

// NOTE: With Ramda, we can use their map and filter methods. This is because
// Ramda’s internal reduce method uses the Transducer Protocol under the hood.
// transducer protocol:
// https://github.com/cognitect-labs/transducers-js#the-transducer-protocol

const lowerThan62 = R.filter(value => value < 6);
const double2 = R.map(value => value * 2);
const numbers2 = [1, 2, 3];
const xform2 = R.compose(double2, lowerThan62);
const output4 = R.into([], xform2, numbers2); // ?

// NOTE: doc for Ramda's "into" method: https://ramdajs.com/docs/#into

// NOTE: hmmmm, is the only difference between doing the below line and doing
// the same with "into" that there is no temporary collection? I feel like
// testing that out later.
R.compose(lowerThan62, double2)(numbers2); // ?

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

// my validation function for an array of stats

const statsArray = [
  { shortName: 'ac', longName: 'armor class', val: 0 },
  { shortName: 'dex', longName: 'dexterity', val: 0 },
  { shortName: 'str', longName: 'strength', val: 0 },
  { shortName: 'int', longName: 'intelligence', val: 0 },
  { shortName: 'char', longName: 'charisma', val: 0 },
];

const validate = R.allPass([
  Array.isArray,
  R.compose(
    R.not,
    R.any(R.equals(false)),
    R.map(
      R.allPass([
        R.has('shortName'),
        R.has('longName'),
        R.has('val'),
      ]),
    ),
  ),
]);

validate(statsArray); // ?

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

// getter for turning stats object into array

const statsObj = {
  ac: { shortName: 'ac', longName: 'armor class', val: 0 },
  dex: { shortName: 'dex', longName: 'dexterity', val: 0 },
  str: { shortName: 'str', longName: 'strength', val: 0 },
  int: { shortName: 'int', longName: 'intelligence', val: 0 },
  char: { shortName: 'char', longName: 'charisma', val: 0 },
};

R.values(statsObj); // ?

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

// making a version of tap that logs stuff

const logTap = R.tap(x => console.log(x));

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

// playing with "while" functions to see if i can use short-circuiting with
// checking stuff

// copied from ramda docs for "reduceWhile"

const isOdd = (acc, x) => x % 2 === 1;
const xs = [1, 3, 5, 60, 777, 800];
R.reduceWhile(isOdd, R.add, 0, xs); // ?

const ys = [2, 4, 6];
R.reduceWhile(isOdd, R.add, 111, ys); // ?

// copied from ramda docs for "takeWhile"

const isNotFour = x => x !== 4;

R.takeWhile(isNotFour, [1, 2, 3, 4, 3, 2, 1]); // ?

R.takeWhile(x => x !== 'd', 'Ramda'); // ?

// PLAN: use reduceWhile, and replace the accumulator entirely with a boolean
// value. the value expresses whether the test passed or not. the point is to
// have the result be a boolean that says whether any elements failed the test

// NOTE: the above didn't work because if the predicate returns false, the value
// of the accumulator isn't changed (for some reason you had assumed that it
// would set the value of the accumulator to the predicate's return value...but
// that would violate the spec)

const stat = { shortName: 'ac', longName: 'armor class', val: 0 };
const requiredKeys = ['shortName', 'longName', 'val'];

R.reduceWhile((_, x) => U.log('reduceWhileTest:', R.has(x, stat)), R.always(true), false, requiredKeys); // ?

// PLAN: considering the above, you are probably ok to just use take while and
// compare the length of the result to the original

// PLAN: try using "reduced" to tweak the above to do what you want

// copied from ramda doc for "reduced":

R.reduce(
  (acc, item) => (item > 3 ? R.reduced(acc) : acc.concat(item)),
  [],
  [1, 2, 3, 4, 5],
); // ?

// my attmempt:

const stat2 = { shortName: 'ac', longName: 'armor class', val: 0 };
const requiredKeys2 = ['shortName', 'longName', 'val'];

R.reduce(
  (_, item) => U.log('hasAll test:', (R.has(item, stat2) ? true : R.reduced(false))),
  false,
  requiredKeys2,
); // ?

U.hasAll(requiredKeys2, stat2); // ?

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */


const xLens = R.lens(R.prop('x'), R.assoc('x'));

R.view(xLens, { x: 1, y: 2 }); // ?
R.set(xLens, 4, { x: 1, y: 2 }); // ?
R.over(xLens, R.negate, { x: 1, y: 2 }); // ?

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

// REALLY cool way to make "expression builders" (objects w/fluent api) with
// ramda. copied from
// https://hackernoon.com/writing-fluent-functional-code-384111431895

const SiteBuilder = value => ({
  withSiteName: name => SiteBuilder({ ...value, ...{ name } }),
  withDomain: domain => SiteBuilder({ ...value, ...{ domain } }),
  build: () => value,
});

const site = SiteBuilder({})
  .withSiteName('hello')
  .withDomain('some-domain')
  .build(); // ?

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

new Map().set('int', { shortName: 'int', longName: 'intelligence', val: 5 }); // ?

// trying out this lensMap thingy

const myMap = new Map();
const myNewMap = R.set(lensMap('foo'), 'bar', myMap); // ?
myNewMap.get('bar'); // ?
