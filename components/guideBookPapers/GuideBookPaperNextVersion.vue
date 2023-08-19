<template>
  <div class="border rounded pt-2" style="border-color: #ffc107">
    <h2
      class="text-h6 amber--text pl-2"
      :class="$vuetify.theme.dark ? '' : 'text--darken-3'"
    >
      <v-icon
        color="amber"
        class="vertical-align-sub mr-1"
      >
        {{ mdiShimmer }}
      </v-icon>
      {{ $t('components.guideBookPaper.nextVersionTitle') }}
    </h2>
    <guide-book-paper-small-card
      v-if="guideBookPaper"
      :guide-book-paper="GuideBookPaper"
    />
  </div>
</template>

<script>
import { mdiShimmer } from '@mdi/js'
import GuideBookPaperSmallCard from '@/components/guideBookPapers/GuideBookPaperSmallCard'
import GuideBookPaper from '~/models/GuideBookPaper'

export default {
  name: 'GuideBookPaperNextVersion',
  components: { GuideBookPaperSmallCard },
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiShimmer
    }
  },

  computed: {
    GuideBookPaper () {
      return new GuideBookPaper({ attributes: this.guideBookPaper })
    }
  }
}
</script>
