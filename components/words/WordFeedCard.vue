<template>
  <div>
    <markdown-text
      v-if="word.definition"
      :text="word.definition"
    />
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
