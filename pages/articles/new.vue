<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <h2 class="mb-4">
          {{ $t('actions.writeAnArticle') }}
        </h2>
        <article-form submit-methode="post" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ArticleForm from '~/components/articles/forms/ArticleForm'

export default {
  meta: { orphanRoute: true },
  components: { ArticleForm },
  middleware: ['auth'],

  head () {
    return {
      title: 'Nouvel article'
    }
  }
}
</script>
