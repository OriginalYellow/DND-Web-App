// MIKE: for the portfolio site - have the nav be a modal with some transition
// instead of the side menu

// MIKE: create new models ("User", "Campaign", etc., and rename the old models
// to have the postfix "collection" or something). Make the new models use
// getters and setters and then put the business logic in those.

// MIKE: you could expose these new objects like this:
// DB.user.findByID(34234)

// NOTE: you probably don't want to expose these objects outside of the DAL -
// hide these operations behind similarly-named methods (or more appropriate
// abstractions where necessary). If you still can't decide whether you should
// expose them or not, read more DDD aggregate root stuff to figure it out...
const UserRepo = () => ({
  findByID: id => null,
  findByName: name => null,
  current: () => null,
  playerCharacters: id => null,
  create: () => null,
  signin: () => null,
});

const PlayerCharacterRepo = () => ({
  findByID: id => null,
  create: () => null,
  createRandom: () => null,
  delete: id => null,
  // setAbilityScoreProficiency, etc etc.
});


// THINKING ABOUT HOW TO USE FP TO MAKE CHARACTER SHEET CHANGES BETTER:

// what invariants will i have to protect when making character sheet changes?

// if i model the character sheet as a state machine, what part of it is the
// state and what part can be evaluated?

// PLAN:
// - load the character sheet into memory
// - put it in the right side (state side) of a state monad
// - perform special state actions on it to modify it
// - possibly have an eval function to make any necessary changes to it before
//   replacing the old version in the database with the new version, but this
//   may not be necessary
// - possibly have an eval function(s) for formatting the data before sending to
//   client if necessary
// - use mongoose/mongodb's built-in validation for type checking

// MIKE: your state transitions could trigger more state transitions? sort of
// like how react works.