<template>
  <div>
    <div class="text-center mb-1">
      <nuxt-link :to="guideBookPaper.path">
        <v-img
          :src="guideBookPaper.thumbnailCoverUrl"
          contain
          :height="coverHeight"
        />
      </nuxt-link>
    </div>
    <p
      v-if="showYear"
      class="text-center text--disabled mb-0"
    >
      <small>
        {{ guideBookPaper.publication_year }}
      </small>
    </p>
    <p class="text-center text-truncate mb-0">
      <subscribe-btn
        v-if="subscribeBtn"
        subscribe-type="GuideBookPaper"
        :subscribe-id="guideBookPaper.id"
        :large="false"
        followed-color="deep-purple"
        followed-icon="mdi-bookshelf"
        unfollowed-icon="mdi-bookshelf"
        subscribe-label="actions.addToLibrary"
        unsubscribe-label="actions.removeFromLibrary"
      />
      {{ guideBookPaper.name }}
    </p>
    <p
      v-if="showAuthor"
      class="text-center text--disabled mb-0"
    >
      <small>
        {{ guideBookPaper.author }}
      </small>
    </p>

    <!-- Show missing information-->
    <div
      v-if="showMissingInformation"
      class="text-center mt-2"
    >
      <!-- Price -->
      <v-chip
        v-if="guideBookPaper.price === null"
        class="mr-1 mb-1"
        color="red lighten-2"
        outlined
      >
        <v-icon left small>
          mdi-currency-usd
        </v-icon>
        {{ $t('models.guideBookPaper.price') }}
      </v-chip>

      <!-- Weight -->
      <v-chip
        v-if="guideBookPaper.weight === null"
        class="mr-1 mb-1"
        color="red lighten-2"
        outlined
      >
        <v-icon left small>
          mdi-weight
        </v-icon>
        {{ $t('models.guideBookPaper.weight') }}
      </v-chip>

      <!-- Author -->
      <v-chip
        v-if="guideBookPaper.author === null || guideBookPaper.author === ''"
        class="mr-1 mb-1"
        color="red lighten-2"
        outlined
      >
        <v-icon left small>
          mdi-fountain-pen-tip
        </v-icon>
        {{ $t('models.guideBookPaper.author') }}
      </v-chip>

      <!-- Pages -->
      <v-chip
        v-if="guideBookPaper.number_of_page === null"
        class="mr-1 mb-1"
        color="red lighten-2"
        outlined
      >
        <v-icon left small>
          mdi-book-open-page-variant
        </v-icon>
        {{ $t('models.guideBookPaper.pages') }}
      </v-chip>

      <!-- Edition year -->
      <v-chip
        v-if="guideBookPaper.publication_year === null"
        class="mr-1 mb-1"
        color="red lighten-2"
        outlined
      >
        <v-icon left small>
          mdi-calendar-outline
        </v-icon>
        {{ $t('models.guideBookPaper.year') }}
      </v-chip>
    </div>
  </div>
</template>

<script>

import SubscribeBtn from '@/components/forms/SubscribeBtn'
export default {
  name: 'GuideBookPaperCoverCard',
  components: { SubscribeBtn },
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    },
    showMissingInformation: {
      type: Boolean
    },
    showAuthor: {
      type: Boolean,
      default: true
    },
    showYear: {
      type: Boolean,
      default: false
    },
    coverHeight: {
      type: String,
      default: '240px'
    },
    subscribeBtn: Boolean
  }
}
</script>
