<template>
  <character-info-card title="ability scores">
    <v-layout
      row
      wrap
      justify-space-between
    >
      <v-flex
        xs4
        sm2
        class="pa-2"
        v-for="abilityScore in abilityScores"
        :key="abilityScore.topCaption + abilityScore.bottomCaption"
      >
        <stat-box v-bind="abilityScore" />
      </v-flex>
    </v-layout>
  </character-info-card>
</template>

<script>
import CharacterInfoCard from '@/components/CharacterInfoCard.vue';
import StatBox from '@/components/StatBox.vue';

export default {
  name: 'AbilityScoresContainer',

  components: {
    CharacterInfoCard,
    StatBox,
  },

  computed: {
    abilityScores: () => [
      {
        value: '+0',
        topCaption: 'strength',
        bottomCaption: '10',
      },
      {
        value: '+2',
        topCaption: 'dexterity',
        bottomCaption: '14',
      },
      {
        value: '+0',
        topCaption: 'constitution',
        bottomCaption: '11',
      },
      {
        value: '+2',
        topCaption: 'intelligence',
        bottomCaption: '14',
      },
      {
        value: '+1',
        topCaption: 'wisdom',
        bottomCaption: '13',
      },
      {
        value: '+2',
        topCaption: 'charisma',
        bottomCaption: '14',
      },
    ],
  },
};
</script>

<style lang="stylus" scoped>
</style>
