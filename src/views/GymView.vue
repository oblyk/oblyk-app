<template>
  <div>
    <div v-if="!load">
      <gym-head :gym="gym" />
      <v-tabs
        show-arrows
      >
        <v-tab to="infos">
          Info
        </v-tab>
        <v-tab to="topo">
          Topos
        </v-tab>
        <gym-action-menu :gym="gym" />
      </v-tabs>

      <router-view></router-view>
    </div>
    <spinner v-if="load" />
  </div>
</template>
<script>
import GymApi from '@/services/oblyk-api/gym'
import Spinner from '@/components/layouts/Spiner'
import GymModel from '@/models/GymModel'
import GymHead from '@/components/gyms/layouts/GymHead'
import GymActionMenu from '@/components/gyms/layouts/GymActionMenu'

export default {
  name: 'GymView',
  components: { GymActionMenu, Spinner, GymHead },
  props: {
    gymId: null,
    slug: null
  },

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
        .find(this.gymId)
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
