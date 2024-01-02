<template>
  <v-container v-if="gym">
    <v-breadcrumbs :items="breadcrumbs" />
    <gym-label-template-form
      :gym="gym"
      submit-methode="post"
    />
  </v-container>
</template>

<script>
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import GymLabelTemplateForm from '~/components/gymLabelTemplates/forms/GymLabelTemplateForm.vue'

export default {
  components: { GymLabelTemplateForm },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern],
  middleware: ['auth', 'gymAdmin'],

  i18n: {
    messages: {
      fr: {
        metaTitle: "Créer un modèle d'étiquette"
      },
      en: {
        metaTitle: 'Create label template'
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
          text: this.$t('components.gymAdmin.labelTemplate'),
          to: `${this.gym?.adminPath}/label-templates`,
          exact: true
        },
        {
          text: this.$t('actions.new'),
          to: `${this.gym?.adminPath}/label-templates/new`,
          exact: true
        }
      ]
    }
  }
}
</script>
