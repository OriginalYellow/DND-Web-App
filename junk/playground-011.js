const S = require('sanctuary');
const R = require('ramda');

// FUNCTIONAL PROGRAMMING NOTES:


// CHAIN/FLATMAP/BIND VS MAP: 
// both chain(flatmap) and map operate on values that are wrapped in a
// "container". The difference is that chain perserves the original hierarchy of
// containers - if the value you give it is only wrapped in one container then
// the return value is as well. Map will wrap the result in a new container so
// if the result is in a container it will wrap it and create two levels of
// containers. Source: https://stackoverflow.com/a/49863741 (this is not exactly
// right - see articles on monads specifically)


// EXAMPLES OF CHAIN VS MAP:
// S.head results in a value with the same type as the first list value and so
// lifts it out of its list, and chain doesn't try to re-wrap anything so the
// result is exactly what you'd expect.
S.chain (S.head) (S.Just (['foo', 'bar', 'baz'])) // ?

// S.head does the same thing as before, but map rewraps the result in a new
// container with the same type as the top-level container. 
S.map (S.head) (S.Just (['foo', 'bar', 'baz'])) // ?


// AP(APPLY):
// apply lets you put a function inside a container and call it with a value
// wrapped in a container


// USING APPLY WITH MAP: 
// the map call results in a list of partial functions, and so apply will apply
// each function to each value resulting in an array with length = 3 * 3. A list
// (or any other applicative container) of functions is called an "applicative
// functor"
S.ap (S.map (S.add) ([1,2,3])) ([4,5,6])

// if any lists are empty this is stil safe and you just get an empty list:
S.ap (S.map (S.add) ([])) ([4,5,6])
S.ap (S.map (S.add) ([1,2,3])) ([])

// the above is equivalent to this:
S.ap (S.ap ([S.add]) ([1, 2, 3])) ([4, 5, 6])

// it works for any container:
S.ap (S.map (S.add) (S.Just(2))) (S.Just(3))


// NOTES ON APPLICATIVE FUNCTORS AND HOW THEY RELATE TO MONADS:

// "One of the big aspects of applicative functor is that the effects play out
// before the lifted/upgraded function can do its thing. Applicative functor is
// like the Ronco — set it and forget it — showtime rotisserie 🍗 of functional
// programming patterns. Once we’ve kicked off the process, we can only wait for
// the end result."

// To clarify the above quote: if there are any special conditions (an empty
// list or maybe for example) then the function wrapped in the container is
// never actually called.

// "It’s been said that applicative functor is batch versus interactive
// processing as is the case with monads."

// "Without running the applicative functor, you can determine the resulting
// shape just by looking at the shape of the effects given. Given an empty list?
// You’re going to get an empty list. Given [1,2] and [3,4,5]? You’re going to
// get back a list with six items. With monads it’s different. They can change
// the shape because they can look at the intermediate results and decide what
// to do next."

// "Applicative functor picks up where functor leaves off. Functor
// lifts/upgrades a function making it capable of operating on a single effect.
// Applicative functor allows the sequencing of multiple independent effects."

// "Applicative functor only deals with independent effects. If you have a
// dependent effect, you’ll need monads."


// JOIN:

// join just removes one level of nesting from a container, but its the way that
// monads are able to effect the "shape of the data":

S.join (S.Just (S.Just (1)))
S.join ([[1], [2], [3]])
S.join ([[[1, 2, 3]]])


// SEQUENCE VS TRAVERSE:

// Sequence will flip a traversable (like an array, monad, or strMap [object
// with all the same type values]) with an applicative (like a monad or array)
// or multiple applicatives in it so that the applicative contains the
// traversable, and the values contained in the applicative(s) are left in place

// Traverse will apply a function to a traversable and then wrap the result in
// an applicative


// LIFT:

// this is very useful for turning functions that operate on values to those
// that operate on applicatives

S.lift2 (S.add) (S.Just (2)) (S.Just (3)); // ?





// ENCASE:
// you can use this to wrap stuff that can return an error (either) or "empty"
// value (maybe) - very useful

// Definition of encaseEither: "Takes two unary functions, f and g, the second
// of which may throw, and a value x of any type. Applies g to x inside a try
// block. If an exception is caught, the return value is a Left containing the
// result of applying f to the caught Error object; otherwise the return value
// is a Right containing the result of applying g to x."

S.encaseEither (S.I) (JSON.parse) ('["foo","bar","baz"]'); // ?
S.encaseEither (S.I) (JSON.parse) ('['); // ?
S.encaseEither (S.prop ('message')) (JSON.parse) ('['); // ?

// Definition of encase: "Takes a unary function f which may throw and a value x
// of any type, and applies f to x inside a try block. If an exception is
// caught, the return value is Nothing; otherwise the return value is Just the
// result of applying f to x."

S.encase (JSON.parse) ('["foo", "bar", "baz"]'); // ?
S.encase (JSON.parse) ('['); // ?


// STRING MAP

// "StrMap is an abbreviation of string map. A string map is an object, such as
// {foo: 1, bar: 2, baz: 3}, whose values are all members of the same type.
// Formally, a value is a member of type StrMap a if its type identifier is
// 'Object' and the values of its enumerable own properties are all members of
// type a."

// this seems useful when working with the Pair type because S.pairs will
// take a string map and return an array of "pairs". S.fromPairs is similar:

S.pairs ({b: 2, a: 1, c: 3}) // ?
S.fromPairs ([S.Pair ('a') (1), S.Pair ('b') (2), S.Pair ('c') (3)]) // ?


// LEARNING PIPE + MONADS:

S.pipeK ([S.tail, S.tail, S.head]) (S.Just ([1, 2, 3, 4])); // ?

S.justs ([S.Just ('foo'), S.Nothing, S.Just ('baz')]);

S.fromEither (0) (S.Left (42))









// MISC LEARNING:

const nothing = S.Maybe.Nothing;

const maybe = S.Maybe.Just(32);

const just = S.Maybe.Just(32);
S.type(just);

S.empty(S.Maybe);

S.of(S.Maybe)(42);

S.filter(S.lte(S.Nothing))([S.Nothing, S.Just(0), S.Just(1), S.Just(2)]);

R.filter(
  S.lte(S.Nothing),
  [S.Nothing, S.Just(0), S.Just(1), S.Just(2)],
);

S.concat(S.Just([1, 2, 3])) (S.Just([4, 5, 6]));

S.filter 
(S.lte (S.Maybe.Nothing)) 
([S.Maybe.Nothing, S.Just (0), S.Just (1), S.Just (2)]);

S.map (Math.sqrt) (S.Nothing)
S.map (Math.sqrt) (S.Just (2))
S.ap (S.Just (Math.sqrt)) (S.Just (2))

S.chain (S.head) (S.Just ([]))


S.reduce (S.concat) ('abc') (S.Maybe.Nothing)
S.reduce (S.concat) ('abc') (S.Just('xyz'))

S.traverse (Array) (S.words) (S.Just ('foo bar baz'))

S.unfoldr (n => n < 1000 ? S.Just (S.Pair (n) (2 * n)) : S.Nothing) (1); // ?