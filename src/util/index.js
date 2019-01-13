import * as R from 'ramda';

export const logMessage = R.uncurryN(2, message => R.tap(x => console.log(`${message} ${x}`)));

export const log = R.tap(x => console.log(x));

// MIKE: i am not sure if this works as intended
export const then = R.invoker(1, 'then');

// MIKE: pretty sure this doesn't work
export const composeP = R.composeWith(then);

export default {
  logMessage,
  log,
  composeP,
  then,
};
