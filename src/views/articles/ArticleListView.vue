<template>
  <div>
    <v-container class="article-feed-container">
      <p class="text-right mt-3" v-if="isLoggedIn && isSuperAdmin">
        <v-btn
          to="/articles/new"
          color="primary"
        >
          <v-icon left>mdi-fountain-pen-tip</v-icon>
          {{ $t('actions.writeAnArticle') }}
        </v-btn>
      </p>
      <feed feed-api="Article" />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import Feed from '@/components/feeds/Feed'
const AppFooter = () => import('@/components/layouts/AppFooter')

export default {
  name: 'ArticleListView',
  mixins: [SessionConcern],
  components: { AppFooter, Feed },

  metaInfo () {
    return {
      title: this.$t('meta.article.newsTitle'),
      meta: [
        { vmid: 'description', name: 'description', content: this.$t('meta.article.newsDescription') },
        { vmid: 'og-title', property: 'og:title', content: this.$t('meta.article.newsTitle') },
        { vmid: 'og-description', property: 'og:description', content: this.$t('meta.article.newsDescription') },
        { vmid: 'og-image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/img/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.article-feed-container {
  max-width: 900px;
  min-height: calc(100vh - 420px);
}
</style>
