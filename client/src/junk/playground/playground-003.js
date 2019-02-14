/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-properties */
/* eslint-disable no-unused-vars */

import lensMap from 'ramda-lens-map';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import * as U from '../util';

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

// messing around with partial.lenses

const sampleTitles = {
  titles: [
    {
      language: 'en',
      text: 'Title',
    },
    {
      language: 'sv',
      text: 'Rubrik',
    },
    {
      language: 'alb',
      text: 'World Records 2018',
    },
  ],
};

L.get(L.compose(L.prop('titles'), L.index(0)), sampleTitles); // ?

// R.view(R.compose(L.prop('titles'), L.index(0)), sampleTitles); // ?

const textIn = language => L.compose(
  U.log('result of L.prop: ', L.prop('titles')),
  L.normalize(R.sortBy(L.get('language'))),
  L.find(R.whereEq({ language })),
  L.valueOr({ language, text: '' }),
  L.removable('text'),
  L.prop('text'),
);

L.get(textIn('sdf'), sampleTitles); // ?

sampleTitles; // ?

L.getLog(['data', L.elems, 'y'], { data: [{ x: 1 }, { y: 2 }] });

L.getLog(textIn('sdf'), sampleTitles);

// breaking it up more:

const Title = {
  text: [L.removable('text'), 'text'],
};

const Titles = {
  titleIn: language => [
    L.find(R.whereEq({ language })),
    L.valueOr({ language, text: '' }),
  ],
};

const Model = {
  titles: ['titles', L.normalize(R.sortBy(L.get('language')))],
  textIn: language => [Model.titles, Titles.titleIn(language), Title.text],
};

L.get(Model.textIn('sv'), sampleTitles); // ?

// manipulating multiple items:

const texts = [Model.titles, L.elems, Title.text];

L.collect(texts, sampleTitles); // ?

L.maximumBy(R.length, texts, sampleTitles); // ?

L.modify(texts, R.toUpper, sampleTitles); // ?

L.remove([texts, L.when(t => t === 'Rubrik')], sampleTitles); // ?

// NOTE: "What makes the above a traversal is the L.elems part. The result of
// composing a traversal with a lens is a traversal."

// NOTE: "When focusing on an array element or an object property, the index of
// the array element or the key of the object property is passed as the index to
// user defined functions operating on that focus."

L.get(
  [L.find(R.equals('bar')), (value, index) => ({ value, index })],
  ['foo', 'bar', 'baz'],
); // ?

// MIKE: use something like this to transform that stats object into a list:
L.modify(L.values, (value, key) => ({ key, value }), { x: 1, y: 2 }); // ?

// NOTE: "Only optics directly operating on array elements and object properties
// produce indices. Most optics do not have an index of their own and they pass
// the index given by the preceding optic as their index. For example, L.when
// doesn't have an index by itself, but it passes through the index provided by
// the preceding optic":

L.collectAs(
  (value, index) => ({ value, index }),
  [L.elems, L.when(x => x > 2)],
  [3, 1, 4, 1],
); // ?

L.collect(
  [L.elems, L.when(x => x > 2), (value, index) => ({ value, index })],
  [3, 1, 4, 1],
); // ?

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

// random question in vue discord

function createObject(names) {
  const base = {};
  let obj = base;
  for (let i = 0; i < names.length; i++) {
    obj[names[i]] = {};
    base; // ?
    obj[names[i]]; // ?
    obj = obj[names[i]];
    obj; // ?
    base; // ?
  }

  return base;
}

function createObject2(names) {
  let base = {};
  for (let i = 0; i < names.length; i++) {
    base[names[i]] = {};
    base = base[names[i]];
    base; // ?
  }

  return base;
}

console.log(createObject(['a', 'b', 'c'])); // {a: { b: c: {}}}
console.log(createObject2(['a', 'b', 'c'])); // {a: { b: c: {}}}

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

// figuring out how to use promises with ramda


const composeWhileNotNil = R.composeWith((f, res) => (R.isNil(res) ? res : f(res)));

composeWhileNotNil([R.inc, R.prop('age')])({ age: 1 }); // ?
composeWhileNotNil([R.inc, R.prop('age')])({}); // ?

const resolvingPromise = new Promise(
  (resolve, reject) => {
    setTimeout(() => {
      resolve('resolved!');
    }, 50);
  },
);

const rejectingPromise = new Promise(
  (resolve, reject) => {
    setTimeout(() => {
      reject('rejected!');
    }, 0);
  },
);

resolvingPromise.then(U.log('resolvingPromise test:'));
rejectingPromise.then(U.log('rejectingPromise test:'), U.log('rejectingPromise test:'));

const db = {
  users: {
    JOE: {
      name: 'Joe',
      followers: ['STEVE', 'SUZY'],
    },
  },
};

// We'll pretend to do a db lookup which returns a promise
const lookupUser = userId => Promise.resolve(db.users[userId]);
const lookupFollowers = user => Promise.resolve(user.followers);
lookupUser('JOE').then(lookupFollowers); // ?

// NOTE: your version of composeP should take functions that return promises

// a helper function:
const invokeThen = R.invoker(1, 'then');
invokeThen(lookupFollowers, lookupUser('JOE')); // ?

// this version uses invokeThen
const composeP2 = R.composeWith(
  invokeThen,
);

const followersForUserOld = R.composeP(lookupFollowers, lookupUser);
followersForUserOld('JOE').then(U.log('(OLD) Followers:')); // ?

// const followersForUserNew = U.composeP(lookupFollowers, lookupUser);
// followersForUserNew('JOE').then(followers => console.log('(NEW composeP) Followers:', followers)); // ?

const followersForUserNew2 = composeP2(lookupFollowers, lookupUser); // ?
followersForUserNew2('JOE').then(followers => console.log('(NEW composeP2) Followers:', followers)); // ?

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */
