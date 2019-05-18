<template>
  <v-flex
    xs12
    :class="containerClass"
  >
    <v-container>
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          class="mb-5"
        >
          <!-- :style="{textDecoration: 'underline'}" -->
          <p :class="titleClass">
            {{'what makes somnia amor great' | titleCase}}
          </p>
        </v-flex>
          <!-- :offset-sm-2="(index % 2) === 0 " -->
        <v-flex
          :class="featureClass"
          sm6
          xs12
          v-for="(feature, index) in features"
          :key="index"
        >
          <v-icon
            v-if="!$vuetify.breakpoint.smAndUp"
            x-large
            color="red lighten-3"
            class="mb-3"
          >{{feature.icon}}</v-icon>
          <p>
            <v-icon
              v-if="$vuetify.breakpoint.smAndUp"
              x-large
              color="red lighten-3"
            >{{feature.icon}}</v-icon>
            <span class="headline">
              {{" " + feature.title}}
            </span>
          </p>
          <p>{{feature.body}}</p>
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    isSecondDropdownHidden: true,
    isButtonHidden: true,
  }),

  computed: {
    titleClass() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return 'display-1 text-xs-left red--text text--lighten-3';
      }

      return 'display-1 text-xs-left red--text text--lighten-3';
    },

    containerClass() {
      if (this.$vuetify.breakpoint.smAndUp) {
        return 'pt-5 mt-5 pr-4 pl-4';
      }

      return 'pt-4 mt-5 pr-4 pl-4';
    },

    featureClass() {
      if (this.$vuetify.breakpoint.smAndUp) {
        return 'mb-5 pr-5 pl-5';
      }

      return 'mb-5 pr-2 pl-2';
    },

    features() {
      return [
        {
          title: 'Iaculis eget cursus',
          body:
            'Litora metus ullamcorper maecenas blandit interdum fringilla sem, conubia ac viverra ornare mauris ut, eros adipiscing imperdiet dolor mattis sit',
          icon: 'face',
        },
        {
          title: 'Placerat senectus nulla',
          body:
            'Egestas aliquet ullamcorper cras suspendisse mattis neque eleifend, volutpat vitae himenaeos fusce praesent lacus, tincidunt eros felis quam pellentesque lacinia',
          icon: 'https',
        },
        {
          title: 'Elementum taciti gravida',
          body:
            'Dolor per accumsan aenean lobortis aenean curabitur neque, arcu ornare consequat etiam fringilla aenean, erat mattis augue gravida inceptos quis',
          icon: 'stars',
        },
        {
          title: 'Phasellus suspendisse himenaeos',
          body:
            'Taciti etiam pulvinar fusce nostra ipsum faucibus blandit enim potenti blandit aptent eleifend turpis habitasse phasellus sodales luctus erat convallis',
          icon: 'watch_later',
        },
        {
          title: 'Ut et laoreet',
          body:
            'Quam aenean mattis aliquet etiam imperdiet inceptos integer nam lorem pretium, phasellus lacus netus tristique eleifend vestibulum metus sit justo',
          icon: 'radio',
        },
        {
          title: 'Nibh scelerisque rutrum',
          body:
            'Tempus augue nisi vehicula dolor tristique lectus tempus, vitae feugiat pharetra proin placerat quis, auctor proin nunc ligula sollicitudin eleifend',
          icon: 'recent_actors',
        },
      ];
    },
  },

  methods: {
    showSecondDropdown() {
      this.isSecondDropdownHidden = false;
    },
    showButton() {
      this.isButtonHidden = false;
    },
  },
};
</script>
