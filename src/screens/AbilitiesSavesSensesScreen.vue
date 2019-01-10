<template>
  <v-container
    grid-list-xl
    fluid
  >
    <v-layout
      row
      wrap
    >
      <v-flex xs12>
        <ability-scores-container xs12 />
      </v-flex>
      <v-flex xs12>
        <saving-throws-container xs12 />
      </v-flex>
      <v-flex xs12>
        <senses-container xs12 />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AbilityScoresContainer from '@/components/AbilityScoresContainer.vue';
import SavingThrowsContainer from '@/components/SavingThrowsContainer.vue';
import SensesContainer from '@/components/SensesContainer.vue';

export default {
  components: {
    AbilityScoresContainer,
    SavingThrowsContainer,
    SensesContainer,
  },
};
</script>
