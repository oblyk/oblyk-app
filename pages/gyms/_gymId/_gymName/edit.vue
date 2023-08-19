<template>
  <v-container v-if="gym">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.edit') }} {{ gym.name }}
        </h2>
        <gym-form :gym="gym" submit-methode="put" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GymConcern } from '~/concerns/GymConcern'
import { ProtectedGymConcern } from '~/concerns/ProtectedGymConcern'
import GymForm from '~/components/gyms/forms/GymForm'

export default {
  meta: { orphanRoute: true },
  components: { GymForm },
  mixins: [GymConcern, ProtectedGymConcern],
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('actions.editName', { name: this.gym?.name })
    }
  }
}
</script>
