const RA = require('ramda-adjunct');
const R = require('ramda');
const S = require ('sanctuary');


// LENSES AND STATE:
// - source:
//   https://github.com/fpinscala/fpinscala/wiki/Chapter-6:-Purely-functional-state
// - if the input type for your state transition function (not including the
//   state) and the output type of your state evaluation function are the same
//   then:
// 1. the state transition function and a lense's "setter" are verrrrry similar
// 2. the state evaluation function and a lense's "getter" are verrrrry similar
// - i may be wrong but i think this explains that lenses are like a specialized
//   version of a state monad
// - a lens can be converted to/interpreted as a state monad but the reverse
//   isn't true because "We cannot, however, turn a State action into a Lens,
//   for the same reason that we cannot convert a Moore machine into a Mealy
//   machine."

// you may need to use a "trampoline function" for long running state machines
// (source: linked above)
// - i think this is because state machines are basically (or literally?)
//   recursive functions 


// COMPOSING LENSES:
// - you can compose lenses because a lens is just a function that takes 2
//   parameters (see the ramda source code for detailed explanation)
// - the first parameter is very specific to building the "view", "set",
//   and "over" functions. passing the lens to each of these will pass in a
//   special function for performing that mapping)
// - when you call a composition of multiple lenses, you only pass each composed
//   lense its first parameter because a lense is a curried function. 


// PARTIAL LENSES LIBRARY:
// - to emulate virtual/readonly properties with getters: because traversals are
//   separate from lenses, you can choose to just make a getter function (using
//   L.get) with a traversal and never make a setter with it.





// TRYING OUT LENSES WITH DATA-RELATED MONADS:

// x => console.log(x) || x,

// const getThing = S.get(S.allPass([RA.isString]));
const getString = name => S.pipe([
  S.get(S.allPass([RA.isString])) (name),
  S.maybeToEither('get failed'),
]);

// invariants:
// - property must exist
// - val must be an object
// const setString = 

const coolLens = R.lens (getString ('name'), R.assoc ('name') ('bilbo'));

R.view(coolLens, {name: 'guy'}); // ?
R.view(coolLens, {}); // ?







// SCRATCH:

R.assoc('name') ('bilbo') ({}); // ?
