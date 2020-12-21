<template>
  <div>
    <spinner v-if="loadingGym" />

    <v-container v-if="!loadingGym">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">Changer le bandeau de {{ gym.name }}</h2>
          <gym-form-image
            :gym="gym"
            upload-type="banner"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { Gymable } from '@/concerns/Gymable'
import Spinner from '@/components/layouts/Spiner'
import GymFormImage from '@/components/gyms/forms/GymFormImage'

export default {
  name: 'GymBannerView',
  components: { GymFormImage, Spinner },
  mixins: [Gymable]
}
</script>
