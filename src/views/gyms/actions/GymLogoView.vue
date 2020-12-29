<template>
  <div>
    <spinner v-if="loadingGym" />

    <v-container v-if="!loadingGym">
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
  </div>
</template>
<script>
import { GymConcern } from '@/concerns/GymConcern'
import { SessionConcern } from '@/concerns/SessionConcern'
import { ProtectedGymConcern } from '@/concerns/ProtectedGymConcern'
import Spinner from '@/components/layouts/Spiner'
import GymImageForm from '@/components/gyms/forms/GymImageForm'

export default {
  name: 'GymLogoView',
  components: { GymImageForm, Spinner },
  mixins: [GymConcern, SessionConcern, ProtectedGymConcern]
}
</script>
