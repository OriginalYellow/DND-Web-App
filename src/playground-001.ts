// @ts-ignore

import * as R from "ramda";
import { data } from './models/character-sheet-dummy-001';

//MIKE: had to add this to fix ramda typescript issue (https://github.com/DefinitelyTyped/DefinitelyTyped/issues/25581)
declare module 'ramda' {
  interface Filter {
    <T>(fn: (value: T) => boolean): (list: ReadonlyArray<T>) => T[];
    <T>(fn: (value: T) => boolean, list: ReadonlyArray<T>): T[];
  }
}





interface Video {
  views?: number;
}

var youtubeVideos = [
  {},
  { views: 99 },
  {},
  { views: 41 }
]

const getViews = (youtubeVideos: Video[]) => {
  return R.pipe(
    R.filter(R.has('views')),
    R.map((video: Video) => video.views)
  )(youtubeVideos)
}

getViews(youtubeVideos)//?

R.always(true)()//?




interface Pokemon {
  species: {
    [datum: string]: string
    // element: string,
    // name: string,
  }
}

var pokemon: Pokemon = {
  species: {
    element: 'water',
    name: 'ruminant'
  }
}



const speciesLens = R.lensProp('species');
const nameLens = R.lensProp('element');
const speciesNameLens = R.compose(speciesLens, nameLens);

// const setSpecies = (species: Pokemon['species'], pokemon: Pokemon) => {
const setSpecies = (species: any, pokemon: any) => {
  // return R.set(speciesNameLens, species, pokemon);
  return R.set(speciesLens, species, pokemon)
}

setSpecies({ element: 'fire', name: 'biped' }, pokemon)//?





const addSpeciesMetadata = (metadata: any, pokemon: Pokemon) => {
  var newPokemon = { ...pokemon };
  var newSpecies = { ...newPokemon.species };

  newPokemon.species = newSpecies;

  for (var metadataKey in metadata) {
    newPokemon.species[metadataKey] = metadata[metadataKey];
  }

  return newPokemon;
}



const xHeadYLens = R.lensPath(['x', 0, 'y']);

R.view(xHeadYLens, { x: [{ y: { sheet: 'nigga', fug: 3333 }, z: 3 }, { y: 4, z: 5 }] });//?
//=> 2
R.set(xHeadYLens, 1, { x: [{ y: 2, z: 3 }, { y: 4, z: 5 }] });//?
R.set(xHeadYLens, 232, { x: [{ y: 2, z: 3 }, { y: 4, z: 5 }] });//?
//=> {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
R.over(xHeadYLens, R.negate, { x: [{ y: 2, z: 3 }, { y: 4, z: 5 }] });//?
//=> {x: [{y: -2, z: 3}, {y: 4, z: 5}]}

//MIKE: maybe if i define it, take as input an any type, and output the type

addSpeciesMetadata({ thing: 'fug' }, pokemon)//?

//MIKE: try this:
//lensPath = { thingy: { dingy: y }} and reusing that for both the lens function type definition and that lens path method

//MIKE: just use a model dummy. all of your lens functions should take any and output a primitive or a type - in the case of a primitive you dont need the model so its preferred. you could put ramda typechecking on top to make it better.
//MIKE: the issue with the above is that lenses are best for mutating your own data.....fug
interface coolModel {
  g: {
    h: number,
    i: number,
    j: number
  }
}

interface bigModel {
  a: number[],
  b: {
    c: {
      fug: number
    },
    d: {
      e: number,
      f: number
    }
  }
}

const bigData: bigModel = {
  a: [1, 2, 3],
  b: {
    c: {
      fug: 299
    },
    d: {
      e: 4,
      f: 5
    }
  }
}

bigData//?

function SetCoolObject(bigObject: bigModel): bigModel {
  return R.set(R.lensPath(['b', 'd', 'e']), 1000, bigObject);
}

SetCoolObject(bigData)//?

function test(thingish: any): coolModel { return thingish as coolModel }

//NOTE: i think the nice thing about lenses is u dont have to store a model of random shit that comes in from api calls - u only care about the path usually
// lensPath

//MIKE: try currying this
// function lensPropG<T extends {x: number, y: number}>(coolObject: T):  {
//   return R.lensProp('') as {x: number, y: number}
// }


const xLens = R.lensProp('y');

R.view(xLens, { x: 1, y: 2 });        //?
R.set(xLens, 4, { x: 1, y: 2 });         //?
R.over(xLens, R.negate, { x: 1, y: 2 });  //?



const dummyData = {
  stats: {
    ac: { shortName: 'ac', longName: 'armor class', val: 0 },
    dex: { shortName: 'dex', longName: 'dexterity', val: 0 },
    str: { shortName: 'str', longName: 'strength', val: 4 },
    int: { shortName: 'int', longName: 'intelligence', val: 0 },
    char: { shortName: 'char', longName: 'charisma', val: 0 }
  }
}


const asfd: string = 'ac';

dummyData.stats[asfd]//?

R.view(
  R.lensPath(['stats', 'str', 'val']),
  dummyData
)//?

function increment(statShortName: string) {
  return R.over(
    R.lensPath(['stats', statShortName, 'val']),
    R.inc,
  )(dummyData)//?
}

const fug = increment('str');




R.toPairs(dummyData.stats);//?





const convert = R.compose(R.map(R.zipObj(['word', 'count'])), R.toPairs);

convert({I: 2, it: 4, that: 1});//?
