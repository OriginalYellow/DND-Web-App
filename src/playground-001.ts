//MIKE: it would be cool if you could add some kind of "pure function" test here
//MIKE: you can optimize better if you tell webpack that these are pure
//MIKE: wait are they even pure? - yes they are

import * as R from "ramda";

export const Capitalize = function (x: string): string {
  return R.compose(
    R.join(""),
    R.juxt([
      R.compose(
        R.toUpper,
        R.head
      ),
      R.tail
    ])
  )(x);
}

export const AllCaps = function(x: string): string {
  return R.toUpper(x);
}

//TEST
AllCaps('dex');//?

export const CapitalizeWords = function (x: string): any {
  return R.compose(
    R.join(' '),
    R.map(
      Capitalize
    ),
    R.split(' ')
  )(x);
}

//TEST
CapitalizeWords('oh my goodness')//?
