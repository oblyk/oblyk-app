<template>
  <div class="app-height">
    <spray-wall-route-editor
      v-if="sprayWall && gym && sprayWallRoute"
      :spray-wall="sprayWall"
      :spray-wall-route="sprayWallRoute"
      :gym="gym"
    />
    <div
      v-else
      class="d-flex align-center justify-center full-height"
    >
      <div class="text-center">
        <animate-oblyk-logo animate color="#743ad5" />
        <div>
          {{ $t('models.sprayWallRoutes.load') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import OblykApi from '~/services/oblyk-api/OblykApi'
import SprayWallRouteEditor from '~/components/sprayWallRoutes/SprayWallRouteEditor'
import AnimateOblykLogo from '~/components/layouts/AnimateOblykLogo.vue'

export default {
  components: { AnimateOblykLogo, SprayWallRouteEditor },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern],
  middleware: ['auth'],

  data () {
    return {
      sprayWall: null,
      sprayWallRoute: null,
      loadingSprayWall: true,
      loadingSprayWallRoute: true
    }
  },

  mounted () {
    this.getSprayWall()
    this.getSprayWallRoute()
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
    },

    getSprayWallRoute () {
      this.loadingSprayWallRoute = true
      new OblykApi(this.$axios, this.$auth)
        .get(`/gyms/${this.$route.params.gymId}/spray_walls/${this.$route.params.sprayWallId}/spray_wall_routes/${this.$route.params.sprayWallRouteId}`)
        .then((resp) => {
          this.sprayWallRoute = resp.data
        })
        .finally(() => {
          this.loadingSprayWallRoute = false
        })
    }
  }
}
</script>
