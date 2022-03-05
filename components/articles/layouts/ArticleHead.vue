<template>
  <div>
    <v-img
      dark
      height="500px"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.7)"
      :lazy-src="article.thumbnailCoverUrl"
      :src="article.coverUrl"
      :srcset="`${article.croppedCoverUrl} 500w, ${article.coverUrl} 600w`"
    >
      <div class="article-header-title">
        <h1 class="font-weight-medium loved-by-king">
          {{ article.name }}
        </h1>
        <div>
          {{ $t('components.article.writtenBy', { name: article.author.name }) }},
          {{ $t('common.at') }} {{ humanizeDate(article.published_at) }}
          <span
            v-if="article.comments_count && article.comments_count > 0"
            class="ml-2"
          >
            <v-icon small>
              mdi-comment
            </v-icon>
            {{ article.comments_count }}
          </span>
          <span v-if="isLoggedIn && isSuperAdmin">
            <article-action-menu :article="article" />
          </span>
        </div>
      </div>
    </v-img>
  </div>
</template>

<script>
import { DateHelpers } from '@/mixins/DateHelpers'
import { SessionConcern } from '@/concerns/SessionConcern'
import ArticleActionMenu from '@/components/articles/forms/ArticleActionMenu'

export default {
  name: 'ArticleHead',
  components: { ArticleActionMenu },
  mixins: [DateHelpers, SessionConcern],
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.article-header-title {
  position: absolute;
  width: 100%;
  text-align: center;
  padding: 0.5em 0.5em 1em 1em;
  bottom: 0;
  h1 {
    font-size: 3rem;
    margin-bottom: -15px;
  }
}
</style>
