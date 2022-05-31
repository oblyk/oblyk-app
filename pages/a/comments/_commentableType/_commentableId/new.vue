<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.addComment') }}
        </h2>
        <comment-form
          submit-methode="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CommentForm from '~/components/comments/forms/CommentForm'

export default {
  components: { CommentForm },
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.comment.new')
    }
  }
}
</script>
