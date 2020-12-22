<template>
  <div>
    <v-card
      link
      flat
      :to="gym.url()"
    >
      <v-list-item three-line>
        <v-list-item-avatar
          size="70"
        >
          <v-avatar
            color="grey"
            size="70"
            tile
          >
            <v-img :src="gym.logoUrl()"></v-img>
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">
            {{ gym.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-alert
              dense
              text
              class="d-inline-block mr-1 mb-0"
            >
              SALLE
            </v-alert>
            {{ gym.country }}, {{ gym.city }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>
<script>
import Gym from '@/models/Gym'

export default {
  name: 'GymSearchResult',
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
