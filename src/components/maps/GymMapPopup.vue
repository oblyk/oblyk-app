<template>
  <v-card
    light
  >
    <v-img
      :src="gym.bannerUrl()"
      height="150px"
    ></v-img>
    <v-card-title>
      <v-avatar class="mr-1">
        <img
          :src="gym.logoUrl()"
          :alt="`logo ${gym.name}`"
        >
      </v-avatar>
      {{ gym.name }}
    </v-card-title>
    <v-card-subtitle>
      {{ gym.country }}, {{ gym.city }}
    </v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary lighten-2"
        text
        :to="gym.url()"
      >
        Voir la salle
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import Gym from '@/models/Gym'

export default {
  name: 'GymMapPopup',
  props: {
    gymData: null
  },

  data () {
    return {
      gym: new Gym(this.gymData)
    }
  }
}
</script>
