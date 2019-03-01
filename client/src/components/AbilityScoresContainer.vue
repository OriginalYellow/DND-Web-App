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
        v-for="abilityScore in abilityScoreList"
        :key="abilityScore.name"
      >
        <stat-box
          :value="abilityScore.modifier | addSign"
          :topCaption="abilityScore.name | allCaps"
          :bottomCaption="`${abilityScore.value}`"
        />
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

  props: ['abilityScoreList'],
};
</script>

<style lang="stylus" scoped>
</style>
