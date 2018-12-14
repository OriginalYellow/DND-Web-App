<template>
  <HomePage></HomePage>
</template>

<script lang="ts">
import Vue from "vue";
import HomePage from '../pages/HomePage.vue'
import { Component } from "vue-property-decorator";

@Component({
  components: {
    HomePage,
  }
})
export default class App extends Vue {
}
</script>b