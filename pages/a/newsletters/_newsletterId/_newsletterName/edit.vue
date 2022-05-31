<template>
  <v-container v-if="newsletter">
    <v-row justify="center">
      <v-col>
        <h2 class="mb-4">
          {{ $t('actions.edit') }} {{ newsletter.name }}
        </h2>
        <newsletter-form
          :newsletter="newsletter"
          submit-methode="put"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { NewsletterConcern } from '~/concerns/NewsletterConcern'
import NewsletterForm from '~/components/newsletters/forms/NewsletterForm'

export default {
  components: { NewsletterForm },
  mixins: [NewsletterConcern],
  middleware: ['auth']
}
</script>
