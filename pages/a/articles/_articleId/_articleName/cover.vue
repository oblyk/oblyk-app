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
import { SessionConcern } from '@/concerns/SessionConcern'
import { ArticleConcern } from '@/concerns/ArticleConcern'
import ArticleCoverForm from '@/components/articles/forms/ArticleCoverForm'

export default {
  components: { ArticleCoverForm },
  mixins: [ArticleConcern, SessionConcern],

  head () {
    return {
      title: this.$t('meta.article.addCover')
    }
  }
}
</script>
