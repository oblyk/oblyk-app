<template>
  <v-container v-if="gymSpace">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.gymSector.chooseSector') }}
        </h2>
        <v-card
          link
          :to="gymSpace.path(`sectors/${sector.id}/routes/new`)"
          class="mb-4"
          v-for="sector in gymSpace.gym_sectors"
          :key="sector.id"
        >
          <v-card-title>
            <v-icon left>
              mdi-texture-box
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
import { GymSpaceConcern } from '@/concerns/GymSpaceConcern'

export default {
  name: 'SelectGymSectorView',
  mixins: [GymSpaceConcern]
}
</script>
