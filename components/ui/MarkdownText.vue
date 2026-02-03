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
  h1 { font-size: 1.3em }
  h2 { font-size: 1.2em }
  h3 { font-size: 1.1em }
  h4 { font-size: 1em }
  table {
    width: 100%;
    margin-bottom: 0.5em;
    border-collapse: collapse;
    border-style: solid;
    border-color: rgba( 150, 150, 150, 0.2);
    border-width: 1px;
    th {
      padding: 1px 5px;
      border-bottom-style: solid;
      border-color: rgba( 150, 150, 150, 0.2);
      border-width: 2px;
    }
    td {
      padding: 1px 5px;
      border-bottom-style: solid;
      border-color: rgba( 150, 150, 150, 0.2);
      border-width: 1px;
    }
  }
  p {
    margin-bottom: 0.2em;
  }
  *:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
  }
  img {
    max-width: 100%;
  }
  ul li:has(input[type="checkbox"]) {
    list-style: none;
  }
  ul:has(li input[type="checkbox"]) {
    padding-left: 12px;
  }
  ul {
    margin-bottom: 0.2em;
  }
}
</style>
