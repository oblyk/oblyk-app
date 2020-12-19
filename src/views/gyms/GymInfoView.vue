<template>
  <div>
    <spinner v-if="load"></spinner>

    <v-container v-if="!load">
      <v-row>
        <v-col class="pa-2" md="7">
          <v-card>
            <v-card-title>Description</v-card-title>
            <v-card-text v-text="gym.description" />
            <v-card-text>
              <v-chip
                class="ma-1"
                v-for="climb in gym.climbingTypes()" :key="climb"
              >
                {{ $t(`models.climbs.${climb}`) }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col class="pa-2" md="5">
          <gym-contact :gym="gym"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { Gymable } from '@/concerns/Gymable'
import GymContact from '@/components/gyms/GymContact'
import Spinner from '@/components/layouts/Spiner'

export default {
  name: 'GymInfoView',
  components: { Spinner, GymContact },
  mixins: [Gymable]
}
</script>
