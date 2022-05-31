<template>
  <v-container v-if="author">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.changeCover') }}
        </h2>
        <author-cover-form
          :author="author"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { SessionConcern } from '~/concerns/SessionConcern'
import { AuthorConcern } from '~/concerns/AuthorConcern'
import AuthorCoverForm from '~/components/authors/forms/AuthorCoverForm'

export default {
  components: { AuthorCoverForm },
  mixins: [AuthorConcern, SessionConcern],
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.author.cover')
    }
  }
}
</script>
