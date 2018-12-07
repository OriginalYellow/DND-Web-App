import { CharacterSheet } from './CharacterSheet';
import { Stat } from '../Stat';

export const data: CharacterSheet = {
  name: 'philbough swaggins',
  characterClass: {
    name: 'bard',
    icon: 'music_note'
  },
  stats: {
    ac: Stat.AC(8),
    dex: Stat.Dex(5),
    str: Stat.Str(10),
    int: Stat.Int(14),
    char: Stat.Char(14),
  },
  bio: 'The coolest guy around.',
  alignment: 'lawful evil'
}//?

export default data;