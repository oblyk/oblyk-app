<template>
  <v-icon
    v-if="funding[guideBookPaper.funding_status]?.displayed || false"
    small
    class="mx-1 vertical-align-sub"
    :color="funding[guideBookPaper.funding_status]?.color || 'gray'"
    :title="$t(funding[guideBookPaper.funding_status]?.labelKey || 'components.guideBookPaper.fundingStatusExplain.undefined')"
  >
    {{ funding[guideBookPaper.funding_status]?.icon || mdiHelpCircleOutline }}
  </v-icon>
</template>

<script>
import { mdiCurrencyUsdOff, mdiHandCoin, mdiHelpCircleOutline } from '@mdi/js'

export default {
  name: 'GuideBookPaperFundingIcon',
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      funding: {
        contributes_to_financing: {
          displayed: true,
          color: 'green',
          labelKey: 'components.guideBookPaper.fundingStatusExplain.contributes_to_financing',
          icon: mdiHandCoin
        },
        not_contributes_to_financing: {
          displayed: true,
          color: 'red',
          labelKey: 'components.guideBookPaper.fundingStatusExplain.not_contributes_to_financing',
          icon: mdiCurrencyUsdOff
        }
      },

      mdiHelpCircleOutline
    }
  }
}
</script>
