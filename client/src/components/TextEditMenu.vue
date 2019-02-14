<template>
  <v-btn-toggle
    flat
    multiple
    class="v-btn-toggle--only-child"
    :style="{'z-index': 1001, width: menuWidth, position: 'relative', top: '90%', left: '15px'}"
  >
    <v-btn
      @click="isFormatToggled = !isFormatToggled"
      :flat="!isFormatToggled"
      color="accentLight"
      :ripple="false"
    >
      <v-icon>text_format</v-icon>
    </v-btn>
    <template v-if="isFormatToggled">
      <v-btn flat active-class="asdfasdf">
        <v-icon>format_bold</v-icon>
      </v-btn>
      <v-btn flat active-class="asdfasdf">
        <v-icon>format_italic</v-icon>
      </v-btn>
      <v-btn flat active-class="asdfasdf">
        <v-icon>format_underlined</v-icon>
      </v-btn>
      <v-btn flat active-class="asdfasdf">
        <v-icon>format_size</v-icon>
        <sup>1</sup>
      </v-btn>
      <v-btn flat active-class="asdfasdf">
        <v-icon>format_size</v-icon>
      </v-btn>
      <v-btn flat active-class="asdfasdf">
        <v-icon>undo</v-icon>
      </v-btn>
      <v-btn flat active-class="asdfasdf">
        <v-icon>redo</v-icon>
      </v-btn>
    </template>
  </v-btn-toggle>
</template>

<script>
export default {
  data() {
    return {
      isFormatToggled: false,
    };
  },

  computed: {
    menuWidth() {
      return this.isFormatToggled
        ? '350px' : '41px';
    },
  },
};
</script>
