<template>
  <v-container v-if="article">
    <v-row justify="center">
      <v-col>
        <h2 class="mb-4">
          {{ $t('actions.edit') }} {{ article.name }}
        </h2>
        <article-form
          :article="article"
          submit-methode="put"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ArticleConcern } from '@/concerns/ArticleConcern'
import ArticleForm from '@/components/articles/forms/ArticleForm'

export default {
  components: { ArticleForm },
  mixins: [ArticleConcern],

  head () {
    return {
      title: this.$t('meta.generics.edit', { name: (this.article || {}).name })
    }
  }
}
</script>
