<template>
  <v-container v-if="gym">
    <v-breadcrumbs :items="breadcrumbs" />
    <contest-form
      :gym="gym"
      submit-methode="post"
    />
  </v-container>
</template>

<script>
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import ContestForm from '~/components/contests/forms/ContestForm'

export default {
  components: { ContestForm },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Créer un contest'
      },
      en: {
        metaTitle: 'Create contest'
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
          text: this.$t('components.gymAdmin.contests'),
          to: `${this.gym?.adminPath}/contests`,
          exact: true
        },
        {
          text: this.$t('actions.new'),
          to: `${this.gym?.adminPath}/contests/new`,
          exact: true
        }
      ]
    }
  }
}
</script>
