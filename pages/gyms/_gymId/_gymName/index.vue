<template>
  <v-container v-if="gym" fluid>
    <v-row>
      <v-col class="pa-2" md="7">
        <gym-description :gym="gym" />
      </v-col>
      <v-col class="pa-2" md="5">
        <gym-contact :gym="gym" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GymContact from '@/components/gyms/GymContact'
import GymDescription from '@/components/gyms/GymDescription'

export default {
  components: { GymDescription, GymContact },
  props: {
    gym: {
      type: Object,
      required: true
    }
  }
}
</script>
