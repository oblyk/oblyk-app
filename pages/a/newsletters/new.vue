<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <h2 class="mb-4">
          {{ $t('actions.writeNewsletter') }}
        </h2>
        <newsletter-form submit-methode="post" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NewsletterForm from '~/components/newsletters/forms/NewsletterForm'

export default {
  components: { NewsletterForm },
  middleware: ['auth']
}
</script>
