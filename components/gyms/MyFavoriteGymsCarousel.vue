<template>
  <div>
    <div
      v-if="firstLoading"
      class="d-flex overflow-x-auto"
    >
      <v-skeleton-loader
        v-for="index in 3"
        :key="`gym-skeleton-${index}`"
        type="image"
        class="mr-4"
        height="170"
        min-width="250"
      />
    </div>
    <gym-carousel
      v-else
      :gyms="favoriteGyms"
      :loading-more="loadingMoreData"
      :no-more-data="noMoreDataToLoad"
      :get-function="getFavoriteGyms"
      go-to-spaces
    />
  </div>
</template>
<script>
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import Gym from '~/models/Gym'
import GymCarousel from '~/components/gyms/GymCarousel.vue'

export default {
  name: 'MyFavoriteGymsCarousel',
  components: { GymCarousel },
  mixins: [LoadingMoreHelpers],

  data () {
    return {
      firstLoading: true,
      favoriteGyms: []
    }
  },

  mounted () {
    this.getFavoriteGyms()
  },

  methods: {
    getFavoriteGyms () {
      this.loadingMoreData = true
      new CurrentUserApi(this.$axios, this.$auth)
        .favoriteGyms(this.page, 5)
        .then((resp) => {
          for (const follow of resp.data) {
            this.favoriteGyms.push(new Gym({ attributes: follow.followable_object }))
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
