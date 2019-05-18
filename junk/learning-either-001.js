const S = require('sanctuary');
const R = require('ramda');

// EITHER:

// "Either Monad provides two constructors: 'Either.Left' and 'Either.Right'.
// Think of them as subclasses of Either. Both 'Left' and 'Right' are Monads!
// The idea is to store errors/exceptions in Left and useful values in Right."

// copied from
// https://medium.freecodecamp.org/functional-programming-in-js-with-practical-examples-part-1-87c2b0dbc276
const tax = R.curry((tax, price) => {
  if (!R.is (Number) (price)) return S.Left(new Error("Price must be numeric")); //<--Wrap Error in Either.Left

  return  S.Right(price + (tax * price)); //<--Wrap result in Either.Right
});

const discount = S.curry2((dis, price) => {
  if (!R.is (Number) (price)) return S.Left(new Error("Price must be numeric")); //<--Wrap Error in Either.Left

  if (price < 10) return S.Left(new Error("discount cant be applied for items priced below 10")); //<--Wrap Error in Either.Left

  return S.Right(price - (price * dis)); //<--Wrap result in Either.Right
});

const displayTotal = (total) => { console.log('Total Price: ' + total) };

const logError = (error) => { console.log('Error: ' + error.message); };

const eitherLogOrShow = S.either (logError) (displayTotal);

// eitherLogOrShow(S.Left(new Error("sheeet")));
// eitherLogOrShow(S.Right(100));

const addCaliTax = (tax(0.1));//10%

const apply25PercDisc = (discount(0.25));// 25% discount

apply25PercDisc(11) // ?

const getItemPrice = (item) => S.Right(item.price);

// original:
// const showTotalPrice = (item) => eitherLogOrShow(getItemPrice(item).chain(apply25PercDisc).chain(addCaliTax));
// with pipeK:
const showTotalPrice = (item) => S.pipeK([apply25PercDisc, addCaliTax])(getItemPrice(item));

let tShirt = { name: 't-shirt', price: 11 };
let pant = { name: 't-shirt', price: '10 dollars' }; //error
let chips = { name: 't-shirt', price: 5 }; //less than 10 dollars error

showTotalPrice(tShirt)
showTotalPrice(pant)
showTotalPrice(chips)

// playing with pipeK:

const showTotalPrice2 = S.pipe([
  getItemPrice,
  S.pipeK([
    addCaliTax,
    apply25PercDisc,
  ]),
  eitherLogOrShow,
]);

showTotalPrice2(tShirt)
// showTotalPrice2(pant)
// showTotalPrice2(chips)