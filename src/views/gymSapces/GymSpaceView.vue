<template>
  <div>
    <spinner v-if="loadingGymSpace"></spinner>

    <div class="gym-spaces-routes-and-plan" v-if="!loadingGymSpace">
      <v-row class="gym-spaces-routes-and-plan-row">
        <v-col sm="12" md="3" class="routes-col">
          <gym-space-route :gym-space="gymSpace" />
        </v-col>
        <v-col sm="12" md="9" class="pt-0 pb-0">
          <gym-space-plan v-if="gymSpace.plan" :gym-space="gymSpace" />
          <gym-space-plan-missing v-if="!gymSpace.plan" :gym-space="gymSpace" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import { GymSpaceConcern } from '@/concerns/GymSpaceConcern'
import Spinner from '@/components/layouts/Spiner'
import GymSpaceRoute from '@/components/gymSpaces/GymSpaceRoute'
import GymSpacePlan from '@/components/gymSpaces/GymSpacePlan'
import GymSpacePlanMissing from '@/components/gymSpaces/GymSpacePlanMissing'

export default {
  name: 'GymSpaceView',
  components: { GymSpacePlanMissing, GymSpacePlan, GymSpaceRoute, Spinner },
  mixins: [GymSpaceConcern],
  watch: {
    '$route.params.gymSpaceId': 'getGymSpace'
  }
}
</script>
<style lang="scss">
.gym-spaces-routes-and-plan {
  .gym-spaces-routes-and-plan-row {
    margin-left: 0;
  }
}
</style>
