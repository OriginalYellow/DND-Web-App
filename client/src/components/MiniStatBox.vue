// MIKE: if there isn't any top word, make the visibility hidden

<template>
  <v-card
    class="mini-stat-box-card text-xs-center"
    flat
    dark
  >
    <v-card-text class="pa-0">
      <v-container class="pa-1">
        <v-layout
          row
          class="pa-0"
        >
          <v-flex
            :xs9="large"
            :xs6="small"
            :class="leftColor"
          >
            <span class="caption">{{caption | allCaps}}</span>
          </v-flex>
          <v-flex
            :xs3="large"
            :xs6="small"
            :class="rightColor"
          >
            <span>{{value}}</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: 'MiniStatBox',

  props: {
    caption: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    leftColor: {
      type: String,
      default: 'primary',
    },
    rightColor: {
      type: String,
      default: 'secondary',
    },
    large: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    small() {
      return !this.large;
    },
  },
};
</script>

<style lang="stylus" scoped>
.mini-stat-box-card {
  // min-width: 75px;
}
</style>
