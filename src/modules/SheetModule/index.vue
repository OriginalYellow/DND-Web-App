<template>
  <sheet-layout
    v-bind="{characterClass, name, bio, currentStats, formStats}"
  >
  </sheet-layout>
</template>

<script>
import * as R from 'ramda';
import { mapState, mapActions } from 'vuex';
import * as RA from 'ramda-adjunct';
import store from './_store';
import SheetLayout from './_components/SheetLayout.vue';
import Stat from '@/models/Stat';

const STORE_KEY = 'sheetModule';

export default {
  name: 'SheetModule',

  components: {
    SheetLayout,
  },

  computed: {
    ...mapState(STORE_KEY, ['characterClass', 'name', 'bio', 'stats']),

    formStats() {
      return R.values(this.stats);
    },

    currentStats() {
      const transformStatType = R.pipe(
        R.prop('stat_type'),
        R.pick(['shortName', 'longName']),
      );

      const transformStat = R.pipe(
        R.pick(['id', 'val', 'bonus']),
        RA.renameKeys({ id: 'key' }),
      );

      const statsWithType = Stat.query()
        .with('stat_type')
        .get();

      return R.zipWith(
        R.merge,
        R.map(transformStatType, statsWithType),
        R.map(transformStat, statsWithType),
      );
    },
  },

  methods: {
    ...mapActions(STORE_KEY, ['increaseStat']),
  },

  beforeCreate() {
    // eslint-disable-next-line no-underscore-dangle
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store);
    }
  },

  mounted() {
    // this.increaseStat('int');
  },
};
</script>
