<template>
  <v-navigation-drawer
    class="setting-drawer"
    temporary
    right
    fixed
    :width="500"
    v-model="drawerIsOpenLocal"
  >
    <v-container row>
      <v-layout>
        <v-flex xs12>
          <basic-card title="editor">
            <v-container
              grid-list-md
              class="pa-0"
            >
              <v-layout
                row
                wrap
              >
                <v-flex xs12>
                  <editor-menu-bar :editor="editor">
                    <v-btn-toggle
                      slot-scope="{ commands, isActive }"
                      flat
                      multiple
                      class="v-btn-toggle--only-child"
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
                        <v-btn
                          flat
                          :class="{ 'v-btn--active': isActive.bold() }"
                          @click.stop.prevent="commands.bold()"
                          active-class="asdfasdf"
                        >
                          <v-icon>format_bold</v-icon>
                        </v-btn>
                        <v-btn
                          flat
                          :class="{ 'v-btn--active': isActive.italic() }"
                          @click.stop.prevent="commands.italic()"
                          active-class="asdfasdf"
                        >
                          <v-icon>format_italic</v-icon>
                        </v-btn>
                        <v-btn
                          flat
                          :class="{ 'v-btn--active': isActive.underline() }"
                          @click.stop.prevent="commands.underline()"
                          active-class="asdfasdf"
                        >
                          <v-icon>format_underlined</v-icon>
                        </v-btn>
                        <v-btn
                          flat
                          :class="{ 'v-btn--active': isActive.heading({ level: 1 }) }"
                          @click="commands.heading({ level: 1 })"
                          active-class="asdfasdf"
                        >
                          <v-icon>format_size</v-icon>
                          <sup>1</sup>
                        </v-btn>
                        <v-btn
                          flat
                          :class="{ 'v-btn--active': isActive.heading({ level: 3 }) }"
                          @click="commands.heading({ level: 3 })"
                          active-class="asdfasdf"
                        >
                          <v-icon>format_size</v-icon>
                          <sup>2</sup>
                        </v-btn>
                        <v-btn
                          flat
                          @click="commands.undo()"
                          active-class="asdfasdf"
                        >
                          <v-icon>undo</v-icon>
                        </v-btn>
                        <v-btn
                          flat
                          @click="commands.redo()"
                          active-class="asdfasdf"
                        >
                          <v-icon>redo</v-icon>
                        </v-btn>
                      </template>
                    </v-btn-toggle>
                  </editor-menu-bar>
                </v-flex>
                <v-flex xs12>
                  <editor-content
                    class="editor-content"
                    :editor="editor"
                    spellcheck="false"
                  />
                </v-flex>
              </v-layout>
            </v-container>
          </basic-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';
import BasicCard from '@/components/BasicCard.vue';
import * as R from 'ramda';

import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image,
  Mention,
} from 'tiptap-extensions';

import dummyData from '@/junk/stats-002.dummy';
import * as T from '@/store/mutation-types';

export default {
  components: {
    EditorMenuBar,
    EditorContent,
    BasicCard,
  },

  data() {
    return {
      isFormatToggled: false,
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new BulletList(),
          new OrderedList(),
          new ListItem(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History(),
          new Image(),
          new Mention(),
        ],
        content: dummyData,
        onUpdate: this.handleEditorContentUpdate,
      }),
    };
  },

  computed: {
    ...mapState({ drawerIsOpenGlobal: 'drawerIsOpen' }),

    drawerIsOpenLocal: {
      set(drawerIsOpen) {
        if (drawerIsOpen) {
          this.$store.commit(T.OPEN_DRAWER);
        } else {
          this.$store.commit(T.CLOSE_DRAWER);
        }
      },
      get() {
        return this.drawerIsOpenGlobal;
      },
    },
  },

  methods: {
    handleEditorContentUpdate(stuff) {
      console.log(stuff);
    },
  },

  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style lang="stylus">
.ProseMirror-focused {
  outline-width: 0;
}
</style>
