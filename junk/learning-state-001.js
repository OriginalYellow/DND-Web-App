const R = require('ramda');
const S = require ('sanctuary');
const State = require('crocks/State');
const Pair = require('crocks/Pair');

const { get, modify } = State;


// "GET" HELPER METHOD
  
// the "get" method will actually overwrite the current resultant with the state
// (it will "echo" the state in the resultant):
get()
  .runWith('fug'); // ?

// optionally you can pass it an argument to transform the state before echoing
// it in the resultant:
get(R.toUpper)
  .runWith('fug'); // ?


// USES FOR THE STATE MONAD:

// "There are many uses for it. You can reach for it when you need to combine
// computations that update or read from some shared state. Think of things like
// Redux application state or a pure random number generator, or all functions
// that work on some record type in a database."

// "When you see that a family of functions (reducers, rng seed, or user records
// from a database) that need to update or modify a shared state, you typically
// need to hold that state internally or provide it as a global in a file some
// where."

// "In the case of working on say a User record, you may have MANY operations
// that read from that record type or modify it in some way (changePassword,
// validatePassword, updateName, getEmail, etc). most of these functions either
// work on a shared copy or have to pass user around if you are taking a more
// functional approach. In these functions there tends to be a lot of
// destructuring off of the recordType to read from that "state",
// "restructuring"/merging to update that "state". This can appear all over
// related functions."

// "So what State can provide is a means to abstract away all of that state
// management into a simple pattern that lets your functions just focus on the
// computation part and not the management. Turns functions like updateName ::
// String -> User -> User to only care about the context and not the state, it
// then becomes updateName :: String -> State User ()."


// USING MAP AND CHAIN WITH PAIR

// when you use map on a pair, it will only let you map over the second value

// when you use chain on a pair, the function you give it should return a pair -
// the secret monad sauce will then concat the first value in the pair with the
// first value in the original pair

S.chain (
          n => S.Pair (n) (Math.sqrt (n))
        )
        (S.Pair ('abc') (256)) // ?

// you can use "bimap" to map over both values in the pair at the same time:

S.bimap (S.toUpper) (Math.sqrt) (S.Pair ('foo') (64)); // ?


// LENSES AND STATE:

// source:
// https://github.com/fpinscala/fpinscala/wiki/Chapter-6:-Purely-functional-state
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


// MISC:

const add = x => modify(y => x + y);

const multiply = x => modify(y => x * y);

add(10)
  .map(() => 5)
  .runWith(10); // ?

var Const = function(x) {
  return {value: x, 'fantasy-land/map': function() { return this; }};
};

Const(5)["fantasy-land/map"](); // ?