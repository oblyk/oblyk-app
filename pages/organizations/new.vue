<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.organization.addNew') }}
        </h2>
        <v-alert
          type="info"
          text
        >
          L'inscription des organisations est fermée pour l'instant.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  meta: { orphanRoute: true },
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Enregistrer mon organisation'
      },
      en: {
        metaTitle: 'Register my organization'
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
