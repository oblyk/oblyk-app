<template>
  <v-container v-if="gym">
    <v-breadcrumbs :items="breadcrumbs" />
    <indoor-subscription-lock-alert
      v-if="gym.plan === 'free'"
      feature="contest"
      :gym="gym"
    />
    <contest-form
      v-else
      :gym="gym"
      submit-methode="post"
    />
  </v-container>
</template>

<script>
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import ContestForm from '~/components/contests/forms/ContestForm'
import IndoorSubscriptionLockAlert from '~/components/indoorSubscription/IndoorSubscriptionLockAlert.vue'

export default {
  components: { IndoorSubscriptionLockAlert, ContestForm },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern],
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
