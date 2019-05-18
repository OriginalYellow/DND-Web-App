const S = require('sanctuary');
const R = require('ramda');

// FIGURING OUT HOW TO SET PROPERTIES SAFELY

// example copied from
// https://stackoverflow.com/questions/53626940/set-property-when-value-is-just

let person = {name: 'Franz'}
const address1 = S.Just('some address');
const address2 = S.Nothing;

// person will be Nothing if address is Nothing 
person = S.map(R.assoc('address', R.__, person))(address1); // ?
person = S.map(R.assoc('address', R.__, person))(address2); // ?

// from the answer: "[avoid] null, undefined, and optional record fields as
// these are all sources of bugs."

// you could define all possible properties on the original object as Nothings:
const person2 = {name: 'Franz', address: S.Nothing};
const person2null = null;

const person2$ = R.assoc ('address') (address1) (person2); // ?
const person2$$ = R.assoc ('address') (address2) (person2); // ?
// this doesn't seem to properly address person being null.
const person2$$$ = R.assoc ('address') (address2) (person2null); // ?

// if you don't want to define the properties in advance (not reccomended - see
// above note), use the S.maybe function to only perform the assoc operation if
// the new value is a Just:
const person3 = {name: 'Franz'};
const person3null = null;

const person3$ = S.maybe (person3)
                           (address => R.assoc('address') (address) (person3))
                           (address1); // ?
const person3$$ = S.maybe (person3)
                            (address => R.assoc('address') (address) (person3))
                            (address2); // ?
// this doesn't seem to properly address person being null.
const person3$$$ = S.maybe (person3)
                             (address => R.assoc('address') (address) (person3null))
                             (address2); // ?