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
import Feed from '@/components/feeds/Feed'
import AppFooter from '@/components/layouts/AppFooter'
import { SessionConcern } from '@/concerns/SessionConcern'

export default {
  name: 'ArticleListView',
  mixins: [SessionConcern],
  components: { AppFooter, Feed }
}
</script>

<style lang="scss" scoped>
.article-feed-container {
  max-width: 900px;
  min-height: calc(100vh - 420px);
}
</style>
