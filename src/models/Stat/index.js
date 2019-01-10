import { Model } from '@vuex-orm/core';
import StatType from '../StatType';

export default class Stat extends Model {
  static entity = 'stats';

  static fields() {
    return {
      id: this.increment(),
      character_id: this.number(null),
      stat_type_id: this.number(null),
      stat_type: this.belongsTo(StatType, 'stat_type_id'),
      val: this.number(0),
    };
  }

  get bonus() {
    return Math.floor((this.val - 10) / 2);
  }
}
