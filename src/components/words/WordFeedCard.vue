<template>
  <div>
    <markdown-text :text="word.definition" />
  </div>
</template>
<script>
import MarkdownText from '@/components/ui/MarkdownText'

export default {
  name: 'WordFeedCard',
  components: { MarkdownText },
  props: {
    word: Object
  }
}
</script>
