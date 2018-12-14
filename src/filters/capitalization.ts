import * as R from "ramda";

//NOTE: copied from https://stackoverflow.com/questions/40011725/point-free-style-capitalize-function-with-ramda
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

Capitalize('fug shit');//?

export const AllCaps = function(x: string): string {
  return R.toUpper(x);
}

//TEST
AllCaps('dex');//?

export const CapitalizeWords = function (x: string): string {
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
