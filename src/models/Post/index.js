// Post Model
import { Model } from '@vuex-orm/core';
import User from '../User';

export default class Post extends Model {
  static entity = 'posts'

  static fields() {
    // `this.belongsTo` is for belongs to relationship. The first argument is
    // the Model class, and second is the foreign key.
    return {
      id: this.increment(),
      user_id: this.attr(null),
      title: this.attr(''),
      body: this.attr(''),
      published: this.attr(false),
      author: this.belongsTo(User, 'user_id'),
    };
  }
}
