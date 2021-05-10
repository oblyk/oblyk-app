<template>
  <v-container v-if="gymSpace">
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
</template>

<script>
import GymSpacePlanForm from '@/components/gymSpaces/forms/GymSpacePlanForm'
import { GymSpaceConcern } from '@/concerns/GymSpaceConcern'

export default {
  name: 'GymSpacePlanView',
  components: { GymSpacePlanForm },
  mixins: [GymSpaceConcern],

  metaInfo () {
    return {
      title: this.$t('meta.gym.space.plan')
    }
  }
}
</script>
