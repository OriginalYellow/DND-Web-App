import { Model } from '@vuex-orm/core';
import * as R from 'ramda';

export default class User extends Model {
  static entity = 'users'

  static fields() {
    return {
      id: this.increment(),
      name: this.attr(''),
      email: this.attr(''),
      age: this.number(null).nullable(),
    };
  }

  isCool() {
    return R.lte(this.age, 18);
  }
}
