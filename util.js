// MIKE: eventually turn this into a package so you can reuse it in client and server

const R = require('ramda');

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

const snakeToTitleCase = R.pipe(
  R.replace(/([A-Z])/g, ' $1'),
  R.trim,
  transformFirstLetter(R.toUpper),
);

const camelToEnumCase = R.pipe(
  R.replace(/([A-Z])/g, R.concat('_')),
  R.toUpper,
);

module.exports = {
  transformFirstLetter,
  screamingToCamelCase,
  snakeToTitleCase,
  camelToEnumCase,
};
