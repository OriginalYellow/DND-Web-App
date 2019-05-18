const S = require('sanctuary');
const R = require('ramda');

// USING MAYBE TO AVOID NULL CHECKS:

// copied the unsafe example from
// https://medium.freecodecamp.org/functional-programming-in-js-with-practical-examples-part-2-429d2e8ccc9e

const discount1 = {code: 1234};
const discount2 = {};
const discount3 = undefined;

const user1 = {discount: 4567};
const user2 = {};
const user3 = undefined;

// NOTE: "S" is an imported functional javascript library called "Sanctuary.js"

// "S.get" takes a property name and an object and then returns the value of the
// property on that object wrapped in a Maybe monad, which can either be a
// "Just" (it holds some value) or a "Nothing" (it's empty)
// might break other files???
// S.get = S.get (R.T);

S.get ('discount') (user1); // ?
S.get ('discount') (user2); // ?
S.get ('discount') (user3); // ?

// "unsafeGet" can't automatically deal with these null errors like S.get can
const unsafeGet = (prop, obj) => {
  return obj[prop];
}

unsafeGet('discount', user1); // ?
unsafeGet('discount', user2); // ?
// unsafeGet('discount', user3) // ? Cannot read property 'discount' of undefined

// NOTE: you should only use the Maybe monad if you don't want to throw an error

// some imperitive function (copied from the question linked above):
const applyDiscount = (user, discount) => {
  let userClone = {...user};// use some lib to make a copy  
  userClone.discount = discount.code;
  return userClone;
}

applyDiscount(user1, discount1); // ?
applyDiscount(user1, discount2); // ?
applyDiscount(user2, discount1); // ?
applyDiscount(user3, discount1); // ?
// applyDiscount(user3, discount3); // ? Cannot read property 'code' of undefined;

// NEW HOTNESS:

// this version can't properly handle user being null (it should return a
// nothing if it is)
const applyDiscount2 = (user, discount) => {
  const maybeDiscount = S.get ('code') (discount);
  // userClone.discount = discount.code;
  return R.assoc ('discount') (maybeDiscount) (user);
}

applyDiscount2(user1, discount1); // ?
applyDiscount2(user2, discount1); // ?
applyDiscount2(user3, discount1); // ?
applyDiscount2(user1, discount3); // ?
applyDiscount2(user3, discount3); // ?

// this version should handle user being null:
const applyDiscount3 = (user, discount) => {
  const maybeDiscount = S.get ('code') (discount);
  const maybeUser = S.toMaybe(user);
  
  return S.chain (S.pipe([R.assoc ('discount') (maybeDiscount), S.toMaybe]))
                 (maybeUser);
}

applyDiscount3(user1, discount1); // ?
applyDiscount3(user2, discount1); // ?
applyDiscount3(user3, discount1); // ?
applyDiscount3(user1, discount3); // ?
applyDiscount3(user3, discount3); // ?

// version with less local state:
const applyDiscount4 = (user, discount) => {
  const getDiscount = S.get ('code');

  const maybeSetDiscount = S.pipe ([
    R.assoc ('discount') (getDiscount (discount)),
    S.toMaybe
  ]);
  
  return S.chain (maybeSetDiscount) (S.toMaybe (user));
}

applyDiscount4(user1, discount1); // ?
applyDiscount4(user2, discount1); // ?
applyDiscount4(user3, discount1); // ?
applyDiscount4(user1, discount3); // ?
applyDiscount4(user3, discount3); // ?

// if i want to consider user being null to be an error, i could simply let it
// throw and then use encaseEither on the result. EDIT: instead i'm changing to
// function to just return an either
const applyDiscount5 = (user, discount) => {
  const getDiscount = S.get ('code');

  const maybeSetDiscount = S.pipe ([
    R.assoc ('discount') (getDiscount (discount)),
    S.toMaybe
  ]);
  
  const maybeUser$ = S.chain (maybeSetDiscount) (S.toMaybe (user));

  return S.maybeToEither ('user parameter must not be null') (maybeUser$);
}

applyDiscount5(user1, discount1); // ?
applyDiscount5(user2, discount1); // ?
applyDiscount5(user3, discount1); // ?
applyDiscount5(user1, discount3); // ?
applyDiscount5(user3, discount3); // ?

// instead of chain, im using map. Map unwraps and rewraps containers (instead of just
// unwrapping like chain does).
const applyDiscount6 = (user, discount) => {
  const getDiscount = S.get ('code');
  const unsafeSetDiscount = R.assoc ('discount') (getDiscount (discount));
  const maybeUserToEither = S.maybeToEither ('user parameter must not be null');

  return maybeUserToEither(
    S.map (unsafeSetDiscount) (S.toMaybe (user))
  );
}

applyDiscount6(user1, discount1); // ?
applyDiscount6(user2, discount1); // ?
applyDiscount6(user3, discount1); // ?
applyDiscount6(user1, discount3); // ?
applyDiscount6(user3, discount3); // ?

// MIKE: try and solve these remaining issues:
// - getDiscount is called even when user is null, you could try to make it more
//   effecient by exiting before this point - not sure if this is possible
//   without writing something declaritive at the top
// - you could use a pipe to make things shorter/more clearer

// better version with pipe:
const applyDiscount7 = (user, discount) => {
  const getDiscount = S.get ('code');
  const unsafeSetDiscount = R.assoc ('discount') (getDiscount (discount));
  const maybeUserToEither = S.maybeToEither ('user parameter must not be null');

  return S.pipe([
    S.toMaybe,
    S.map (unsafeSetDiscount),
    S.maybeToEither('user parameter must not be null')
  ])(user);
}

applyDiscount7(user1, discount1); // ?
applyDiscount7(user2, discount1); // ?
applyDiscount7(user3, discount1); // ?
applyDiscount7(user1, discount3); // ?
applyDiscount7(user3, discount3); // ?

// less variables (maybe makes it less readable?):
const applyDiscount8 = (user, discount) => {
  return S.pipe([
    S.toMaybe,
    S.map (R.assoc ('discount') (S.get ('code') (discount))),
    S.maybeToEither('user parameter must not be null')
  ])(user);
}

applyDiscount8(user1, discount1); // ?
applyDiscount8(user2, discount1); // ?
applyDiscount8(user3, discount1); // ?
applyDiscount8(user1, discount3); // ?
applyDiscount8(user3, discount3); // ?

// NOTE: if user is null, the function i passed to map will never be executed,
// so this code is also well optimized!

const getDiscount = S.get ('code');

const setDiscount = (discount) => R.assoc ('discount') (getDiscount(discount));

const applyDiscount9 = (user, discount) => {
  return S.pipe([
    S.toMaybe,
    S.map (setDiscount(discount)),
    S.maybeToEither('user parameter must not be null')
  ])(user);
};

applyDiscount9(user1, discount1); // ?
applyDiscount9(user2, discount1); // ?
applyDiscount9(user3, discount1); // ?
applyDiscount9(user1, discount3); // ?
applyDiscount9(user3, discount3); // ?
