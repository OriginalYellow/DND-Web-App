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
              :character-class="characterSheet.characterClass"
              :name="characterSheet.name"
              :bio="characterSheet.bio"
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
                  AC: {{ characterSheet.stats.ac.val }}
                  <br>
                  INIT: +{{ init.val }}
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
                  AC: {{ characterSheet.stats.ac.val }}
                  <br>
                  INIT: +{{ init.val }}
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
import CharacterSummary from "../components/CharacterSummary.vue";
import StatsCard from "../components/StatsCard.vue";
import { Component, Prop } from "vue-property-decorator";
import { CharacterSheet } from "../models/CharacterSheet";
import { Stat } from "../Stat"

//MIKE: you need to set state from the props because I don't think props are menat to change

@Component({
  components: {
    CharacterSummary,
    StatsCard
  }
})
export default class HomePage extends Vue {
  @Prop({ required: true })
  initialCharacterSheet!: CharacterSheet;

  characterSheet = this.initialCharacterSheet;
  dialog = true;

  // remainingPoints = 20;
  // rules: [(v:) => v <= 25 || 'Max 25 characters'],

  mounted(): void {
    console.log(this.$vuetify.breakpoint);
  }

  get init(): Stat {
    return this.characterSheet.stats.dex;
  }
}
</script>