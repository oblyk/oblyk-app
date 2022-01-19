<template>
  <div>
    <spinner v-if="loadingGymRoute" />

    <v-container v-if="!loadingGymRoute">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('components.gymRoute.editRoute') }}
          </h2>
          <gym-route-form
            :gym-sector="gymRoute.GymSector"
            :gym-route="gymRoute"
            submit-methode="put"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { GymRouteConcern } from '@/concerns/GymRouteConcern'
import Spinner from '@/components/layouts/Spiner'
import GymRouteForm from '@/components/gymRoutes/forms/GymRouteForm'

export default {
  components: { GymRouteForm, Spinner },
  mixins: [GymRouteConcern],

  head () {
    return {
      title: this.$t('meta.gym.route.edit')
    }
  }
}
</script>
