<template>
  <v-row>
    <v-col class="col-12 col-md-3">
      <v-img
        :src="article.thumbnailCoverUrl()"
        :alt="article.name"
      />
    </v-col>
    <v-col class="col-12 col-md-9">
      <h4>{{ article.name }}</h4>
      <div v-html="article.description" />
      <article-footer
        class="mt-2"
        :article="article"
      />
    </v-col>
  </v-row>
</template>

<script>
import ArticleFooter from '@/components/articles/layouts/ArticleFooter'
export default {
  name: 'ArticleFeedCard',
  components: { ArticleFooter },
  props: {
    article: Object
  }
}
</script>
