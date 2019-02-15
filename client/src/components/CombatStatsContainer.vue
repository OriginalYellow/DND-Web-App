<template>
  <character-info-card title="Combat">
    <v-layout
      row
      wrap
      justify-space-between
    >
      <v-flex
        xs4
        sm2
        class="pa-2"
        v-for="combatStat in combatStats"
        :key="combatStat.topCaption + combatStat.bottomCaption"
      >
        <stat-box v-bind="combatStat" />
      </v-flex>
    </v-layout>
  </character-info-card>
</template>

<script>
import CharacterInfoCard from '@/components/CharacterInfoCard.vue';
import StatBox from '@/components/StatBox.vue';

export default {
  name: 'CombatStatsContainer',

  components: {
    CharacterInfoCard,
    StatBox,
  },

  computed: {
    combatStats: () => [
      {
        value: '+2',
        topCaption: 'proficiency',
        bottomCaption: 'bonus',
      },
      {
        value: '25 ft.',
        topCaption: 'walking',
        bottomCaption: 'speed',
      },
      {
        value: '+3',
        bottomCaption: 'initiative',
      },
      {
        value: '+2',
        topCaption: 'armor',
        bottomCaption: 'class',
      },
      {
        value: '11/18',
        topCaption: 'hit',
        bottomCaption: 'points',
        color: 'health',
      },
    ],
  },
};
</script>

<style lang="stylus" scoped>
</style>
