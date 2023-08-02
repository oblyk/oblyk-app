<template>
  <v-container fluid>
    <div v-if="gym">
      <v-breadcrumbs :items="breadcrumbs" />
      <gym-admin-routes-tabs :gym="gym" />
      <client-only>
        <gym-routes-table
          :gym="gym"
          class="mt-4"
        />
      </client-only>
    </div>
  </v-container>
</template>

<script>
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import GymRoutesTable from '@/components/gymRoutes/GymRouteTable'
import GymAdminRoutesTabs from '~/components/gyms/layouts/GymAdminRoutesTabs.vue'

export default {
  meta: { orphanRoute: true },
  components: { GymAdminRoutesTabs, GymRoutesTable },
  mixins: [GymFetchConcern],

  i18n: {
    messages: {
      fr: {
        metaTitle: '%{name} - Gestion des ouvertures'
      },
      en: {
        metaTitle: '%{name} - Routes management'
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
          text: this.$t('components.gym.tabs.tables'),
          to: `${this.gym?.adminPath}/routes/tables`,
          exact: true
        }
      ]
    }
  }
}
</script>
