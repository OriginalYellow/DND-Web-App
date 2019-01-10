<template>
  <abilities-saves-senses-screen/>
</template>

<script>
import SummaryCard from './SummaryCard.vue';
import StatsCard from './StatsCard.vue';
import SheetToolbar from './SheetToolbar.vue';
import AbilitiesSavesSensesScreen from '@/screens/AbilitiesSavesSensesScreen.vue';

export default {
  name: 'SheetLayout',

  components: {
    AbilitiesSavesSensesScreen,
    SummaryCard,
    StatsCard,
    SheetToolbar,
  },

  props: ['characterClass', 'name', 'bio', 'currentStats', 'formStats'],
};
</script>

<!-- <v-container grid-list-md>
  <v-layout
    row
    wrap
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <summary-card v-bind="{ characterClass, name, bio }">
      </summary-card>
    </v-flex>
    <v-flex
      xs6
      offset-xs6
      sm4
      offset-sm0
      md3
      offset-md3
    >
      <stats-card v-bind="{ currentStats, formStats }"></stats-card>
    </v-flex>
  </v-layout>
</v-container> -->
