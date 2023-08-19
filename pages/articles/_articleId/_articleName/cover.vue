<template>
  <v-container v-if="article">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.changeCover') }}
        </h2>
        <article-cover-form
          :article="article"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ArticleConcern } from '@/concerns/ArticleConcern'
import ArticleCoverForm from '@/components/articles/forms/ArticleCoverForm'

export default {
  meta: { orphanRoute: true },
  components: { ArticleCoverForm },
  mixins: [ArticleConcern],

  head () {
    return {
      title: "Ajouter une couverture d'article"
    }
  }
}
</script>
