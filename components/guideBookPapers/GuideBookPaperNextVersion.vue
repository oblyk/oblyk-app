<template>
  <div>
    <v-card-title
      class="pb-1"
    >
      <v-icon left>
        mdi-arrow-up-bold-box-outline
      </v-icon>
      {{ $t('components.guideBookPaper.nextVersionTitle') }}
    </v-card-title>
    <guide-book-paper-small-card
      v-if="guideBookPaper"
      :guide-book-paper="recordToObject('GuideBookPaper', guideBookPaper)"
    />
  </div>
</template>

<script>
import GuideBookPaperSmallCard from '@/components/guideBookPapers/GuideBookPaperSmallCard'
import { RecordToObjectHelpers } from '@/mixins/RecordToObjectHelpers'

export default {
  name: 'GuideBookPaperNextVersion',
  components: { GuideBookPaperSmallCard },
  mixins: [RecordToObjectHelpers],
  props: {
    guideBookPaper: Object
  }
}
</script>
