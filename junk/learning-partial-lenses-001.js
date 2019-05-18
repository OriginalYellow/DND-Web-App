const L = require('partial.lenses');
const R = require('ramda');

// test data for notes:
const sampleTitles = {
  titles: [{language: 'en', text: 'Title'}, {language: 'sv', text: 'Rubrik'}, {language: 'fr', text: 'Some French Book'}]
}


// I WAS WRONG ABOUT L.SET!
// - turns out, if a lense focuses on a single value, even if that value is the
//   result of a fold, the setter will in fact take a new value which must be
//   the same type as the fold result
// - this is pretty cool actually as IT LETS YOU TRANSFORM A STRUCTURE INTO THE
//   SAME FORM IT WOULD HAVE TO HAVE BEEN IN FOR THE LENS TO HAVE GIVEN YOU THAT
//   RESULT!
// - good example that explains this:
const sampleFlags = ['id-19', 'id-76']

const flag = id => [
  L.normalize(R.sortBy(R.identity)),
  L.find(R.equals(id)),
  L.is(id)
]

// yep makes sense...
L.get(flag('id-69'), sampleFlags)
// false

// ok keep going...
L.get(flag('id-76'), sampleFlags)
// true

// what! crazy!
L.set(flag('id-69'), true, sampleFlags)
// ['id-19', 'id-69', 'id-76']

// madness!
L.set(flag('id-76'), false, sampleFlags)
// ['id-19']


// THE DIFFERENCE BETWEEN LENSES AND OTHER STUFF (the above section may
// invalidate some of the assumptions made here):
// - some lenses appear to do the same thing as other functions in this library
//   (namely transforms).
// - to visualize the subtle distinction better, think of lenses as
//   representing:
// 1. the start and termination point of a traversal, defined by its optic
// 2. the case where the lense is the last in a composition that returns a value
//    (it's used with L.get, etc). this fact is key to understanding why calling
//    L.get on certain lenses will be identical to calling L.transform on
//    certain transforms - they both return a resultant (resultant as in the
//    resultant value in a state monad)


// HOW TO DEAL WITH MISSING DATA:
// - "Some libraries implement special Maybe types, but the benefits do not seem
//   worth the trouble nor the disadvantages in this context. The main
//   disadvantage is that wrapping values with Just objects introduces a
//   significant performance overhead due to extra allocations, because
//   operations with optics do not otherwise necessarily require large numbers
//   of allocations and can be made highly efficient. Also, a Maybe monad is not
//   necessary for optics. A monoid is sufficient for optics based on
//   applicatives, because applicatives do not have a join operation and are not
//   nested like monads."
// - the above seems to say that partial.lenses uses "undefined" to represent
//   missing data
// - the above quote seems to say that wrapping undefined in a maybe could
//   easily result in a big performance hit, so dont do it


// VALIDATION:
// - use this library made by the partial.lenses guy:
//   https://github.com/calmm-js/partial.lenses.validation
// - one caveat to note is that there is no built-in way to do "incremental
//   checking" and if you perform the function to often and it's too expensive,
//   it can be a big performance hit:
// 1. "The current implementation does not operate incrementally. Every time
//    e.g. V.validate is called, everything is recomputed. This can become a
//    performance issue particularly in an interactive setting where small
//    incremental changes to a data structure are being validated in response to
//    user actions. It should be possible to implement caching so that on
//    repeated calls only changes would be recomputed. This is left for future
//    work."


// REMOVING DATA:
// - "The key to having the whole object vanish, rather than just the text
//   property, is the L.removable('text') part of our lens composition. It makes
//   it so that when the text property is set to undefined, the result will be
//   undefined rather than merely an object without the text property."


// NAMING/ORGANIZING LENSES:
// - you should name lenses in a way where mirror the data structure:

const Title = {
  text: [L.removable('text'), 'text']
}

const Titles = {
  titleIn: language => [
    L.find(R.whereEq({language})),
    L.valueOr({language, text: ''})
  ]
}

const Model = {
  titles: ['titles', L.normalize(R.sortBy(L.get('language')))],
  textIn: language => [Model.titles, Titles.titleIn(language), Title.text]
}

// MIKE: refer to the above code when organizing your lenses - lots of great
// ideas in here

// NOTE: refer to it!!!


// BASIC TRAVERSALS + EXAMPLES:

const texts = [Model.titles, L.elems, Title.text];
// "What makes the above a traversal is the L.elems part. The result of
// composing a traversal with a lens is a traversal." (the other items are
// lenses) 

// right way to use the L.elems traversal:
L.collect(texts, sampleTitles); 

// wrong way (it defaults to the first element in the array because get can only
// return a single value):
L.get(texts, sampleTitles); 

// NOTE: L.collect and L.collectTotal are subtly different in that L.collect
// ignores undefined elements and L.collectTotal includes them

// you can do random stuff with the array to transform it, like find the maximum
// (L.maximumBy), and obviously you can map over it with the equivalent of over
// (L.modify):

L.maximumBy(R.length, texts, sampleTitles); 

// instead of using L.elems, you can use something like L.when to filter the
// array:

L.remove([texts, L.when(t => t.length > 5)], sampleTitles); 


// L.LEAFS:
// - you can use the L.leafs to quickly get all the non-object and non-array
//   values in a structure:

// it grabs them from everywhere regardless of nesting structure:
L.collect(L.leafs, [{x: 1, y: [2]}, 3]); 

// if you had something like this with a shitload of named values you might want to use leafs:

const leafsData = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
};

L.collect(L.leafs, leafsData); 


// L.foldTraversalLens:
// - use to create a focus of multiple values that should be interpreted as a
//   "single value" - meaning that getting should return a single (folded) value
//   and setting should set all values:

// 1
L.get(L.foldTraversalLens(L.minimum, L.elems), [3, 1, 4]);
// [ 2, 2, 2 ]
L.set(L.foldTraversalLens(L.minimum, L.elems), 2, [3, 1, 4])


// ENFORCING INVARIANTS:
// - use L.required to prevent missing values from being simply omitted from the
//   result:
// - for example, an empty object may not be what you want here:
L.remove(['item'], {item: 1})
// - this way, you can make sure the result maintains some structure you need:
L.remove(['item', L.required(null)], {item: 1}); // ?


// QUERY:
// - L.query can be used to make a lense that searches a structure for values
//   matching a condition (the condition can be a predicate but you can use
//   other shorthand ways to create the equivalent of predicates - see docs)
// - since it will search the entire structure, its much more expensive than
//   other more "focused" lenses (pretty much all of the other lenses fit this
//   bill)

L.collect(L.query('text'), sampleTitles); // ?
L.collect(L.query(L.when(R.propEq('language', 'fr')), 'text'), sampleTitles); // ?

// MONGODB QUERYING VS PARTIAL.LENSES QUERYING:
// - if you are doing a query over a large structure, thats what db query
//   languages are for and you should use that instead


// L.BRANCH:
// - VERY useful for when you want to create a traversal that focus multiple
//   values with completely different traversal paths for each
// - uses a specification object to specify the multiple traversal paths

L.collect(L.branch(
  {
    first: L.elems,
    second: {value: []}
  }),
  {
    first: ['x'],
    second: {value: 'y'}
}); // ?

// sort of contrived but shows how you might want to compose branch with another
// traversal:
L.modify(
  [
    L.pick({z: 2, x: 0}),
    L.branch({x: [], z: []})
  ],
  R.negate,
  [1, 2, 3],
); // ?

// NOTE: you can use L.branchOr if you want to specify a "backup traversal" for
// empty results

// NOTE: you can use L.branches as shorthand if the different paths are all
// properties on the same object MIKE: maybe revisit L.branches later because im
// not sure what its use would be if there is some pick equivalent for
// lenses...maybe its slightly different somehow


// L.CHILDREN
// - is a traversal that seems pretty basic and you'll probably use it a lot, so
//   im just writing a little note so i dont forget about it
// - it's pretty simple:
L.modify(L.children, R.negate, {x: 3, y: 1}); // ?


// L.ENTRIES, L.KEYS
// - another basic traversal that traverses an object and gives you back some
//   nice pair ADT's (not really but they could be easily converted)
// - L.keys is similar and does what you'd expect

L.modify(L.entries, ([k, v]) => [v, k], {x: 'a', y: 'b'});
// { a: 'x', b: 'y' }

// hey, look! it's RA.renameKeys but more customizable!
L.modify(L.keys, R.toUpper, {x: 1, y: 2})
// { X: 1, Y: 2 }


// L.keysEverywhere:
// - traveral that focuses all keys in a nested structure
// - could be useful, for example, if you need change some naming convention for
//   all the keys in a nested structure


// L.FLATTEN
// - another basic one, flattens structures in the way you'd expect, 'nuff said


// GETTING AN INDEX:
// - see https://github.com/calmm-js/partial.lenses#---on-indexing for more
//   detail than i give here
// - basically, any traversal/lens that can take a transformation function (sooo
//   probably every lens and traversal) can pass the index of the result as the
//   second arguement to the function
// - so you can do this to get it:
L.get(
  [L.find(R.equals('bar')), (value, index) => ({value, index})],
  ['foo', 'bar', 'baz']
) // {value: 'bar', index: 1}
// - or something like this:
L.modify(L.values, (value, key) => ({key, value}), {x: 1, y: 2})
// {x: {key: 'x', value: 1}, y: {key: 'y', value: 2}}


// L.TRAVERSE
// - i think the gist of this is that you want to call it with an optic to
//   create a function that performs the traversal
// - the example (see traverse definition in docs) shows how you can use it as
//   the mapping function in a state monad
// - this is pretty cool since it lets you reuse traversals as mapping functions
//   in other places (that are not a lens)


// ISOMORPHISMS:
// - i think that these are basically just traversals which change the focus to
//   X when you set, and then are able to reliably reverse that change when you
//   get (the codomain can be mapped to the domain and vice versa)
// - any time you need a traversal that has is reversable in a specialized way,
//   check if there is an isomorphism for it

// L.INVERSE
// - this lets you get the reverse of an isomorphism, so you can turn L.add into
//   L.subtract - pretty cool!


// TRANSFORMS:
// - transforms are an optic that modify their data structure in a way that
//   breaks the "passive bi-directionality" of all (most?) other kinds of optics
// - i think the difference between a transform and a fold (they may appear to
//   be the same kind of thing according to the above) is that, since it is a
//   lens, a fold is ignored when setting (it's set method is overriden) and a
//   transform is not ignored
// - given the above, use L.transform instead of L.modify
// - given the above, i dont think it makes sense to use L.set on a transform
// - there are transform ops that are basically equivalent to certain lenses,
//   which illustrates the similarity explained above

// NOTE: i have now confirmed that IF YOU USE A TRANFORM OPTIC AS A TRAVERAL AND
// NOT WITH L.TRANSFORM IT WILL RETURN AN EMPTY VALUE (i dont think this is true
// for all of them just most)


// L.TRANSFORM:
// - "L.transform(o, s) is shorthand for L.modify(o, x => x, s) and is intended
//   for running transforms defined using transform ops."

L.transform([L.elems, L.modifyOp(x => -x)], [1, 2, 3]);
// [-1, -2, -3]


// L.modifyAsync
// - like modify, but you cna use a mapping function that returns a promise!

L.modifyAsync(['elems', L.elems, 'x'], async x => x - 1, {
  elems: [{x: 1, y: 2}, {x: 3, y: 4}]
});
// Promise { elems: [ { x: 0, y: 2 }, { x: 2, y: 4 } ] }


// L.transformAsync
// - just the transform version of L.modifyAsync (remember that a result of a
//   given transform can be identical to calling L.modify with a certain lens)


// LOOPING WITH LENSES!? (L.LAZY):
// - apparently u can use the L.lazy "combinator" to do loops huhwhat?
// - its only arguement is a function that takes an optic and returns an optic
// - (i think) it is able to recurse because the return value of that argument
//   will be passed the same function
// - the above means that if the return value is a function (and it will be
//   because i think all optics are functions that can take a mapping function),
//   you'll recurse, and if it isn't a function then the recursion will
//   terminate (the below example terminates when L.optional results in an empty
//   value)

const primitives = L.lazy(rec =>
  L.ifElse(R.is(Object), [L.children, rec], L.optional)
)

L.collect(
  primitives,
  [
    [[1], 2],
    {y: 3},
    [{l: 4, r: [5]}, {x: 6}]
  ]
);
// [ 1, 2, 3, 4, 5, 6 ]


// ADAPTING COMBINATORS VS QUERYING COMBINATORS:
// - the combinators listed under "Querying" differ somewhat from those listed
//   under "Adapting"
// - but the main distinction is that equivalent querying combinators will
//   default "to an empty or read-only zero"


// FUN FACT: L.get is techncially a "fold over traversal"


// INSERTERS (lenses):
// - inserters build "write-only" lenses (so they are basically the same as
//   transforms if used in the same way)
// - the "Inserters" section has a small collection of useful, basic
//   "write-only" lenses, so refer to this when you start creating your one-way
//   transforms on the character sheet for some useful basic stuff


// L.PROPS
// - very simple lens but very useful
// - i say its very useful because it lets you seamlessly shave off the
//   uncessary properties of an object that might have a bunch of shit u dont
//   care about...yeah its basically the same as the equivalent ramda function

// L.propsExcept
// - nice compliment lense to L.props, does what you'd expect


// SETTING "DEPENDENT" PROPERTIES:
// - you can use this technique (see below example) to compute one property from
//   another property that is being set
// - NOTE: using "rewrite" will make it so that the passed mapper is skipped
//   when reading and only called when writing

const maximum = [
  L.props('maximum', 'initial'),
  L.rewrite(props => {
    const {maximum, initial} = props
    if (maximum < initial) return {maximum, initial: maximum}
    else return props
  }),
  'maximum'
]

L.set(
  maximum, 
  5, 
  {
    maximum: 10, initial: 8, something: 'else'
  }
); // ?

L.get(
  maximum, 
  {
    maximum: 4, initial: 8, something: 'else'
  }
); // ?