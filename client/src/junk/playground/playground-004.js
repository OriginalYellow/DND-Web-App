/* eslint-disable no-underscore-dangle */
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

// figuring out how to use promises with ramda

const composeWhileNotNil = R.composeWith((f, res) => (R.isNil(res) ? res : f(res)));

composeWhileNotNil([R.inc, R.prop('age')])({ age: 1 }); // *?
composeWhileNotNil([R.inc, R.prop('age')])({}); // *?

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

resolvingPromise.then(U.log('resolvingPrasdfdsfomise test:')); // ?
rejectingPromise.then(U.log('rejectingPromise test:'), U.log('rejectingPromise test:'));

const db = {
  users: {
    JOE: {
      name: 'Joe',
      followers: ['STEVE', 'SUZY'],
    },
    MIKE: {
      name: 'Mike',
      followers: ['MAX', 'SUZY', 'BILL'],
    },
  },
};

// We'll pretend to do a db lookup which returns a promise
const lookupUser = userId => Promise.resolve(db.users[userId]);
const lookupFollowers = user => Promise.resolve(user.followers);
lookupUser('JOE').then(lookupFollowers); // *?

// NOTE: your version of composeP should take functions that return promises

// a helper function:
const invokeThen = R.invoker(1, 'then');
invokeThen(lookupFollowers, lookupUser('JOE')); // *?

// my composeP:
const composeP = R.composeWith(
  (f, res) => res.then(f),
);

// this version uses invokeThen
const composeP2 = R.composeWith(
  invokeThen,
);

const followersForUserOld = R.composeP(lookupFollowers, lookupUser);
followersForUserOld('JOE'); // *?

const followersForUserNew = composeP([lookupFollowers, lookupUser]);
followersForUserNew('MIKE'); // *?

const followersForUserNew2 = composeP2([lookupFollowers, lookupUser]);
followersForUserNew('MIKE'); // *?

// Trying to add resolve/reject logic:

const lookupUser2 = userId => Promise.resolve(db.users[userId]);
const lookupFollowers2 = user => Promise.reject(new Error('error 1'));

const lookupUser3 = userId => Promise.reject(new Error('error 2'));
const lookupFollowers3 = user => Promise.resolve(user.followers);

const composeP3 = R.composeWith(
  (functionReturningPromise, resultPromise) => resultPromise.then(functionReturningPromise),
);

composeP3([lookupFollowers2, lookupUser2])('JOE'); // *?
composeP3([lookupFollowers3, lookupUser3])('JOE'); // *?
composeP([lookupFollowers2, lookupUser2])('JOE'); // *?
composeP([lookupFollowers3, lookupUser3])('JOE'); // *?

// trying out just using invokeThen so as to remove magic (composeP is kind of magic?)

const followersForUserNew3 = R.pipe(
  lookupUser,
  U.then(lookupFollowers),
  U.then(R.map(R.toLower)),
);

followersForUserNew3('JOE'); // ?

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

// figuring out R.bind

const log = R.bind(console.log, console);
// so i guess it will also call the first argument
R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({ a: 1 }); // *?

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

// figuring out R.cond

// NOTE: so this basically reads the same as a chain of if/else's (the last
// element is the else because of the R.T function always returning true)

const fn = R.cond([
  [
    R.equals(0),
    R.always('water freezes at 0°C'),
  ],
  [
    R.equals(100),
    R.always('water boils at 100°C'),
  ],
  [
    R.T,
    temp => `nothing special happens at ${temp}°C`,
  ],
]);

fn(0); //= > 'water freezes at 0°C'
fn(50); //= > 'nothing special happens at 50°C'
fn(100); //= > 'water boils at 100°C'

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

// figuring out R.when

// NOTE: so this the equivalent of a simple if statement

// truncate :: String -> String
const truncate = R.when(
  R.propSatisfies(R.gt(R.__, 10), 'length'),
  R.pipe(R.take(10), R.append('…'), R.join('')),
);

truncate('12345'); //= > '12345'
truncate('0123456789ABC'); //= > '0123456789…'

/**   .-.     .-.     .-.     .-.     .-.     .-.     .-.
 `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.'   `._.' */

// NOTE: R.THUNKIFY IS PRETTY COOOOOL

R.thunkify(R.identity)(42)(); //= > 42
R.thunkify((a, b) => a + b)(25, 17)(); //= > 42
