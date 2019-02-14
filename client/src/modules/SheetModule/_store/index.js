import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
  namespaced: true,
  state: () => ({
    bio: 'The coolest guy around.',
    name: 'philbough swaggins',
    characterClass: { name: 'bard', icon: 'music_note' },
    stats: {
      ac: {
        key: 1, shortName: 'ac', longName: 'armor class', val: 0,
      },
      dex: {
        key: 2, shortName: 'dex', longName: 'dexterity', val: 0,
      },
      str: {
        key: 3, shortName: 'str', longName: 'strength', val: 0,
      },
      int: {
        key: 4, shortName: 'int', longName: 'intelligence', val: 0,
      },
      char: {
        key: 5, shortName: 'char', longName: 'charisma', val: 0,
      },
    },
  }),
  actions,
  getters,
  mutations,
};
