<template>
  <div>
    <v-card
      link
      flat
      class="hoverable-card"
      :to="linkable ? guideBookPaper.path : null"
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
              <v-chip
                v-if="guideBookPaper.fundingAttributes.displayed"
                outlined
                class="pr-1 pl-1 mr-1 mb-1"
                small
                :color="guideBookPaper.fundingAttributes.color"
              >
                <v-icon
                  small
                  :title="$t(guideBookPaper.fundingAttributes.labelKey)"
                >
                  {{ fundingIcon() }}
                </v-icon>
              </v-chip>
              {{ guideBookPaper.name }}
            </span>
          </v-list-item-title>
          <v-list-item-subtitle class="text-truncate">
            <v-alert
              dense
              text
              class="d-inline-block mr-1 mb-0 pl-2 pr-2 pt-0 pb-0"
            >
              {{ $t('components.guideBookPaper.type') }}
            </v-alert>
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
import { mdiBookshelf, mdiCurrencyUsdOff, mdiHandCoin, mdiHelpCircleOutline } from '@mdi/js'
import SubscribeBtn from '@/components/forms/SubscribeBtn'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'GuideBookPaperSmallCard',
  components: { SubscribeBtn },
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
      mdiBookshelf,
      mdiCurrencyUsdOff,
      mdiHandCoin,
      mdiHelpCircleOutline
    }
  },

  methods: {
    fundingIcon () {
      if (this.guideBookPaper.funding_status === 'contributes_to_financing') {
        return mdiHandCoin
      } else if (this.guideBookPaper.funding_status === 'not_contributes_to_financing') {
        return mdiCurrencyUsdOff
      } else {
        return mdiHelpCircleOutline
      }
    }
  }
}
</script>
