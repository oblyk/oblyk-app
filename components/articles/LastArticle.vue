<template>
  <div class="mb-16">
    <h3 class="text-h5 text-md-h4 font-weight-bold text-center mb-5">
      {{ $t('components.article.whatsNew') }}
    </h3>
    <div
      v-if="loadingLastArticles"
      class="last-article-container"
    >
      <div
        v-for="index in 3"
        :key="`skeleton-last-article-${index}`"
      >
        <v-skeleton-loader class="mb-6" type="list-item-avatar-three-line" />
      </div>
    </div>
    <div v-else>
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
import ArticleApi from '~/services/oblyk-api/ArticleApi'

export default {
  name: 'LastArticle',
  components: { SimpleFeedCard },

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
      new ArticleApi(this.$axios, this.$auth)
        .last()
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

<style lang="scss">
.last-article-container {
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
</style>
