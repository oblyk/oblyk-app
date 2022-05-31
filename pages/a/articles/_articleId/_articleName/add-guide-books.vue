<template>
  <v-container v-if="article">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h1 class="mb-4">
          {{ $t('components.article.addGuideBookInArticle') }}
        </h1>
        <add-guide-book-in-article-form
          :article="article"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ArticleConcern } from '@/concerns/ArticleConcern'
import AddGuideBookInArticleForm from '@/components/articles/forms/AddGuideBookInArticleForm'

export default {
  components: { AddGuideBookInArticleForm },
  mixins: [ArticleConcern],

  head () {
    return {
      title: this.$t('meta.article.addGuideBook')
    }
  }
}
</script>
