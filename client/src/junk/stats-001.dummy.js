import { thunkify, clone } from 'ramda';

export const stats = {
  ac: {
    shortName: 'ac', longName: 'armor class', val: 5,
  },
  dex: {
    shortName: 'dex', longName: 'dexterity', val: 5,
  },
  str: {
    shortName: 'str', longName: 'strength', val: 5,
  },
  int: {
    shortName: 'int', longName: 'intelligence', val: 5,
  },
  char: {
    shortName: 'char', longName: 'charisma', val: 5,
  },
};

export const cloneStats = thunkify(clone(stats));
