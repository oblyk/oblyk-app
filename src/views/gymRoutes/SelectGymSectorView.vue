<template>
  <div>
    <spinner v-if="loadingGymSpace" />

    <v-container v-if="!loadingGymSpace">
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
  </div>
</template>
<script>
import { GymSpaceConcern } from '@/concerns/GymSpaceConcern'
import Spinner from '@/components/layouts/Spiner'

export default {
  name: 'SelectGymSectorView',
  components: { Spinner },
  mixins: [GymSpaceConcern]
}
</script>
