<template>
  <div>
    <spinner v-if="loadingGymSector" />

    <v-container v-if="!loadingGymSector">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('components.gymRoute.addNew') }}
          </h2>
          <gym-route-form
            :gym-sector="gymSector"
            submit-methode="post"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Spinner from '@/components/layouts/Spiner'
import { GymSectorConcern } from '@/concerns/GymSectorConcern'
import GymRouteForm from '@/components/gymRoutes/forms/GymRouteForm'

export default {
  components: { GymRouteForm, Spinner },
  mixins: [GymSectorConcern],

  head () {
    return {
      title: this.$t('meta.gym.route.new')
    }
  }
}
</script>
