<template>
  <div class="example" @click="randomColor()" v-bind:style="styleObject">{{ msg }}</div>
</template>

<script lang="ts">
import Vue from "vue";

const colors = ['red', 'blue', 'green', 'purple', 'orange', 'yellow'];

export default Vue.extend({
    data() 
    {
        return {
            msg: 'Helldsdfdsdo world!',
            styleObject: {
                color: 'red',
                fontSize: '13px'
            }
        }
    },
    methods: 
    {
        randomColor() {
            this.styleObject.color = colors[Math.floor(6 * Math.random())];
            this.styleObject.fontSize = `${10 + Math.floor(30 * Math.random())}px`;
        }
    }
});

</script>

<style>
.example {
  color: blue;
  font-size: 30px;
}
</style>

<custom1>
  This could be e.g. documentation for the component.
</custom1>