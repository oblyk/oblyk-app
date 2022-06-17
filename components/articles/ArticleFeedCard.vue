<template>
  <v-row class="pt-2">
    <v-col class="col-12 col-md-3">
      <v-img
        height="140"
        :src="article.thumbnailCoverUrl"
        :alt="article.name"
      />
    </v-col>
    <v-col class="col-12 col-md-9">
      <h4 class="article-feed-title">
        {{ article.name }}
      </h4>
      <div v-html="article.description" />
      <article-footer
        v-if="showFooter"
        class="mt-2"
        :article="article"
      />
      <p
        v-if="showReadMore"
        class="text-right"
      >
        <v-btn
          :to="article.path"
          text
          small
          color="primary"
        >
          {{ $t('actions.readMore') }}
        </v-btn>
      </p>
    </v-col>
  </v-row>
</template>

<script>
import ArticleFooter from '@/components/articles/layouts/ArticleFooter'

export default {
  name: 'ArticleFeedCard',
  components: { ArticleFooter },
  props: {
    article: {
      type: Object,
      required: true
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    showReadMore: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.article-feed-title {
  font-size: 1.4rem;
  margin-top: 0.3em;
  margin-bottom: 0.5em;
}
</style>
