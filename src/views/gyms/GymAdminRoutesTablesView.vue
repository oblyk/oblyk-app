<template>
  <v-container fluid>
    <gym-routes-table :gym="gym" />
  </v-container>
</template>

<script>
import GymRoutesTable from '@/components/gymRoutes/GymRouteTable'

export default {
  name: 'GymAdminRoutesTablesView',
  components: { GymRoutesTable },
  props: {
    gym: Object
  }
}
</script>
