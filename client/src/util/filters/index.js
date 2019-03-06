
import * as R from 'ramda';
import * as RA from 'ramda-adjunct';

// NOTE: copied from https://stackoverflow.com/questions/40011725/point-free-style-capitalize-function-with-ramda

export const sentenceCase = R.pipe(
  R.juxt([
    R.pipe(
      R.head,
      R.toUpper,
    ),
    R.tail,
  ]),
  R.join(''),
);

export const allCaps = R.toUpper;

export const titleCase = R.pipe(
  R.split(' '),
  R.map(
    sentenceCase,
  ),
  R.join(' '),
);

const getSign = R.pipe(
  RA.sign,
  R.cond([
    [R.equals(-1), R.always('-')],
    [R.or(R.equals(0), R.equals(-1)), R.always('')],
    [R.equals(1), R.always('+')],
  ]),
);

// NOTE: takes num | string, returns string
export const addSign = R.pipe(
  R.juxt([
    getSign,
    Math.abs,
  ]),
  R.join(''),
);
