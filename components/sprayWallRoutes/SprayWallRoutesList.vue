<template>
  <div>
    Liste des blocs
    <p v-if="loadingRoutes">
      Chargement des blocs ...
    </p>
    <div v-else>
      <v-list class="py-1">
        <spray-wall-route-item
          v-for="(sprayWallRoute, sprayWallRouteIndex) in sprayWallRoutes"
          :key="`spray-wall-route-index-${sprayWallRouteIndex}`"
          :spray-wall="sprayWall"
          :spray-wall-route="sprayWallRoute"
        />
      </v-list>
      <loading-more
        :get-function="getSprayWallRoutes"
        :loading-more="loadingMoreData"
        :no-more-data="noMoreDataToLoad"
        skeleton-type="list-item-avatar-two-line,list-item-avatar-two-line,list-item-avatar-two-line"
      />
    </div>
  </div>
</template>

<script>
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import LoadingMore from '~/components/layouts/LoadingMore'
import OblykApi from '~/services/oblyk-api/OblykApi'
import SprayWallRouteItem from '~/components/sprayWallRoutes/SprayWallRouteItem.vue'

export default {
  name: 'SprayWallRoutesList',
  components: { SprayWallRouteItem, LoadingMore },
  mixins: [LoadingMoreHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
    sprayWall: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingRoutes: true,
      sprayWallRoutes: []
    }
  },

  mounted () {
    this.getSprayWallRoutes()
  },

  methods: {
    getSprayWallRoutes () {
      this.moreIsBeingLoaded()

      new OblykApi(this.$axios, this.$auth)
        .get(
          `/gyms/${this.gym.id}/spray_walls/${this.sprayWall.id}/spray_wall_routes`,
          { page: this.page }
        )
        .then((resp) => {
          for (const route of resp.data) {
            this.sprayWallRoutes.push(route)
          }
          this.successLoadingMore(resp)
        })
        .catch(() => {
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loadingRoutes = false
          this.finallyMoreIsLoaded()
        })
    }
  }
}
</script>
