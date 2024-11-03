<template>
  <v-container v-if="gym">
    <v-breadcrumbs :items="breadcrumbs" />
    <v-row justify="center">
      <v-col class="global-form-width">
        <h3 class="mb-3 mt-2">
          Nouvelle fiche
        </h3>
        <gym-opening-sheet-form
          :gym="gym"
          submit-methode="post"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import GymOpeningSheetForm from '~/components/gymOpeningSheets/forms/GymOpeningSheetForm'

export default {
  components: { GymOpeningSheetForm },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern],
  middleware: ['auth', 'gymAdmin'],

  i18n: {
    messages: {
      fr: {
        metaTitle: "Créer une fiche d'ouverture"
      },
      en: {
        metaTitle: 'Create opening sheet'
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
          text: this.$t('components.gymAdmin.openingSheet'),
          exact: true
        },
        {
          text: this.$t('actions.new'),
          exact: true
        }
      ]
    }
  }
}
</script>
