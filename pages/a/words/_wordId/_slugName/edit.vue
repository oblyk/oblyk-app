<template>
  <v-container v-if="word">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.edit') }}
          {{ word.name }}
        </h2>
        <word-form
          :word="word"
          submit-methode="put"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { WordConcern } from '~/concerns/WordConcern'
import WordForm from '~/components/words/forms/WordForm'

export default {
  components: { WordForm },
  mixins: [WordConcern],
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.generics.edit', { name: (this.word || {}).name })
    }
  }
}
</script>
