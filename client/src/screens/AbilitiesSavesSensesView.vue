<template>
  <v-container grid-list-xl>
    <v-layout
      row
      wrap
    >
      <template v-if="$vuetify.breakpoint.smAndDown">
        <v-flex xs12>
          <ability-scores-container />
        </v-flex>
        <v-flex xs12>
          <saving-throws-container />
        </v-flex>
        <v-flex xs12>
          <senses-container />
        </v-flex>
      </template>
      <template v-else>
        <v-flex lg6>
          <v-layout
            row
            wrap
          >
            <v-flex xs12>
              <combat-stats-container />
            </v-flex>
            <v-flex xs12>
              <ability-scores-container :abilityScoreList="selectedPlayerCharacter.abilityScoreList" />
            </v-flex>
            <v-flex xs12>
              <senses-container />
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex lg6>
          <saving-throws-container />
        </v-flex>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

import AbilityScoresContainer from '@/components/AbilityScoresContainer';
import SavingThrowsContainer from '@/components/SavingThrowsContainer';
import SensesContainer from '@/components/SensesContainer';
import CombatStatsContainer from '@/components/CombatStatsContainer';

export default {
  components: {
    AbilityScoresContainer,
    SavingThrowsContainer,
    SensesContainer,
    CombatStatsContainer,
  },

  computed: {
    ...mapState(['selectedPlayerCharacter']),
  },
};
</script>
