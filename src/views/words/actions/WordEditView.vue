<template>
  <v-container>
    <spinner v-if="loadingWord" />
    <v-row
      v-if="!loadingWord"
      justify="center"
    >
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
import WordForm from '@/components/words/forms/WordForm'
import Spinner from '@/components/layouts/Spiner'
import { WordConcern } from '@/concerns/WordConcern'

export default {
  name: 'WordNewView',
  mixins: [WordConcern],
  components: { Spinner, WordForm }
}
</script>
