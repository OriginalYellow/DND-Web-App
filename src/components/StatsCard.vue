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
            <v-list-tile-title>{{stat.shortName | AllCaps}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-content >
            <v-list-tile-sub-title class="text-xs-right">{{stat.val}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
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
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { State, Action, namespace } from "vuex-class";
import { Stat } from "../structures/stat"; //if its a .d.ts or something maybe i don't have to do this?
import { AllCaps } from "../filters/capitalization";
import { CharacterSheetModel, CharacterClass } from "../models/characterSheet";

const characterSheet = namespace("CharacterSheet");

@Component({filters: {AllCaps}})
export default class StatsCard extends Vue {
  //OLD
  // @characterSheet.State("stats")
  // stats!: Stat[]

  @Prop({ required: true })
  stats!: CharacterSheetModel['stats'];

  @characterSheet.Action('incr')
  increment!: (statShortName: string) => void;

  dialog: boolean = false;

  formStats: Stat[] = [];

  submitForm(): void {
    //OLD
    // this.mainStats = this.formStats;
  }

  beforeMount() {
    this.formStats = this.stats;
  }

  mounted() {
    this.increment('dex');
  }
}
</script>