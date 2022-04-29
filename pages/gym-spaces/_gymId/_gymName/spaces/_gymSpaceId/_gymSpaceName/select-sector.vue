<template>
  <v-container v-if="gymSpace">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.gymSector.chooseSector') }}
        </h2>
        <v-card
          v-for="sector in gymSpace.gym_sectors"
          :key="sector.id"
          link
          :to="`/a${gymSpace.path}sectors/${sector.id}/routes/new`"
          class="mb-4"
        >
          <v-card-title>
            <v-icon left>
              {{ mdiTextureBox }}
            </v-icon>
            {{ sector.name }}
          </v-card-title>
          <v-card-text>
            {{ sector.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiTextureBox } from '@mdi/js'
import { GymSpaceConcern } from '@/concerns/GymSpaceConcern'

export default {
  mixins: [GymSpaceConcern],

  data () {
    return {
      mdiTextureBox
    }
  },

  head () {
    return {
      title: this.$t('meta.gym.route.chooseSector')
    }
  }
}
</script>
