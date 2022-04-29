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
import ArticleApi from '~/services/oblyk-api/ArticleApi'
import GuideBookPaperSmallCard from '@/components/guideBookPapers/GuideBookPaperSmallCard'
import GuideBookPaper from '@/models/GuideBookPaper'

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
      new ArticleApi(this.$axios, this.$auth)
        .guideBookPapers(this.article.id)
        .then((resp) => {
          for (const guideBookPaper of resp.data) {
            this.guideBookPapers.push(new GuideBookPaper({ attributes: guideBookPaper }))
          }
        })
    }
  }
}
</script>
