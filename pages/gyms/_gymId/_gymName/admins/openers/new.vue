<template>
  <v-container v-if="gym">
    <v-breadcrumbs :items="breadcrumbs" />
    <gym-opener-form
      :gym="gym"
      submit-methode="post"
    />
  </v-container>
</template>

<script>
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import GymOpenerForm from '~/components/gyms/forms/GymOpenerForm.vue'

export default {
  components: { GymOpenerForm },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Ajouter un ouvreur'
      },
      en: {
        metaTitle: 'Add opener'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  computed: {
    breadcrumbs () {
      return [
        {
          text: this.gym?.name,
          disable: true
        },
        {
          text: this.$t('components.gymAdmin.home'),
          to: `${this.gym?.adminPath}`,
          exact: true
        },
        {
          text: this.$t('components.gymAdmin.openers'),
          to: `${this.gym?.adminPath}/openers`,
          exact: true
        },
        {
          text: this.$t('actions.new'),
          to: `${this.gym?.adminPath}/openers/new`,
          exact: true
        }
      ]
    }
  }
}
</script>
