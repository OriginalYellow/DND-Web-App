const S = require('sanctuary');
const R = require('ramda');

// shitty, original version that throws errors and does random shit you don't want:
const applyDiscountImperative = (user, discount) => {
  let userClone = {...user};// use some lib to make a copy  
  userClone.discount = discount.code;
  return userClone;
}

// changing get to not pointlessly take that first parameter:
// might break other files???
// S.get = S.get (R.T);


// my beautiful functional version:

// NOTE: if user is null, the function i passed to map will never be executed,
// so this code is also well optimized!
const getDiscount = S.get ('code');

const setDiscount = (discount) => R.assoc ('discount') (getDiscount(discount));

const applyDiscountFunctional = (user, discount) => {
  return S.pipe([
    S.toMaybe,
    S.map (setDiscount(discount)),
    S.maybeToEither('user parameter must not be null')
  ])(user);
};

// test data:
const discount1 = {code: 1234};
const discount2 = {};
const discount3 = undefined;

const user1 = {discount: 4567};
const user2 = {};
const user3 = undefined;

// tests:
applyDiscountFunctional(user1, discount1); // Right ({"discount": Just (1234)}) 
applyDiscountFunctional(user2, discount1); // Right ({"discount": Just (1234)}) 
applyDiscountFunctional(user3, discount1); // Left ("user parameter must not be null") 
applyDiscountFunctional(user1, discount3); // Right ({"discount": Nothing}) 
applyDiscountFunctional(user3, discount3); // Left ("user parameter must not be null") 
applyDiscountFunctional(user1, discount2); // Right ({"discount": Nothing}) 

applyDiscountImperative(user1, discount1); // { discount: 1234 }
applyDiscountImperative(user2, discount1); // { discount: 1234 }
applyDiscountImperative(user3, discount1); // { discount: 1234 }
// applyDiscountImperative(user1, discount3); // Cannot read property 'code' of undefined
// applyDiscountImperative(user3, discount3); // Cannot read property 'code' of undefined
applyDiscountImperative(user1, discount2); // { discount: undefined } 