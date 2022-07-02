<template>
  <v-container fluid>
    <gym-routes-table
      v-if="gym"
      :gym="gym"
    />
  </v-container>
</template>

<script>
import GymRoutesTable from '@/components/gymRoutes/GymRouteTable'
import { GymConcern } from '~/concerns/GymConcern'

export default {
  components: { GymRoutesTable },
  mixins: [GymConcern]
}
</script>
