// MIKE: make function names lowercase

import {
  join,
  juxt,
  compose,
  toUpper,
  head,
  tail,
  map,
  split,
} from 'ramda';

// NOTE: copied from https://stackoverflow.com/questions/40011725/point-free-style-capitalize-function-with-ramda
export const sentenceCase = compose(
  join(''),
  juxt([
    compose(
      toUpper,
      head,
    ),
    tail,
  ]),
);

export const allCaps = toUpper;

export const titleCase = compose(
  join(' '),
  map(
    sentenceCase,
  ),
  split(' '),
);
