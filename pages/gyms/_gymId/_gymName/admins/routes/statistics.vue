<template>
  <v-container fluid>
    <div v-if="gym">
      <v-breadcrumbs :items="breadcrumbs" />
      <gym-admin-routes-tabs :gym="gym" />
      <p class="text-center font-italic mt-10">
        Développement en cours ...
      </p>
    </div>
  </v-container>
</template>

<script>
import GymAdminRoutesTabs from '~/components/gyms/layouts/GymAdminRoutesTabs.vue'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'

export default {
  components: { GymAdminRoutesTabs },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern],

  i18n: {
    messages: {
      fr: {
        metaTitle: '%{name} - Statistique'
      },
      en: {
        metaTitle: '%{name} - Statistic'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle', { name: this.gym?.name })
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
          to: this.gym?.adminPath,
          exact: true
        },
        {
          text: this.$t('components.gymAdmin.routes'),
          disabled: true
        },
        {
          text: this.$t('components.gym.tabs.statistics'),
          to: `${this.gym?.adminPath}/routes/statistics`,
          exact: true
        }
      ]
    }
  }
}
</script>
