import * as R from 'ramda';
// import * as RA from 'ramda-adjunct';

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

enumToCamelCase2('COOL_FUCKING_ENUM'); // ?
