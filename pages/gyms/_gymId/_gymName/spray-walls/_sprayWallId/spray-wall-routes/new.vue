<template>
  <div class="app-height">
    <spray-wall-route-editor
      v-if="sprayWall"
      :spray-wall-holds="sprayWall.spray_wall_holds"
      :spray-wall="sprayWall"
      :gym="gym"
    />
  </div>
</template>

<script>
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import OblykApi from '~/services/oblyk-api/OblykApi'
import SprayWallRouteEditor from '~/components/sprayWallRoutes/SprayWallRouteEditor'

export default {
  components: { SprayWallRouteEditor },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern],
  data () {
    return {
      sprayWall: null,
      loadingSprayWall: true
    }
  },

  mounted () {
    this.getSprayWall()
  },

  methods: {
    getSprayWall () {
      this.loadingSprayWall = true
      new OblykApi(this.$axios, this.$auth)
        .get(`/gyms/${this.$route.params.gymId}/spray_walls/${this.$route.params.sprayWallId}`)
        .then((resp) => {
          this.sprayWall = resp.data
        })
        .finally(() => {
          this.loadingSprayWall = false
        })
    }
  }
}
</script>
