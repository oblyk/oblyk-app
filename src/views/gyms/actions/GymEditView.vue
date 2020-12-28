<template>
  <div>
    <spinner v-if="loadingGym" />

    <v-container v-if="!loadingGym">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">{{ $t('actions.edit') }} {{ gym.name }}</h2>
          <gym-form :gym="gym" method="put" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { GymConcern } from '@/concerns/GymConcern'
import GymForm from '@/components/gyms/forms/GymForm'
import Spinner from '@/components/layouts/Spiner'
import { SessionConcern } from '@/concerns/SessionConcern'
import { ProtectedGymConcern } from '@/concerns/ProtectedGymConcern'

export default {
  name: 'GymEditView',
  components: { Spinner, GymForm },
  mixins: [GymConcern, SessionConcern, ProtectedGymConcern]
}
</script>
