<template>
  <div>
    <div
      v-if="firstLoading"
      class="d-flex overflow-x-auto"
    >
      <v-skeleton-loader
        v-for="index in 3"
        :key="`crag-skeleton-${index}`"
        type="image"
        class="mr-4"
        height="170"
        min-width="250"
      />
    </div>
    <div v-else>
      <div v-if="favoriteCrags.length > 0">
        <crag-carousel
          :crags="favoriteCrags"
          :loading-more="loadingMoreData"
          :no-more-data="noMoreDataToLoad"
          :get-function="getFavoriteCrags"
        />
      </div>
      <v-sheet
        v-else
        class="text-center border rounded pa-4 missing-background"
      >
        Ajouter des falaises à vos favoris pour les voire ici !
      </v-sheet>
    </div>
  </div>
</template>
<script>
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import Crag from '~/models/Crag'
import CragCarousel from '~/components/crags/CragCarousel'

export default {
  name: 'MyFavoriteCragsCarousel',
  components: { CragCarousel },
  mixins: [LoadingMoreHelpers],

  data () {
    return {
      firstLoading: true,
      favoriteCrags: []
    }
  },

  mounted () {
    this.getFavoriteCrags()
  },

  methods: {
    getFavoriteCrags () {
      this.loadingMoreData = true
      new CurrentUserApi(this.$axios, this.$auth)
        .favoriteCrags(this.page, 5)
        .then((resp) => {
          for (const follow of resp.data) {
            this.favoriteCrags.push(new Crag({ attributes: follow.followable_object }))
          }
          this.successLoadingMore(resp, 5)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.firstLoading = false
          this.finallyMoreIsLoaded()
        })
    }
  }
}
</script>
