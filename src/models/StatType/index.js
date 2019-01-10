import { Model } from '@vuex-orm/core';

export default class StatType extends Model {
  static entity = 'stat_types';

  static fields() {
    // `this.belongsTo` is for belongs to relationship. The first argument is
    // the Model class, and second is the foreign key.
    return {
      id: this.increment(),
      shortName: this.string(''),
      longName: this.string(''),
    };
  }
}
