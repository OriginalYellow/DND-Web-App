<template>
  <v-container
    grid-list-xs
    slot="extension"
    class="stats-container"
    v-if="$route.name === 'characterSheet'"
    fluid
  >
    <v-layout
      row
      wrap
    >
      <v-flex xs12>
        <v-layout
          row
          wrap
        >
          <v-flex xs12>
            <v-toolbar-items>
              <template v-if="$vuetify.breakpoint.smAndDown">
                <p class="title">{{name | titleCase}}</p>
                <v-spacer />
                <p class="body-2 text-xs-right">{{levelRaceClassText | titleCase}}</p>
              </template>
              <template v-else>
                <p>
                  <span class="title">{{name | titleCase}}</span>
                  -
                  <span class="body-2">{{levelRaceClassText | titleCase}}</span>
                </p>
              </template>
            </v-toolbar-items>
          </v-flex>
          <template v-if="$vuetify.breakpoint.smAndDown">
            <v-flex xs7>
              <v-layout
                row
                justify-space-between
              >
                <v-flex
                  xs2
                  v-for="stat in stats"
                  :key="stat.topCaption + stat.bottomCaption"
                >
                  <stat-box v-bind="stat" />
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs5>
              <v-layout
                row
                :justify-center="$vuetify.breakpoint.smAndDown"
                :justify-end="$vuetify.breakpoint.mdAndUp"
              >
                <v-flex xs2>
                  <stat-box v-bind="hitPoints" />
                </v-flex>
              </v-layout>
            </v-flex>
          </template>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import StatBox from '@/components/StatBox';

export default {
  components: {
    StatBox,
  },

  computed: {
    levelRaceClassText() {
      return `
      level ${this.level} ${this.race} ${this.characterClassName}
      `;
    },
  },

  props: {
    level: {
      type: Number,
      required: true,
    },
    race: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    characterClassName: {
      type: String,
      required: true,
    },
    stats: {
      type: Array,
      required: true,
    },
    hitPoints: {
      type: Object,
      required: true,
    },
  },
};
</script>
