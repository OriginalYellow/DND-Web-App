// READER VS STATE:
// - the "shared environment" in a reader should not be modified "over the life
//   of the computation" (this is the opposite of how state works)
// - "If a referential type is used as the environment great care should be taken
//   to not modify the value of the environment."

import Reader from 'crocks/Reader'

import concat from 'crocks/pointfree/concat'

const { ask } = Reader