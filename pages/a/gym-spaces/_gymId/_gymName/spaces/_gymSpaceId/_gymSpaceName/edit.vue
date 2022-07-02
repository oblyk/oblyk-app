<template>
  <v-container v-if="gymSpace">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.edit') }}
          "{{ gymSpace.name }}"
        </h2>
        <gym-space-form
          :gym-space="gymSpace"
          :gym-id="$route.params.gymId"
          submit-methode="put"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GymSpaceForm from '@/components/gymSpaces/forms/GymSpaceForm'
import { GymSpaceConcern } from '@/concerns/GymSpaceConcern'

export default {
  components: { GymSpaceForm },
  mixins: [GymSpaceConcern],

  head () {
    return {
      title: this.$t('meta.generics.edit', { name: (this.gymSpace || {}).name })
    }
  }
}
</script>
