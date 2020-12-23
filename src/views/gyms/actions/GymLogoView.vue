<template>
  <div>
    <spinner v-if="loadingGym" />

    <v-container v-if="!loadingGym">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">{{ $t('actions.changeLogo') }}</h2>
          <gym-form-image
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
import Spinner from '@/components/layouts/Spiner'
import GymFormImage from '@/components/gyms/forms/GymFormImage'

export default {
  name: 'GymLogoView',
  components: { GymFormImage, Spinner },
  mixins: [GymConcern]
}
</script>
