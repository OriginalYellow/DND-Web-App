<template>
  <v-card>
    <v-card-text>
      <h3>Main Stats</h3>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-tile
          v-for="(stat, index) in currentStats"
          :key="index"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{stat.shortName | allCaps}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-content>
            <v-list-tile-sub-title class="text-xs-right">{{stat.val}}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-content>
            <v-list-tile-sub-title class="text-xs-right">{{stat.bonus}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card-text>
    <!-- <v-card-actions>
      <v-spacer>

      </v-spacer>
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-btn
          slot="activator"
          color="secondary"
          dark
          small
        >
          EDIT
        </v-btn>
        <v-card color="grey lighten-2">
          <v-card-title>
            <h2>Edit Main Stats</h2>
          </v-card-title>
          <v-container grid-list-md>
            <v-layout
              row
              wrap
            >
              <v-flex
                v-for="(stat, index) in formStats"
                :key="index"
                xs3
              >
                <v-text-field
                  :label="stat.shortName | AllCaps"
                  :placeholder="`${stat.val}`"
                  outline
                  v-model="formStats[index].val"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="secondary"
              dark
              @click="submitForm()"
            >
              Save
            </v-btn>
            <v-btn
              color="secondary"
              flat
              @click="dialog = false"
            >
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions> -->
  </v-card>
</template>

<script lang="ts">
import { allPass } from 'ramda';

import { arrayHasAll } from '@/util/validators';

const validateStats = allPass([
  Array.isArray,
  arrayHasAll(['key', 'shortName', 'longName', 'val', 'bonus']),
]);

export default {
  props: {
    currentStats: {
      required: true,
      validator: validateStats,
    },
    // formStats: {
    //   required: true,
    //   validator: validateStats
    // }
  },

  data() {
    return {
      dialog: false,
      // formStats: [
      //   {
      //     key: 'ac',
      //     shortName: 'ac',
      //     longName: 'armor class',
      //     val: 5,
      //   },
      //   {
      //     key: 'dex',
      //     shortName: 'dex',
      //     longName: 'dexterity',
      //     val: 5,
      //   },
      //   {
      //     key: 'str',
      //     shortName: 'str',
      //     longName: 'strength',
      //     val: 5,
      //   },
      //   {
      //     key: 'int',
      //     shortName: 'int',
      //     longName: 'intelligence',
      //     val: 5,
      //   },
      //   {
      //     key: 'char',
      //     shortName: 'char',
      //     longName: 'charisma',
      //     val: 5,
      //   },
      // ],
    };
  },

  methods: {
    submitForm: () => console.log('submittin dat form'),
  },
};
</script>
