<template>
  <basic-card title="ability scores">
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
        :key="abilityScore.name"
      >
        <square-stat-box
          :value="abilityScore.modifier | addSign"
          :topCaption="abilityScore.name | allCaps"
          :bottomCaption="`${abilityScore.value}`"
        />
      </v-flex>
    </v-layout>
  </basic-card>
</template>

<script>
import BasicCard from '@/components/BasicCard.vue';
import SquareStatBox from '@/components/SquareStatBox.vue';

export default {
  name: 'AbilityScoresContainer',

  components: {
    BasicCard,
    SquareStatBox,
  },

  props: ['abilityScores'],
};
</script>

<style lang="stylus" scoped>
</style>
