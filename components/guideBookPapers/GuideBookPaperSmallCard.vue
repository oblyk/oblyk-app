<template>
  <div>
    <v-card
      link
      flat
      :to="linkable ? guideBookPaper.path : null"
    >
      <v-list-item three-line>
        <v-list-item-avatar
          rounded="0"
          size="70"
        >
          <v-img
            :src="guideBookPaper.thumbnailCoverUrl"
            contain
            max-width="70px"
            max-height="70px"
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            <v-row>
              <v-col cols="10" class="text-truncate pr-0">
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
              </v-col>
              <v-col cols="2" class="text-right pt-1">
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
              </v-col>
            </v-row>
          </v-list-item-title>
          <v-list-item-subtitle class="mt-n3 mb-4 text-truncate">
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
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import { mdiBookshelf, mdiCurrencyUsdOff, mdiHandCoin, mdiHelpCircleOutline } from '@mdi/js'
import SubscribeBtn from '@/components/forms/SubscribeBtn'

export default {
  name: 'GuideBookPaperSmallCard',
  components: { SubscribeBtn },
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    },
    linkable: {
      type: Boolean,
      required: false,
      default: true
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
      } else if (this.funding_status === 'not_contributes_to_financing') {
        return mdiCurrencyUsdOff
      } else {
        return mdiHelpCircleOutline
      }
    }
  }
}
</script>
