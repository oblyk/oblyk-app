<template>
  <div class="text-center guide-book-paper-cover full-height">
    <v-img
      :src="guideBookPaper.coverUrl"
      :lazy-src="guideBookPaper.thumbnailCoverUrl"
      :alt="guideBookPaper.name"
      class="rounded-sm"
    />
  </div>
</template>

<script>
export default {
  name: 'GuideBookPaperCover',
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.guide-book-paper-cover {
  img {
    max-height: 700px;
    max-width: 100%;
  }
}
</style>
