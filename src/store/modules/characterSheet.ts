// @ts-ignore

import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { CharacterSheetModel, Alignment, CharacterClass } from '../../models/characterSheet'
import * as R from 'ramda';
import { Stat } from '../../structures/stat';

@Module({ namespaced: true })
export default class CharacterSheetModule extends VuexModule implements CharacterSheetModel {
  name = 'philbough swaggins';
  bio = 'The coolest guy around.';
  alignment: Alignment = 'lawful evil';
  characterClass: CharacterClass = {
    name: 'bard',
    icon: 'music_note'
  };
  //MIKE: you need to "ii"
  stats = {
    ac: { shortName: 'ac', longName: 'armor class', val: 0 },
    dex: { shortName: 'dex', longName: 'dexterity', val: 0 },
    str: { shortName: 'str', longName: 'strength', val: 0 },
    int: { shortName: 'int', longName: 'intelligence', val: 0 },
    char: { shortName: 'char', longName: 'charisma', val: 0 }
  };
  remainingPoints = 27;

  //MIKE: use a getter for computed stats like AC, etc.

  @Action({ commit: 'increment' })
  incr(statShortName: string) {
    return statShortName;
  }

  //OLD
  @Mutation
  increment(statShortName: string) {
    this.stats.str.val++;
  }

  //NEW
  @Mutation
  increment2(statShortName: string) {
    // R.find()
  }

  get statsAsArray(): Stat[] {
    for (var fug in this.stats) {
      
    }
  }

}