// MIKE: if there isn't any top word, make the visibility hidden

<template>
  <v-card
    class="stat-box-card text-xs-center"
    :class="color"
    flat
    :dark="dark"
    :light="light"
  >
    <v-card-text class="py-1 px-0">
      <span
        :style="{visibility: topCaptionVisibility}"
        class="caption"
      >
        {{ topCaption | sentenceCase }}
      </span>
      <div class="headline" :class="valueColor">{{ value }}</div>
      <span class="caption">{{ bottomCaption | sentenceCase }}</span>
    </v-card-text>
  </v-card>
</template>

<script>
import * as R from 'ramda';

const HIDDEN_CAPTION_PLACEHOLDER = 'placeholder';

export default {
  name: 'StatBox',

  props: {
    topCaption: {
      type: String,
      default: HIDDEN_CAPTION_PLACEHOLDER,
    },
    value: {
      type: String,
      required: true,
    },
    bottomCaption: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'primary',
    },
    dark: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    topCaptionVisibility() {
      return this.topCaption === HIDDEN_CAPTION_PLACEHOLDER
        ? 'hidden' : 'visible';
    },

    light() {
      return R.not(this.dark);
    },

    valueColor() {
      return this.dark
        ? 'secondaryLight--text' : 'secondary--text';
    },
  },
};
</script>

<style lang="stylus" scoped>
.stat-box-card {
  min-width 75px
}
</style>
