import { CharacterSheetModel } from './characterSheet';
import { Stat } from '../structures/stat';

export const data: CharacterSheetModel = {
  name: 'philbough swaggins',
  characterClass: {
    name: 'bard',
    icon: 'music_note'
  },
  stats: {
    ac: {shortName: 'ac', longName: 'armor class', val: 5},
    dex: {shortName: 'dex', longName: 'dexterity', val: 5},
    str: {shortName: 'str', longName: 'strength', val: 5},
    int: {shortName: 'int', longName: 'intelligence', val: 5},
    char: {shortName: 'char', longName: 'charisma', val: 5}
  },
  bio: 'The coolest guy around.',
  alignment: 'lawful evil'
}//?

export default data;