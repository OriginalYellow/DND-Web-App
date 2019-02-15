<template>
  <v-card>
    <v-card-text>
      <h3>Main Stats</h3>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-tile
          v-for="(stat, index) in stats"
          :key="index"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{stat.shortName | allCaps}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-content>
            <v-list-tile-sub-title class="text-xs-right">{{stat.val}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-spacer>

      </v-spacer>
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-btn
          slot="activator"
          color="indigo"
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
                v-for="(stat, index) in stats"
                :key="index"
                xs3
              >
                <v-text-field
                  :label="stat.shortName | allCaps"
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
              color="indigo"
              dark
              @click="submitForm()"
            >
              Save
            </v-btn>
            <v-btn
              color="indigo"
              flat
              @click="dialog = false"
            >
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {
  VCard,
  VCardText,
  VDivider,
  VListTile,
  VListTileContent,
  VListTileTitle,
  VSpacer,
  VDialog,
  VBtn,
  VCardTitle,
  VContainer,
  VLayout,
  VFlex,
  VTextField,
} from 'vuetify/lib';

import { allPass } from 'ramda';

import { AllCaps } from '../filters/capitalization';
import { arrayHasAll } from '../validators';

export default {
  components: {
    VCard,
    VCardText,
    VDivider,
    VListTile,
    VListTileContent,
    VListTileTitle,
    VSpacer,
    VDialog,
    VBtn,
    VCardTitle,
    VContainer,
    VLayout,
    VFlex,
    VTextField,
  },

  filters: {
    AllCaps,
  },

  props: {
    stats: {
      required: true,
      // MIKE: make a new version of hasAll that works with arrays or something
      validator: allPass([
        Array.isArray,
        arrayHasAll(['shortName', 'longName', 'val']),
      ]),
    },
  },

  // MIKE: might be a good idea to make this component dumb and wrap it in a
  // functional component that has this data and methods
  data() {
    return {
      dialog: false,
      formStats: [
        {
          key: 'ac',
          shortName: 'ac',
          longName: 'armor class',
          val: 5,
        },
        {
          key: 'dex',
          shortName: 'dex',
          longName: 'dexterity',
          val: 5,
        },
        {
          key: 'str',
          shortName: 'str',
          longName: 'strength',
          val: 5,
        },
        {
          key: 'int',
          shortName: 'int',
          longName: 'intelligence',
          val: 5,
        },
        {
          key: 'char',
          shortName: 'char',
          longName: 'charisma',
          val: 5,
        },
      ],
    };
  },

  methods: {
    submitForm: () => console.log('submittin dat form'),
  },
};
</script>
