<template>
  <v-card class="full-height">
    <v-card-title>
      <h2 class="h2-title-in-card-title">
        <v-icon left>
          {{ mdiNewspaperVariantMultiple }}
        </v-icon>
        {{ $t('components.crag.relatedArticles') }}
      </h2>
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
import Spinner from '@/components/layouts/Spiner'
import CragApi from '~/services/oblyk-api/CragApi'
import Article from '@/models/Article'
import ArticleFeedCard from '@/components/articles/ArticleFeedCard'

export default {
  name: 'CragArticles',
  components: { ArticleFeedCard, Spinner },
  props: {
    crag: {
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
      new CragApi(this.$axios, this.$auth)
        .articles(this.crag.id)
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
