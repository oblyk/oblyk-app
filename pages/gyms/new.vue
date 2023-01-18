<template>
  <v-container>
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.gym.addNew') }}
        </h2>
        <gym-form submit-methode="post" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GymForm from '~/components/gyms/forms/GymForm'

export default {
  meta: { orphanRoute: true },
  components: { GymForm },
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: "Ajouter une nouvelle salle d'escalade"
      },
      en: {
        metaTitle: 'Add a new climbing gym'
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
