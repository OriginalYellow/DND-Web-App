import {
  has, map, compose, not, any, equals, reduced, curry, reduce,
} from 'ramda';

export const hasAll = curry((keys, obj) => reduce(
  (_, item) => (has(item, obj) ? true : reduced(false)),
  false,
  keys,
));

export const arrayHasAll = props => compose(
  not,
  any(equals(false)),
  map(hasAll(props)),
);

export default {
  hasAll,
  arrayHasAll,
};
