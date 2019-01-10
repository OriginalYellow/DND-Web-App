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
      <v-container grid-list-xs>
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
            xs12
            md6
          >
            <stats-card
              :stats="statsArray"
            ></stats-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { mapState, mapActions, mapGetters } from 'vuex';
import {
  VApp,
  VToolbar,
  VToolbarTitle,
  VContent,
  VContainer,
  VLayout,
  VFlex,
} from 'vuetify/lib';
import CharacterSummary from '../components/CharacterSummary.vue';
import StatsCard from '../components/StatsCard.vue';

export default {
  name: 'app',

  components: {
    CharacterSummary,
    StatsCard,
    VApp,
    VToolbar,
    VToolbarTitle,
    VContent,
    VContainer,
    VLayout,
    VFlex,
  },

  computed: {
    ...mapState(['bio', 'name', 'characterClass']),
    ...mapGetters(['statsArray']),
  },

  methods: {
    ...mapActions(['tst']),
    tst() {
      console.log('fuck vue');
    },
  },

  created() {
  },
};
</script>
