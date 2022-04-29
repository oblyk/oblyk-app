<template>
  <div>
    <markdown-text
      v-if="word.definition"
      :text="word.definition"
    />
  </div>
</template>
<script>
const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'WordFeedCard',
  components: { MarkdownText },
  props: {
    word: Object
  }
}
</script>
