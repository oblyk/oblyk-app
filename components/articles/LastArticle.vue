<template>
  <div class="mb-16">
    <h2 class="text-h5 font-weight-bold text-center mb-5">
      {{ $t('components.article.whatsNew') }}
    </h2>
    <div v-if="loadingLastArticles">
      <div
        v-for="index in 3"
        :key="`skeleton-last-article-${index}`"
      >
        <v-skeleton-loader class="mb-6" type="list-item-avatar-three-line" />
      </div>
    </div>
    <div v-else>
      <div class="last-article-container">
        <article-card
          v-for="(article, articleIndex) in articles"
          :key="`article-index-${articleIndex}`"
          :article="article"
          class="mb-2"
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
import OblykApi from '~/services/oblyk-api/OblykApi'
import ArticleCard from '~/components/articles/ArticleCard'

export default {
  name: 'LastArticle',
  components: { ArticleCard },

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
    getLastArticles () {
      new OblykApi(this.$axios, this.$auth)
        .get('/articles', { page: 1, per_page: 3 })
        .then((resp) => {
          this.articles = resp.data
        })
        .finally(() => {
          this.loadingLastArticles = false
        })
    }
  }
}
</script>
