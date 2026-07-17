<template>
  <div v-if="guideBookPapers.length > 0">
    <h2 class="mb-2 mt-8">
      <v-icon left>
        {{ mdiBookOpenVariant }}
      </v-icon>
      {{ $t('components.article.guideBookPaperList') }}
    </h2>
    <guide-book-paper-small-card
      v-for="guideBookPaper in guideBookPapers"
      :key="guideBookPaper.id"
      class="mb-2"
      :guide-book-paper="guideBookPaper"
    />
  </div>
</template>

<script>
import { mdiBookOpenVariant } from '@mdi/js'
import GuideBookPaperSmallCard from '@/components/guideBookPapers/GuideBookPaperSmallCard'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'ArticleGuideBookPapers',
  components: { GuideBookPaperSmallCard },
  props: {
    article: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiBookOpenVariant,
      guideBookPapers: []
    }
  },

  mounted () {
    this.getArticleCrags()
  },

  methods: {
    getArticleCrags () {
      new OblykApi(this.$axios, this.$auth)
        .get(`/articles/${this.article.id}/guide_book_papers`)
        .then((resp) => {
          this.guideBookPapers = resp.data
        })
    }
  }
}
</script>
