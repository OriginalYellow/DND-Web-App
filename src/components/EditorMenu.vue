<template>
  <editor-menu-bar :editor="editor">
    <div slot-scope="{ commands, isActive }">
      <button
        :class="{ 'is-active': isActive.bold() }"
        @click="commands.bold"
      >
        Bold
      </button>
      <button
        :class="{ 'is-active': isActive.heading({ level: 2 }) }"
        @click="commands.heading({ level: 2 })"
      >
        H2
      </button>
    </div>
  </editor-menu-bar>
</template>

<script>
export default {
  name: 'EditorMenu',
};
</script>
