<template>
  <div>
    <div class="text-center mb-1">
      <nuxt-link :to="guideBookPaper.path">
        <v-img
          :src="imageVariant(guideBookPaper.attachments.cover, { fit: 'scale-down', height: 720, width: 720 })"
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
        :followed-icon="mdiBookshelf"
        :unfollowed-icon="mdiBookshelf"
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
          {{ mdiCurrencyEur }}
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
          {{ mdiWeight }}
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
          {{ mdiFountainPenTip }}
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
          {{ mdiBookOpenPageVariant }}
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
          {{ mdiCalendarOutline }}
        </v-icon>
        {{ $t('models.guideBookPaper.year') }}
      </v-chip>
    </div>
  </div>
</template>

<script>
import { mdiCurrencyEur, mdiWeight, mdiFountainPenTip, mdiBookOpenPageVariant, mdiCalendarOutline, mdiBookshelf } from '@mdi/js'
import SubscribeBtn from '@/components/forms/SubscribeBtn'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'GuideBookPaperCoverCard',
  components: { SubscribeBtn },
  mixins: [ImageVariantHelpers],
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
  },

  data () {
    return {
      mdiCurrencyEur,
      mdiWeight,
      mdiFountainPenTip,
      mdiBookOpenPageVariant,
      mdiCalendarOutline,
      mdiBookshelf
    }
  }
}
</script>
