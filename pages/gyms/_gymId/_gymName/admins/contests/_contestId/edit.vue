<template>
  <v-container v-if="contest">
    <v-breadcrumbs :items="breadcrumbs" />
    <contest-form
      :gym="contest.gym"
      :contest="contest"
      submit-methode="put"
    />
  </v-container>
</template>

<script>
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import ContestForm from '~/components/contests/forms/ContestForm'
import { ContestConcern } from '~/concerns/ContestConcern'

export default {
  components: { ContestForm },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern, ContestConcern],
  middleware: ['auth', 'gymAdmin'],

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
          text: this.contest?.gym?.name,
          disable: true
        },
        {
          text: this.$t('components.gymAdmin.home'),
          to: `${this.contest?.gym?.adminPath}`,
          exact: true
        },
        {
          text: this.$t('components.gymAdmin.contests'),
          to: `${this.contest?.adminPath}/contests`,
          exact: true
        },
        {
          text: this.$t('actions.edit'),
          to: `${this.contest?.adminPath}/edit`,
          exact: true
        }
      ]
    }
  }
}
</script>
