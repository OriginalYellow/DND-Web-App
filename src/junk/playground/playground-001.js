/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-properties */
/* eslint-disable no-unused-vars */
// const R = require('Ramda');
// import { forEach } from 'ramda';

import * as R from 'ramda';

export const isNotNil = R.compose(R.not, R.isNil);

isNotNil(32);// ?

isNotNil(false);// ?

export const whereDeep = R.curry((spec, obj) => {
  if (typeof obj === 'undefined') {
    if (spec === null || typeof spec === 'boolean') {
      return !spec;
    }
    return false;
  } if (spec === false) {
    return false;
  }
  let output = true;
  R.forEachObjIndexed((v, k) => {
    if (v === null || typeof v === 'boolean' || R.keys(v).length) {
      if (!whereDeep(v, obj[k])) {
        output = false;
      }
    } else if (!v(obj[k])) {
      output = false;
    }
  }, spec);
  return output;
});

const data1 = {
  a: {
    h: [
      { i: 5 },
      [
        { j: 6, k: 7 },
        { j: 8, k: 'nine' },
      ],
      10,
      { l: { m: { n: false } } },
    ],
  },
};

// Using `R.where`
const detect1 = R.where({
  a: R.where({
    h: R.where([
      R.always(true),
      Array.isArray,
      R.complement(R.identical(undefined)),
      R.where({ l: R.where({ m: R.where({ n: R.complement(R.identical(undefined)) }) }) }),
    ]),
  }),
});

const detect2 = whereDeep({
  a: {
    h: [
      isNotNil,
      Array.isArray,
      // R.complement(R.identical(undefined)),
      isNotNil,
      { l: { m: { n: R.anyPass([isNotNil]) } } },
    ],
  },
});

const detect3 = whereDeep({
  a: {
    h: [
      true,
      Array.isArray,
      true,
      { l: { m: { n: true } } },
    ],
  },
});

detect1(data1); // ?
detect2(data1); // ?

R.allPass([R.has('name'), R.has('icon')])({ name: 3, icon: 3, thingy: 4 }); // ?

R.allPass([
  R.has('name'),
  R.has('icon'),
  R.compose(
    R.is(String),
    R.prop('name'),
  ),
  R.compose(
    R.is(String),
    R.prop('icon'),
  ),
])({ name: 'sheet', icon: {}, thingy: '32323dfd' }); // ?

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

// NOTE: good explaination of how the transformation function on useWith works:

R.useWith(Math.pow, [R.identity, R.identity])(3, 4); // ?

R.useWith(Math.pow, [R.dec, R.inc])(3, 4); // ?

Math.pow(R.dec(3), R.inc(4)); // ?

Math.pow(2, 4); // ?

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

R.aperture(2, [1, 2, 3, 4, 5]); // ?

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

// NOTE: practice from http://simplectic.com/blog/2015/ramda-transducers-logs/

const isGet = R.test(/GET \//);
const notStatic = R.complement(R.test(/GET \/static/));
const isPage = R.allPass([isGet, notStatic]);

const thing = R.filter(isPage, [
  '127.0.0.1 - - [26/Feb/2015 19:25:25] "GET /static/r.js HTTP/1.1"',
  '127.0.0.5 - - [26/Feb/2015 19:27:35] "GET /blog/ HTTP/1.1" 200 -',
  '127.0.0.1 - - [28/Feb/2015 16:44:03] "GET / HTTP/1.1" 200 -',
  '127.0.0.1 - - [28/Feb/2015 16:44:03] "POST / HTTP/1.1" 200 -']); // ?

const splitLine = R.pipe(
  R.match(/^(\S+).+"([^"]+)"/),
  R.tail,
);

const splitLine2 = R.pipe(
  R.match(/^(\S+).+"([^"]+)"/),
  // R.tail,
);

R.map(splitLine, thing); // ?

R.map(splitLine2, thing); // ?

const toURL = R.pipe(
  R.split(' '),
  R.slice(1, 2),
  R.prepend('http://simplectic.com'),
  R.join(''),
);

R.map(toURL, [
  'GET /blog/ HTTP/1.1',
  'GET / HTTP/1.1']); // ?

// var valueLens = R.lensIndex(1)
const valueLens = R.lens(
  // (entry) => entry[1]
  R.last,
  // (value, entry) => [entry[0], value]
  R.flip(R.useWith(Array, R.head)),
);

R.has('map', valueLens); // ?

// const valueToUrl = valueLens.map(toURL);
const valueToUrl = R.map(toURL);

R.map(valueToUrl, [
  ['127.0.0.5', 'GET /blog/ HTTP/1.1'],
  ['127.0.0.1', 'GET / HTTP/1.1']]); // ?

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

const xLens = R.lens(R.prop('x'), R.assoc('x'));

const obj1 = { x: 1, y: 2 };
const obj2 = { x: 1, y: 2 };
const obj3 = { x: 1, y: 2 };

R.view(xLens, obj1); // ?
obj1; // ?
R.set(xLens, 4, obj2); // ?
obj2; // ?
R.over(xLens, R.negate, obj3); // ?
obj3; // ?

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */
