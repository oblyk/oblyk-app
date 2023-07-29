<template>
  <div class="oblyk-markdown-text-area" v-html="markedText()" />
</template>

<script>
import { marked } from 'marked'

export default {
  name: 'MarkdownText',
  props: {
    text: {
      type: String,
      required: true
    }
  },

  methods: {
    markedText () {
      return marked.parse(this.text, { breaks: true })
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
  p:last-child {
    margin-bottom: 0;
  }
}
</style>
