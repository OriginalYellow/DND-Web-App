<template>
  <v-container>
    <v-layout
      row
      wrap
    >
      <v-btn
        color="secondary"
        @click="openDrawer"
        flat
      >
        open drawer
      </v-btn>
      <v-btn
        color="secondary"
        @click="logBreakpoint"
        flat
      >
        Log Breakpoint
      </v-btn>
      <v-btn
        color="secondary"
        @click="logState"
        flat
      >
        Log State
      </v-btn>
      <v-btn
        color="secondary"
        @click="logCurrentRoute"
        flat
      >
        log current route
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import * as RA from 'ramda-adjunct';
import Post from '@/models/Post';
import User from '@/models/User';
import Stat from '@/models/Stat';
import Character from '@/models/Character';
import StatType from '@/models/StatType';
import * as T from '@/store/mutation-types';

import * as U from '@/util';
import * as R from 'ramda';

export default {
  mounted() {
    StatType.create({
      data: [
        // MIKE: get rid of ac its not a real stat
        { shortName: 'ac', longName: 'armor class' },
        { shortName: 'dex', longName: 'dexterity' },
        { shortName: 'str', longName: 'strength' },
        { shortName: 'char', longName: 'charisma' },
        { shortName: 'int', longName: 'intelligence' },
        { shortName: 'con', longName: 'constitution' },
        { shortName: 'wis', longName: 'wisdom' },
      ],
    });

    Stat.create({
      data: [
        { stat_type_id: 1, val: 10 },
        { stat_type_id: 2, val: 11 },
        { stat_type_id: 3, val: 5 },
        { stat_type_id: 4, val: 20 },
        { stat_type_id: 5, val: 15 },
        { stat_type_id: 6, val: 9 },
        { stat_type_id: 7, val: 7 },
      ],
    });
  },

  methods: {
    increaseStat() {
      Stat.update({
        where: 2,
        data: { val: 200 },
      });
    },

    logBreakpoint() {
      console.log(this.$vuetify.breakpoint.name);
      // console.log(`xsOnly: ${this.$vuetify.breakpoint.xsOnly}`);
      console.log(`smAndDown: ${this.$vuetify.breakpoint.smAndDown}`);
    },

    logState() {
      console.log(this.$store.state.entities);
    },

    createRecords() {},

    logQuery() {
      console.log(User.all());
    },

    logQuery2() {
      const statsWithType = Stat.query()
        .with('stat_type')
        .get();

      const transformStatType = R.pipe(
        R.prop('stat_type'),
        R.pick(['shortName', 'longName']),
      );

      const transformStat = R.pipe(
        R.pick(['id', 'val']),
        RA.renameKeys({ id: 'key' }),
      );

      const transformedStatsWithType = R.zipWith(
        R.merge,
        R.map(transformStatType, statsWithType),
        R.map(transformStat, statsWithType),
      );

      console.log(transformedStatsWithType);
    },

    logQuery3() {
      const users = User.query()
        .where((_record, _query, model) => model.isCool())
        .get();

      console.log(users);
    },

    insertUser() {
      User.insert({
        data: {
          name: 'Some Dude Johnson',
        },
      }).then(U.log);
    },

    updateUser() {
      User.update({
        where: R.pipe(
          R.prop('age'),
          R.gte(R.__, 40),
        ),
        data: {
          email: 'douche@guy.cum',
        },
      }).then(U.log);
    },

    openDrawer() {
      this.$store.dispatch(T.TOGGLE_DRAWER);
    },

    logCurrentRoute() {
      console.log(this.$route);
    },
  },
};
</script>
