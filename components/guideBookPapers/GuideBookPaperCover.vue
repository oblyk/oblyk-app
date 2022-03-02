<template>
  <div class="text-center guide-book-paper-cover">
    <h1 class="loved-by-king text-truncate">
      {{ guideBookPaper.name }}
    </h1>
    <v-img
      :src="guideBookPaper.coverUrl"
      :lazy-src="guideBookPaper.thumbnailCoverUrl"
      :alt="guideBookPaper.name"
      class="elevation-4 mt-3"
    />
    <p>
      <v-btn
        v-if="isLoggedIn"
        :to="`/a${guideBookPaper.path}/cover`"
        class="mt-4"
        text
        color="primary"
      >
        <v-icon
          left
        >
          mdi-image-album
        </v-icon>
        {{ $t('actions.changeCover') }}
      </v-btn>
    </p>
  </div>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'

export default {
  name: 'GuideBookPaperCover',
  mixins: [SessionConcern],
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
