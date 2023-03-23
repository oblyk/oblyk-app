<template>
  <v-container>
    <h1 class="text-center mt-7 mb-4">
      {{ $t('actions.addAAscents') }} ...
    </h1>
    <v-row>
      <v-col cols="6" md="3" offset-md="3">
        <v-card to="/ascents/outdoor/new">
          <v-card-text class="text-center">
            <v-icon x-large>
              {{ mdiTerrain }}
            </v-icon>
            <p class="mb-0 mt-2 font-weight-bold">
              Outdoor
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" md="3">
        <v-card to="/ascents/indoor/new">
          <v-card-text class="text-center">
            <v-icon x-large>
              {{ mdiOfficeBuildingMarkerOutline }}
            </v-icon>
            <p class="mb-0 mt-2 font-weight-bold">
              Indoor
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiOfficeBuildingMarkerOutline, mdiTerrain } from '@mdi/js'

export default {
  data () {
    return {
      mdiTerrain,
      mdiOfficeBuildingMarkerOutline
    }
  }
}
</script>
