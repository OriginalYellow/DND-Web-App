<template>
  <HomePage :initial-character-sheet="characterSheet"></HomePage>
</template>

<script lang="ts">
import Vue from "vue";
import HomePage from '../pages/HomePage.vue'
import { Component, Prop } from "vue-property-decorator";
import { CharacterSheet } from "../models/CharacterSheet";
import { data } from '../models/character-sheet-dummy-001';

//NEW
@Component({
  components: {
    HomePage,
  }
})
export default class App extends Vue {
  get characterSheet(): CharacterSheet { return data; }
}
</script>