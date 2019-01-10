<template>
  <v-card color="primaryLight">
    <v-card-title
      primary-title
      class="pt-2 pb-2"
    >
      <span class="body-2">
        {{title | titleCase}}
      </span>
    </v-card-title>
    <v-divider light />
    <v-card-text>
      <slot/>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'CharacterInfoCard',

  props: {
    title: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="stylus" scoped>
</style>
