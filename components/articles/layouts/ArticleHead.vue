<template>
  <div>
    <v-img
      dark
      max-height="500px"
      class="article-head-img"
      gradient="to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%"
      :lazy-src="article.thumbnailCoverUrl"
      :src="article.coverUrl"
      :srcset="`${article.croppedCoverUrl} 500w, ${article.coverUrl} 600w`"
    >
      <div class="article-header-title">
        <h1 class="font-weight-medium">
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
              {{ mdiComment }}
            </v-icon>
            {{ article.comments_count }}
          </span>
          <share-btn
            :title="article.name"
            :url="article.path"
          />
          <span v-if="isLoggedIn && isSuperAdmin">
            <article-action-menu :article="article" />
          </span>
        </div>
      </div>
    </v-img>
  </div>
</template>

<script>
import { mdiComment } from '@mdi/js'
import { DateHelpers } from '@/mixins/DateHelpers'
import { SessionConcern } from '@/concerns/SessionConcern'
import ArticleActionMenu from '@/components/articles/forms/ArticleActionMenu'
import ShareBtn from '~/components/ui/ShareBtn.vue'

export default {
  name: 'ArticleHead',
  components: { ShareBtn, ArticleActionMenu },
  mixins: [DateHelpers, SessionConcern],
  props: {
    article: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiComment
    }
  }
}
</script>
<style lang="scss" scoped>
.article-header-title {
  position: absolute;
  width: 100%;
  text-align: center;
  padding: 0.5em 0.5em 2em 1em;
  bottom: 0;
  h1 {
    font-size: 3rem;
    margin-bottom: 2px;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.3);
  }
  div {
    opacity: 0.8;
  }
}
.article-head-img {
  border-radius: 16px;
  height: 500px;
}
@media screen and (max-width: 767px) {
  .article-head-img {
    border-radius: 0;
    height: 350px;
  }
}
</style>
