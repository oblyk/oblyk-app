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
        <article-card
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
import ArticleCard from '~/components/articles/ArticleCard'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'CragArticles',
  components: { ArticleCard, Spinner },
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
      new OblykApi(this.$axios, this.$auth)
        .get(`/public/crags/${this.crag.id}/articles`)
        .then((resp) => {
          this.articles = resp.data
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
