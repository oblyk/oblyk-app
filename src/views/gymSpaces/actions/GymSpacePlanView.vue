<template>
  <div>
    <spinner v-if="loadingGymSpace" />

    <v-container v-if="!loadingGymSpace">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('components.gymSpace.uploadPlanFor', { name: gymSpace.name }) }}
          </h2>
          <gym-space-plan-form
            :gym-space="gymSpace"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Spinner from '@/components/layouts/Spiner'
import GymSpacePlanForm from '@/components/gymSpaces/forms/GymSpacePlanForm'
import { GymSpaceConcern } from '@/concerns/GymSpaceConcern'

export default {
  name: 'GymSpacePlanView',
  components: { GymSpacePlanForm, Spinner },
  mixins: [GymSpaceConcern]
}
</script>
