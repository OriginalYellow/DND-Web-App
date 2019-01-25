// MIKE: you could put a fetch method on the model if that makes sense
import { Model } from '@vuex-orm/core';
import Stat from '@/models/Stat';

export default class Character extends Model {
  static entity = 'characters'

  static fields() {
    return {
      id: this.increment(),
      name: this.attr('no name'),
      stats: this.hasMany(Stat, 'character_id'),
    };
  }
}
