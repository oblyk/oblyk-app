<template>
  <div class="ma-4">
    <v-skeleton-loader
      v-if="loadingRoutes"
      type="list"
    />
    <div v-else>
      <gym-route-list-item
        v-for="(route, routeIndex) in routes"
        :key="`route-index-${routeIndex}`"
        :gym-route="route"
        :click-callback="getRoute"
        class="border mb-2"
      />
      <div v-if="gym">
        <div class="text-center mt-5">
          <v-avatar>
            <v-img :src="imageVariant(gym.attachments.logo, { fit: 'crop', width: 100, height: 100 })" />
          </v-avatar>
        </div>
        <v-sheet
          class="pa-4 rounded mt-4 ml-auto mr-auto text-center"
          style="max-width: 350px"
        >
          <p>
            Découvrez le topo de <strong>{{ gym.name }}</strong> sur Oblyk.org !
          </p>
          <div>
            <v-btn
              elevation="0"
              color="primary"
              :to="`${gym.path}/spaces`"
            >
              Le topo
            </v-btn>
          </div>
        </v-sheet>
      </div>
      <v-dialog
        :key="`dialog-key-${refreshDialogKey}`"
        v-model="routeDialog"
        width="700"
      >
        <v-card class="pa-2">
          <div>
            <v-skeleton-loader
              v-if="loadingRoute"
              type="card"
            />
            <gym-route-info
              v-else
              :gym-route="gymRoute"
              :gym="gym"
              :close-callback="closeDialog"
            />
          </div>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import GymRoute from '~/models/GymRoute'
import GymRouteListItem from '~/components/gymRoutes/GymRouteListItem'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import GymRouteInfo from '~/components/gymRoutes/GymRouteInfo.vue'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  components: { GymRouteInfo, GymRouteListItem },
  mixins: [GymFetchConcern, ImageVariantHelpers],

  data () {
    return {
      loadingRoutes: true,
      loadingRoute: true,
      routeIds: [],
      routes: [],
      refreshDialogKey: 0,
      routeDialog: false,
      gymRoute: null
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.routeIds = [...urlParams.getAll('r[]')]
    this.getRoutes()
  },

  methods: {
    getRoutes () {
      this.loadingRoutes = true
      new GymRouteApi(this.$axios, this.$auth)
        .all(
          this.$route.params.gymId,
          this.routeIds,
          'grade',
          'asc'
        )
        .then((resp) => {
          this.routes = []
          for (const route of resp.data) {
            this.routes.push(new GymRoute({ attributes: route }))
          }
        })
        .finally(() => {
          this.loadingRoutes = false
        })
    },

    getRoute (route) {
      this.refreshDialogKey += 1
      this.loadingRoute = true
      this.routeDialog = true
      new GymRouteApi(this.$axios, this.$auth)
        .find(route.gym.id, route.gym_sector_id, route.id)
        .then((resp) => {
          this.gymRoute = new GymRoute({ attributes: resp.data })
        })
        .finally(() => {
          this.loadingRoute = false
        })
    },

    closeDialog () {
      this.routeDialog = false
    }
  }
}
</script>
