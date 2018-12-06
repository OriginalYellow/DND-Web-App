<template>
    <!-- <v-card color="grey lighten-2"> -->
    <v-card>
        <v-card-text>
            <h3>Main Stats</h3>
            <v-divider></v-divider>
                <v-list dense>
                    <v-list-tile
                        v-for="(stat, index) in mainStats"
                        :key="index"
                    >
                        <v-list-tile-content>
                            <v-list-tile-title>{{stat.shortName}}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-content
                            class="align-end"
                        >
                            <v-list-tile-sub-title>{{stat.val}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-dialog
                v-model="dialog"
                width="500"
            >
                <v-btn
                    slot="activator"
                    color="indigo"
                    dark
                    small
                >
                    EDIT
                </v-btn>
                <v-card color="grey lighten-2">
                    <v-card-title>
                        <h2>Edit Main Stats</h2>
                    </v-card-title>
                        <v-container grid-list-md>
                            <v-layout row wrap>
                                <v-flex
                                    v-for="(stat, index) in mainStats" 
                                    :key="index" 
                                    xs3
                                >
                                    <v-text-field
                                        :label="stat.shortName"
                                        :placeholder="`${stat.val}`"
                                        outline
                                        v-model="formStats[index].val"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="indigo"
                            dark
                            @click="submitForm()"
                        >
                            Save
                        </v-btn>
                        <v-btn
                            color="indigo"
                            flat
                            @click="dialog = false"
                        >
                            Cancel
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Stat } from '../Stat'
// import { Maybe }  from 'tsmonad';

@Component
export default class StatsCard extends Vue {
    @Prop({
            default: () => [Stat.Dex(10), Stat.Int(14), Stat.Char(6), Stat.AC(10)]
        })
    mainStats!: Stat[];

    dialog: boolean = false;

    formStats = this.mainStats;

    submitForm(): void {
        //MIKE: emit something instead of doing this
        // this.mainStats = this.formStats;
    }
}
</script>