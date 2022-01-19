<template>
  <v-container v-if="gymSpace">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.gymSpace.uploadPlanFor', { name: gymSpace.name }) }}
        </h2>
        <client-only>
          <gym-space-plan-form
            :gym-space="gymSpace"
          />
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GymSpacePlanForm from '@/components/gymSpaces/forms/GymSpacePlanForm'
import { GymSpaceConcern } from '@/concerns/GymSpaceConcern'

export default {
  components: { GymSpacePlanForm },
  mixins: [GymSpaceConcern],

  head () {
    return {
      title: this.$t('meta.gym.space.plan')
    }
  }
}
</script>
