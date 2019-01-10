<template>
  <v-container>
    <v-layout
      row
      wrap
    >
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
        @click="createRecords"
        flat
      >
        Create Records
      </v-btn>
    </v-layout>
    <v-layout
      row
      wrap
    >
      <v-btn
        color="secondary"
        @click="logQuery"
        flat
      >
        Log Query
      </v-btn>
      <v-btn
        color="secondary"
        @click="insertUser"
        flat
      >
        Insert User
      </v-btn>
      <v-btn
        color="secondary"
        @click="updateUser"
        flat
      >
        Update User
      </v-btn>
    </v-layout>
    <v-layout
      row
      wrap
    >
      <v-btn
        color="secondary"
        @click="logQuery2"
        flat
      >
        Log Query 2
      </v-btn>
      <v-btn
        color="secondary"
        @click="logQuery3"
        flat
      >
        Log Query 3
      </v-btn>
      <v-btn
        color="secondary"
        @click="increaseStat"
        flat
      >
        Increase Stat
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

      const projectStatType = R.pipe(
        R.prop('stat_type'),
        R.pick(['shortName', 'longName']),
      );

      const projectStat = R.pipe(
        R.pick(['id', 'val']),
        RA.renameKeys({ id: 'key' }),
      );

      const projectedStatsWithType = R.zipWith(
        R.merge,
        R.map(projectStatType, statsWithType),
        R.map(projectStat, statsWithType),
      );

      console.log(projectedStatsWithType);
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
  },
};
</script>
