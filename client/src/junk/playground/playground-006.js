/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-properties */
/* eslint-disable no-unused-vars */

import lensMap from 'ramda-lens-map';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import {
  Observable, interval, timer, Subject, generate,
} from 'rxjs';
import { take } from 'rxjs/operators';
import * as RA from 'ramda-adjunct';
import * as U from '../util';

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

// figuring out rxjs schedulers

// 4; // ?

// // NOTE: for some reason this breaks quokka
// const obs = generate(
//   0,
//   () => true,
//   x => x + 1,
//   x => x,
// ); // ?

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

// my attempt at making a sequence of fetches


// "API / rxjs/operators
// retry
// FUNCTION
// STABLE
// Returns an Observable that mirrors the source Observable with the exception
// of an error. If the source Observable calls error, this method will
// resubscribe to the source Observable for a maximum of count resubscriptions
// (given as a number parameter) rather than propagating the error call.
// source: https://rxjs-dev.firebaseapp.com/api/operators/retry"

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

// figuring out how im gonna project this stuff

const abby = {
  name: 'Abby', age: 7, hair: 'blond', grade: 2,
};
const fred = {
  name: 'Fred', age: 12, hair: 'brown', grade: 7,
};
const kids = [abby, fred];
R.project(['name', 'grade'], kids); // ?


RA.flattenPath(
  ['b1', 'b2'],
  { a: 1, b1: { b2: { c: 3, d: 4 } } },
); // ?

const isLowerCase = (val, key) => key.toLowerCase() === key;
RA.omitBy(isLowerCase, {
  a: 1, b: 2, A: 3, B: 4,
}); //= > {A: 3, B: 4}

const input = { firstName: 'Elisia', age: 22, type: 'human' };

RA.renameKeys({ firstName: 'name', type: 'kind', foo: 'bar' })(input);
//= > { name: 'Elisia', age: 22, kind: 'human' }

R.pick(['a', 'd'], {
  a: 1, b: 2, c: 3, d: 4,
}); //= > {a: 1, d: 4}
R.pick(['a', 'e', 'f'], {
  a: 1, b: 2, c: 3, d: 4,
}); //= > {a: 1}

const stats = [
  {
    id: 1,
    stat_type: {
      id: 1,
      longName: 'dexterity',
      shortName: 'ac',
    },
    val: 2,
  },
  {
    id: 2,
    stat_type: {
      id: 4,
      longName: 'dexterity',
      shortName: 'ac',
    },
    val: 43,
  },
  {
    id: 3,
    stat_type: {
      id: 3,
      longName: 'strength',
      shortName: 'str',
    },
    val: 11,
  },
];

// my first attempt:

const removeTypeID = R.evolve({
  stat_type: RA.omitBy(R.equals('id')),
});

const project = R.pipe(
  removeTypeID,
  RA.spreadProp('stat_type'),
  RA.renameKeys({ id: 'key' }),
);

R.map(project, stats); // ?

// copied from
// https://stackoverflow.com/questions/42697819/ramda-js-combine-two-array-of-objects-that-share-the-same-property-id

const todos = [
  {
    id: 1,
    name: 'customerReport',
    label: 'Report send to customer',
  },
  {
    id: 2,
    name: 'handover',
    label: 'Handover (in CRM)',
  },
];

const todosMoreDetails = [
  {
    id: 1,
    checked: false,
    link: {
      type: 'url',
      content: 'http://something.com',
    },
    notes: [],
  },
  {
    id: 2,
    checked: false,
    link: {
      type: 'url',
      content: 'http://something.com',
    },
    notes: [],
  },
];

const moreDetailsById = R.groupBy(R.prop('id'), todosMoreDetails); // ?

const finalTodos = R.map(todo => R.merge(todo, moreDetailsById[todo.id][0]), todos);

finalTodos; // ?

// copied from
// https://stackoverflow.com/questions/37597163/combine-two-arrays-with-two-different-keys-with-ramda

const array1 = [
  { _id: 0, x: 10 },
  { _id: 1, x: 30 },
];

const array2 = [
  { UUID: 0, y: 20 },
  { UUID: 1, y: 60 },
];

// my attempt:

R.zipWith(R.merge, array1, array2); // ?
