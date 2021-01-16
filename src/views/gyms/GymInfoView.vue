<template>
  <v-container v-if="gym">
    <v-row>
      <v-col class="pa-2" md="7">
        <v-card class="full-height">
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
          <v-card-text
            v-if="!gym.administered"
            class="text-center"
          >
            <v-btn
              outlined
              to="administration-request"
              color="primary"
            >
              {{ $t('components.gym.IAmManager') }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="pa-2" md="5">
        <gym-contact :gym="gym"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GymContact from '@/components/gyms/GymContact'

export default {
  name: 'GymInfoView',
  components: { GymContact },
  props: {
    gym: Object
  }
}
</script>
