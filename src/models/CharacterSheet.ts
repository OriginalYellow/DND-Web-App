import { Stat } from '../Stat';

export interface CharacterSheet {
  name: string,
  stats: {
    ac: Stat,
    dex: Stat,
    str: Stat,
    int: Stat,
    char: Stat
  },
  characterClass: {
    name: 'bard' | 'warrior',
    icon: 'music_note' | 'some_other_icon',
  },
  bio: string,
  alignment: 'chaotic evil' | 'chaotic neutral' | 'chaotic good' | 'true neutral' | 'neutral good' | 'neutral evil' | 'lawful evil' | 'lawful good' | 'lawful neutral'
}