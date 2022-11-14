<template>
  <v-container fluid>
    <div v-if="gym">
      <v-breadcrumbs :items="breadcrumbs" />
      <gym-admin-routes-tabs :gym="gym" />
      <gym-routes-table :gym="gym" />
    </div>
  </v-container>
</template>

<script>
import GymRoutesTable from '@/components/gymRoutes/GymRouteTable'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import GymAdminRoutesTabs from '~/components/gyms/layouts/GymAdminRoutesTabs.vue'

export default {
  meta: { orphanRoute: true },
  components: { GymAdminRoutesTabs, GymRoutesTable },
  mixins: [GymFetchConcern],

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
