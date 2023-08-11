<template>
  <div class="border rounded pl-2 pt-2" style="border-color: #ffc107">
    <h2
      class="text-h6 amber--text"
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
      :guide-book-paper="recordToObject('GuideBookPaper', guideBookPaper)"
    />
  </div>
</template>

<script>
import { mdiShimmer } from '@mdi/js'
import GuideBookPaperSmallCard from '@/components/guideBookPapers/GuideBookPaperSmallCard'
import { RecordToObjectHelpers } from '@/mixins/RecordToObjectHelpers'

export default {
  name: 'GuideBookPaperNextVersion',
  components: { GuideBookPaperSmallCard },
  mixins: [RecordToObjectHelpers],
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
  }
}
</script>
