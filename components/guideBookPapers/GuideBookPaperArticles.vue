<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        {{ mdiNewspaperVariantMultiple }}
      </v-icon>
      {{ $t('components.guideBookPaper.relatedArticles') }}
    </v-card-title>
    <v-card-text>
      <spinner v-if="loadingArticles" :full-height="false" />
      <div v-if="!loadingArticles">
        <article-feed-card
          v-for="article in articles"
          :key="article.id"
          :article="article"
          class="mb-2"
          :show-footer="false"
          :show-read-more="true"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiNewspaperVariantMultiple } from '@mdi/js'
import GuideBookPaperApi from '~/services/oblyk-api/GuideBookPaperApi'
import Spinner from '@/components/layouts/Spiner'
import Article from '@/models/Article'
import ArticleFeedCard from '@/components/articles/ArticleFeedCard'

export default {
  name: 'GuideBookPaperArticles',
  components: { ArticleFeedCard, Spinner },
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingArticles: true,
      articles: [],

      mdiNewspaperVariantMultiple
    }
  },

  mounted () {
    this.getArticles()
  },

  methods: {
    getArticles () {
      this.loadingArticles = true
      new GuideBookPaperApi(this.$axios, this.$auth)
        .articles(this.guideBookPaper.id)
        .then((resp) => {
          this.articles = []
          for (const article of resp.data) {
            this.articles.push(new Article({ attributes: article }))
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'articles')
        })
        .finally(() => {
          this.loadingArticles = false
        })
    }
  }
}
</script>
