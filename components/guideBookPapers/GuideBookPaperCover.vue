<template>
  <div class="text-center guide-book-paper-cover full-height">
    <v-img
      :src="imageVariant(guideBookPaper.attachments.cover, { fit: 'scale-down', height: 1980, width: 1980 })"
      :lazy-src="imageVariant(guideBookPaper.attachments.cover, { fit: 'scale-down', height: 720, width: 720 })"
      :alt="guideBookPaper.name"
      class="rounded-sm"
    />
  </div>
</template>

<script>
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'GuideBookPaperCover',
  mixins: [ImageVariantHelpers],
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
