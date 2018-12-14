import { Stat } from '../structures/stat';

export interface CharacterSheetModel {
  name: string,
  stats: {
    ac: Stat,
    dex: Stat,
    str: Stat,
    int: Stat,
    char: Stat
  },
  characterClass: CharacterClass
  bio: string,
  alignment: Alignment
}

export type Alignment = 'chaotic evil' | 'chaotic neutral' | 'chaotic good' | 'true neutral' | 'neutral good' | 'neutral evil' | 'lawful evil' | 'lawful good' | 'lawful neutral';

export type CharacterClass = {
  name: 'bard' | 'warrior',
  icon: 'music_note' | 'some_other_icon',
}
