<template>
  <div>
    <h2 class="text-h6">
      <v-icon class="vertical-align-sub mr-1">
        {{ mdiArrowUpBoldBoxOutline }}
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
import { mdiArrowUpBoldBoxOutline } from '@mdi/js'
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
      mdiArrowUpBoldBoxOutline
    }
  }
}
</script>
