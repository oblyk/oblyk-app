<template>
  <div class="mb-16">
    <spinner v-if="loadingLastArticles" :full-height="false" />
    <div v-else>
      <h3 class="loved-by-king text-center mb-5">
        {{ $t('components.article.whatsNew') }}
      </h3>
      <div class="last-article-container">
        <simple-feed-card
          v-for="(article, index) in articles"
          :key="`article-card-${index}`"
          class="mb-4"
          :feed="article"
        />
        <div class="text-right">
          <v-btn
            color="primary"
            outlined
            to="/articles"
          >
            {{ $t('components.article.seeAllArticles') }}
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleFeedCard from '@/components/feeds/SimpleFeedCard'
import ArticleApi from '@/services/oblyk-api/ArticleApi'
import Spinner from '@/components/layouts/Spiner'

export default {
  name: 'LastArticle',
  components: { Spinner, SimpleFeedCard },

  data () {
    return {
      articles: [],
      loadingLastArticles: true
    }
  },

  mounted () {
    this.getLastArticles()
  },

  methods: {
    getLastArticles: function () {
      ArticleApi
        .last()
        .then(resp => {
          this.articles = resp.data
        })
        .finally(() => {
          this.loadingLastArticles = false
        })
    }
  }
}
</script>

<style lang="scss">
.last-article-container {
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
</style>
