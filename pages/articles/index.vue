<template>
  <div>
    <v-container class="article-feed-container">
      <p v-if="isLoggedIn && isSuperAdmin" class="text-right mt-3">
        <v-btn
          to="/a/articles/new"
          color="primary"
        >
          <v-icon left>
            {{ mdiFountainPenTip }}
          </v-icon>
          {{ $t('actions.writeAnArticle') }}
        </v-btn>
      </p>
      <feed feed-api="Article" />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { mdiFountainPenTip } from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
import Feed from '@/components/feeds/Feed'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  components: { AppFooter, Feed },
  mixins: [SessionConcern],

  data () {
    return {
      mdiFountainPenTip
    }
  },

  head () {
    return {
      title: this.$t('meta.article.newsTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('meta.article.newsDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('meta.article.newsTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('meta.article.newsDescription') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/img/images/oblyk-og-image.jpg` }
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
