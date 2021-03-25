<template>
  <v-container v-if="article">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h1 class="mb-4">
          {{ $t('components.article.addCragInArticle') }}
        </h1>

        <add-crag-in-article-form
          :article="article"
        />

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ArticleConcern } from '@/concerns/ArticleConcern'
import AddCragInArticleForm from '@/components/articles/forms/AddCragInArticleForm'

export default {
  name: 'AddCragInArticleView',
  components: { AddCragInArticleForm },
  mixins: [ArticleConcern]
}
</script>
