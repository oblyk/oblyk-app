<template>
  <div>
    <v-card
      link
      flat
      class="hoverable-card"
      :to="linkable ? guideBookPaper.app_path : null"
    >
      <v-list-item
        :two-line="small"
        :three-line="!small"
      >
        <v-list-item-avatar
          rounded="0"
          :size="small ? 40 : 70"
          :class="small ? 'mt-1 mb-1' : ''"
        >
          <v-avatar tile :size="small ? 40 : 70">
            <v-img
              :src="imageVariant(guideBookPaper.attachments.cover, { fit: 'scale-down', height: 100, width: 100 })"
              contain
            />
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content :class="small ? 'pt-0 pb-0' : ''">
          <v-list-item-title class="font-weight-bold">
            <span class="vertical-align-middle">
              {{ guideBookPaper.name }}
            </span>
          </v-list-item-title>
          <v-list-item-subtitle class="text-truncate">
            <v-chip
              v-if="guideBookPaper.follows_count > 0"
              small
              outlined
              class="pr-2"
            >
              <v-icon small left>
                {{ mdiBookshelf }}
              </v-icon>
              {{ guideBookPaper.follows_count }}
            </v-chip>
            <guide-book-paper-funding-icon :guide-book-paper="guideBookPaper" />
            {{ guideBookPaper.author }}, {{ guideBookPaper.editor }}, {{ guideBookPaper.publication_year }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <client-only>
            <subscribe-btn
              subscribe-type="GuideBookPaper"
              :subscribe-id="guideBookPaper.id"
              :large="false"
              followed-color="deep-purple"
              :followed-icon="mdiBookshelf"
              :unfollowed-icon="mdiBookshelf"
              subscribe-label="actions.addToLibrary"
              unsubscribe-label="actions.removeFromLibrary"
            />
          </client-only>
        </v-list-item-action>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import { mdiBookshelf } from '@mdi/js'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import SubscribeBtn from '@/components/forms/SubscribeBtn'
import GuideBookPaperFundingIcon from '~/components/guideBookPapers/GuideBookPaperFundingIcon'

export default {
  name: 'GuideBookPaperSmallCard',
  components: { GuideBookPaperFundingIcon, SubscribeBtn },
  mixins: [ImageVariantHelpers],
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    },
    linkable: {
      type: Boolean,
      required: false,
      default: true
    },
    small: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      mdiBookshelf
    }
  }
}
</script>
