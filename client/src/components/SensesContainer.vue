<template>
  <basic-card title="senses">
    <v-layout
      class="pt-1 pb-2"
      row
      justify-center
    >
        <!-- lg3
        xl2 -->
      <v-flex
        xs9
        sm7
        md5
      >
        <v-layout
          row
          wrap
          justify-space-between
        >
          <v-flex
            xs12
            v-for="sense in senses"
            :key="sense.caption"
          >
            <mini-stat-box
              large
              v-bind="sense"
            />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </basic-card>
</template>

<script>
import BasicCard from '@/components/BasicCard.vue';
import MiniStatBox from '@/components/MiniStatBox.vue';

export default {
  name: 'SensesContainer',

  components: {
    BasicCard,
    MiniStatBox,
  },

  computed: {
    senses: () => [
      {
        value: '12',
        caption: 'passive perception',
      },
      {
        value: '14',
        caption: 'passive investigation',
      },
      {
        value: '12',
        caption: 'passive wisdom',
      },
    ],

    resistances: () => ['against being frightened', 'against poison'],
  },
};
</script>

<style lang="stylus" scoped>
</style>
