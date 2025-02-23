<template>
  <v-container v-if="gym">
    <v-breadcrumbs :items="breadcrumbs" />
    <indoor-subscription-lock-alert
      v-if="gym.plan === 'free'"
      feature="championship"
      :gym="gym"
    />
    <championship-form
      v-else
      :gym="gym"
      submit-methode="post"
    />
  </v-container>
</template>

<script>
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import ChampionshipForm from '~/components/championships/forms/ChampionshipForm.vue'
import IndoorSubscriptionLockAlert from '~/components/indoorSubscription/IndoorSubscriptionLockAlert.vue'

export default {
  components: { IndoorSubscriptionLockAlert, ChampionshipForm },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern],
  middleware: ['auth', 'gymAdmin'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Créer un championnat'
      },
      en: {
        metaTitle: 'Create championship'
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
          text: this.$t('components.gymAdmin.championships'),
          to: `${this.gym?.adminPath}/contests`,
          exact: true
        },
        {
          text: this.$t('actions.new'),
          to: `${this.gym?.adminPath}/championships/new`,
          exact: true
        }
      ]
    }
  }
}
</script>
