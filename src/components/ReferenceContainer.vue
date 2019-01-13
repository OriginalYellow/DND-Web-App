<template>
  <v-navigation-drawer
    class="setting-drawer"
    temporary
    right
    fixed
    :width="500"
    v-model="drawerIsOpen"
  >
    <v-container row>
      <v-layout>
        <v-flex xs12>
          <character-info-card title="editor">
            <v-container
              grid-list-xs
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
                      @change="handleButtonGroupChange"
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
                          :class="{ 'v-btn--active': isActive.strike() }"
                          @click.stop.prevent="commands.strike()"
                          active-class="asdfasdf"
                        >
                          <v-icon>format_strikethrough</v-icon>
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
          </character-info-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';
import CharacterInfoCard from '@/components/CharacterInfoCard.vue';
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
} from 'tiptap-extensions';

export default {
  components: {
    EditorMenuBar,
    EditorContent,
    CharacterInfoCard,
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
        ],
        content: `
          <h1>Yay Headlines!</h1>
          <p>All these <strong>cool tags</strong> are working now.</p>
        `,
        onUpdate: this.handleEditorContentUpdate,
      }),
      lastButtonGroupStates: [],
    };
  },

  computed: {
    ...mapState(['drawerIsOpen']),
  },

  methods: {
    handleButtonGroupChange(buttonGroupStates) {},

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
