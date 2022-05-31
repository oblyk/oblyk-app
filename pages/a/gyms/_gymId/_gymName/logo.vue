<template>
  <v-container v-if="gym">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.changeLogo') }}
        </h2>
        <gym-image-form
          :gym="gym"
          upload-type="logo"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GymConcern } from '~/concerns/GymConcern'
import { SessionConcern } from '~/concerns/SessionConcern'
import { ProtectedGymConcern } from '~/concerns/ProtectedGymConcern'
import GymImageForm from '~/components/gyms/forms/GymImageForm'

export default {
  components: { GymImageForm },
  mixins: [GymConcern, SessionConcern, ProtectedGymConcern],
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.gym.logo')
    }
  }
}
</script>
