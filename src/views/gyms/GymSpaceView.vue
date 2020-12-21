<template>
  <div>
    <spinner v-if="loadingGymSpace"></spinner>

    <div class="gym-spaces-routes-and-plan" v-if="!loadingGymSpace">
      <v-row>
        <v-col sm="12" md="3">
          <gym-space-route :gym-space="gymSpace" />
        </v-col>
        <v-col sm="12" md="9" class="pt-0 pb-0">
          <gym-space-plan :gym-space="gymSpace" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import { GymSpaceable } from '@/concerns/GymSpaceable'
import Spinner from '@/components/layouts/Spiner'
import GymSpaceRoute from '@/components/gyms/GymSpaceRoute'
import GymSpacePlan from '@/components/gyms/GymSpacePlan'

export default {
  name: 'GymSpaceView',
  components: { GymSpacePlan, GymSpaceRoute, Spinner },
  mixins: [GymSpaceable]
}
</script>
