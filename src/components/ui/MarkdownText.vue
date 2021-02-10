<template>
  <div v-html="markedText" class="oblyk-markdown-text-area" />
</template>

<script>
import { MarkdownHelpers } from '@/mixins/MarkdownHelpers'

export default {
  name: 'MarkdownText',
  mixins: [MarkdownHelpers],
  props: {
    text: String
  },

  computed: {
    markedText: function () {
      return this.marked(this.text)
    }
  }
}
</script>

<style lang="scss">
.oblyk-markdown-text-area {
  h1 {font-size: 1.3em }
  h2 {font-size: 1.2em }
  h3 {font-size: 1.1em }
  h4 {font-size: 1em }
  table {
    width: 100%;
    margin-bottom: 0.5em;
    border-collapse: collapse;
    th {
      border-bottom-style: solid;
      border-width: 2px;
    }
    td {
      border-bottom-style: solid;
      border-width: 1px;
    }
  }
}
</style>
