<template>
  <v-toolbar
    dark
    color="primary"
    app
    extended
    extension-height="140"
    scroll-off-screen
    :scroll-threshold="75"
  >
    <v-toolbar-title>
      <router-link
        class="title-nav accentLight--text"
        :to="titleNav.link"
        tag="span"
      >
        {{titleNav.title}}
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        flat
        v-for="item in horizontalNavItems"
        :key="item.title"
        :to="item.link"
      >
        <v-icon :left="$vuetify.breakpoint.smAndUp">
          {{item.icon}}
        </v-icon>
        <span class="hidden-xs-only">
          {{item.title}}
        </span>
      </v-btn>
    </v-toolbar-items>
    <v-container
      grid-list-xs
      slot="extension"
      class="stats-container"
    >
      <v-layout
        row
        wrap
      >
        <v-flex xs12>
          <v-toolbar-items>
            <p class="title">{{characterSummary.name | titleCase}}</p>
            <v-spacer />
            <p class="body-2 text-xs-right">{{levelRaceClassText | titleCase}}</p>
          </v-toolbar-items>
        </v-flex>
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
      </v-layout>
    </v-container>
  </v-toolbar>
</template>

<script>
import StatBox from '@/components/StatBox.vue';

export default {
  name: 'AppToolbar',

  components: {
    StatBox,
  },

  computed: {
    horizontalNavItems: () => [
      {
        icon: 'description',
        title: 'Character Sheet',
        link: '/character-sheet',
      },
    ],

    titleNav: () => ({
      title: "Mike's Cool Tool",
      link: '/',
    }),

    characterSummary: () => ({
      name: 'philobough swaggins',
      bio: 'The second coolest guy around',
      level: 3,
      race: 'halfling',
      characterClass: {
        name: 'bard',
        icon: 'music_note',
      },
    }),

    stats: () => [
      {
        value: '+2',
        topCaption: 'proficiency',
        bottomCaption: 'bonus',
        color: 'transparent',
      },
      {
        value: '25 ft.',
        topCaption: 'walking',
        bottomCaption: 'speed',
        color: 'transparent',
      },
      {
        value: '+3',
        bottomCaption: 'initiative',
        color: 'transparent',
      },
      {
        value: '+2',
        topCaption: 'armor',
        bottomCaption: 'class',
        color: 'transparent',
      },
    ],

    hitPoints: () => ({
      value: '11/18',
      topCaption: 'hit',
      bottomCaption: 'points',
      color: 'primaryLight',
      dark: false,
    }),

    levelRaceClassText() {
      return `level ${this.characterSummary.level} ${this.characterSummary.race} ${this.characterSummary.characterClass.name}`;
    },
  },
};
</script>

<style lang="stylus" scoped>
.title-nav
  cursor: pointer

.stats-container
  padding: 0
</style>


<!-- <v-layout row fill-height align-center>
  <v-flex xs7>
    <p class="title">{{characterSummary.name | titleCase}}</p>
  </v-flex>
  <v-flex xs5>
    <p>{{levelAndClassText | titleCase}}</p>
  </v-flex>
</v-layout> -->
