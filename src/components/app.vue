<!-- MIKE: use a data iterator (see "data iterator" doc) instead of cards for displaying stats. Alternatively, use a "list" (see "list" doc) -->
<!-- MIKE: use "button dropdowns" for editing stats (see "button dropdown varients" in buttons doc) -->
<!-- MIKE: look into using "chips" for displaying short bits of data inline (see "chip" doc). Also check out the "In selects" section of the "chip" doc for selecting chips (the example has a really nice contextual selector) -->
<!-- MIKE: look into using "timelines" (see "timeline" doc page) for advanced features - like a chronicle of the adventure -->
<!-- MIKE: look into using "steppers" for character creation (see "stepper" doc page) -->

<template>
  <v-app>
    <v-toolbar
      dark
      color="grey darken-3"
      app
    >
      <v-toolbar-title>Mike's Cool Tool</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container grid-list-md>
        <v-layout
          row
          wrap
        >
          <v-flex
            xs12
            md6
          >
            <character-summary
              :character-class="characterClass"
              :name="name"
              :bio="bio"
            ></character-summary>
          </v-flex>
          <v-flex
            xs4
            md2
          >
            <!-- MIKE: pass in the stat objects as props -->
            <stats-card></stats-card>
          </v-flex>
          <v-flex
            xs4
            md2
          >
            <v-card color="grey lighten-2">
              <v-card-text>
                <h3>Other Stats</h3>
                <v-divider></v-divider>
                <p>
                  AC: {{ stats.ac }}
                  <br>
                  INIT: +{{ init }}
                </p>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex
            xs4
            md2
          >
            <v-card color="grey lighten-2">
              <v-card-text>
                <h3>Other Stats</h3>
                <v-divider></v-divider>
                <p>
                  AC: {{ stats.ac }}
                  <br>
                  INIT: +{{ init }}
                </p>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import CharacterSummary from "./CharacterSummary.vue";
import StatsCard from "./StatsCard.vue";
import { Component, Prop } from "vue-property-decorator";

//NEW
@Component({
  components: {
    CharacterSummary,
    StatsCard
  }
})
export default class App extends Vue {
  name: string = "philbough swaggins";

  characterClass = {
    name: "bard",
    icon: "music_note"
  };

  //MIKE: replace these with stat objects
  stats = {
    ac: 8,
    dex: 5,
    str: 10,
    int: 14,
    char: 14
  };

  bio = "A cool guy who knows what's what.";

  alignment = "chaotic good";

  dialog = true;

  formStats = {
    dex: 0,
    str: 0,
    int: 0,
    char: 0
  };

  // remainingPoints = 20;
  // rules: [(v:) => v <= 25 || 'Max 25 characters'],

  mounted(): void {
    console.log(this.$vuetify.breakpoint);
    this.formStats.dex = this.stats.dex;
    this.formStats.str = this.stats.str;
    this.formStats.int = this.stats.int;
    this.formStats.char = this.stats.char;
  }

  get init(): number {
    return this.stats.dex;
  }

  submitForm(): void {
    this.stats.dex = this.formStats.dex;
    this.stats.str = this.formStats.str;
    this.stats.int = this.formStats.int;
    this.stats.char = this.formStats.char;
    this.dialog = false;
  }
}
</script>