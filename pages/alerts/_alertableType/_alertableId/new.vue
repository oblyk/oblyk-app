<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.addAlert') }}
        </h2>
        <alert-form
          submit-methode="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AlertForm from '~/components/alerts/forms/AlertForm'

export default {
  meta: { orphanRoute: true },
  components: { AlertForm },
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Créer une alerte'
      },
      en: {
        metaTitle: 'Create alert'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  }
}
</script>
