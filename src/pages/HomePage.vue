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
            <!-- MIKE: REALLY COOL IDEA: use vuex getters to convert parts of the state into models and pass those to components. BUT first you should just do more of that validation tutorial to learn about v-model more and use that -->
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
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
//MIKE: put common exports into a single index file and rexport them for less boilerlate
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";

import CharacterSummary from "../components/CharacterSummary.vue";
import StatsCard from "../components/StatsCard.vue";
import { CharacterSheetModel, CharacterClass } from "../models/characterSheet";
import { Stat } from "../structures/stat";

const characterSheet = namespace("CharacterSheet");

@Component({
  components: {
    CharacterSummary,
    StatsCard
  }
})
export default class HomePage extends Vue {
  @characterSheet.State((state: CharacterSheetModel) => state.characterClass)
  characterClass!: CharacterClass;

  @characterSheet.State((state: CharacterSheetModel) => state.bio)
  bio!: string;

  @characterSheet.State((state: CharacterSheetModel) => state.name)
  name!: string;

  @characterSheet.State((state: CharacterSheetModel) => state.stats)
  stats!: Stat[];

  @characterSheet.Action("incr")
  increment!: (statShortName: string) => void;

  dialog = true;

  mounted(): void {
    console.log(this.$vuetify.breakpoint);
  }
}
</script>