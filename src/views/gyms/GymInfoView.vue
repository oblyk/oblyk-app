<template>
  <div>
    <spinner v-if="load"></spinner>

    <v-container v-if="!load">
      <v-row>
        <v-col class="pa-2" md="7">
          <v-card>
            <v-card-title>Description</v-card-title>
            <v-card-text v-text="gym.description" />
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
import GymApi from '@/services/oblyk-api/gym'
import GymModel from '@/models/GymModel'
import GymContact from '@/components/gyms/GymContact'
import Spinner from '@/components/layouts/Spiner'

export default {
  name: 'GymInfoView',
  components: { Spinner, GymContact },
  data () {
    return {
      gym: null,
      load: true
    }
  },

  created () {
    this.getGym()
  },

  methods: {
    getGym: function () {
      GymApi
        .find(this.$route.params.gymId)
        .then(resp => {
          this.gym = new GymModel(resp.data)
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          this.load = false
        })
    }
  }
}
</script>
