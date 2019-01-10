<template>
  <character-info-card title="saving throws">
    <v-layout
      class="pt-1 pb-2"
      row
      justify-center
    >
      <v-flex xs9>
        <v-layout
          row
          wrap
          justify-space-between
        >
          <v-flex
            xs6
            sm4
            md2
            v-for="savingThrow in savingThrows"
            :key="savingThrow.caption"
          >
            <mini-stat-box v-bind="savingThrow" />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-divider />
    <v-layout row>
      <v-flex>
        <template v-for="resistance in resistances">
          <span :key="`span-${resistance}`">
            <v-chip
              label
              disabled
              text-color="white"
              color="secondary"
            >
              {{'advantage' | titleCase}}
            </v-chip>
            {{resistance}}
          </span>
          <br :key="`br-${resistance}`">
        </template>
      </v-flex>
    </v-layout>
  </character-info-card>
</template>

<script>
import CharacterInfoCard from '@/components/CharacterInfoCard.vue';
import MiniStatBox from '@/components/MiniStatBox.vue';

export default {
  name: 'SavingThrowsContainer',

  components: {
    CharacterInfoCard,
    MiniStatBox,
  },

  computed: {
    savingThrows: () => [
      {
        value: '+0',
        caption: 'str',
      },
      {
        value: '+4',
        caption: 'dex',
      },
      {
        value: '+0',
        caption: 'con',
      },
      {
        value: '+2',
        caption: 'int',
      },
      {
        value: '+1',
        caption: 'wis',
      },
      {
        value: '+4',
        caption: 'cha',
      },
    ],

    resistances: () => ['against being frightened', 'against poison'],
  },
};
</script>

<style lang="stylus" scoped>
</style>
