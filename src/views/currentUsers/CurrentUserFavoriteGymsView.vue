<template>
  <div>
    <spinner v-if="loadingGyms" />

    <div v-if="!loadingGyms">
      <div class="row">
        <div
          v-for="(gym, index) in gyms"
          :key="`gym-${index}`"
          class="col-12 col-md-6 col-lg-4"
        >
          <gym-small-card :gym="gym" />
        </div>
      </div>

      <loading-more
        :loading-more="loadingMoreData"
        :no-more-data="noMoreDataToLoad"
        :get-function="getFavoriteGyms"
      />

      <p
        v-if="gyms.length === 0"
        class="text-center text--disabled mt-5 mb-5"
      >
        {{ $t('components.user.myFavoriteGymsEmpty') }}
      </p>
    </div>
  </div>
</template>

<script>
import { CurrentUserConcern } from '@/concerns/CurrentUserConcern'
import { LoadingMoreHelpers } from '@/mixins/LoadingMoreHelpers'
import Spinner from '@/components/layouts/Spiner'
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import Gym from '@/models/Gym'
import GymSmallCard from '@/components/gyms/GymSmallCard'
import LoadingMore from '@/components/layouts/LoadingMore'

export default {
  name: 'CurrentUserFavoriteGymsView',
  mixins: [
    CurrentUserConcern,
    LoadingMoreHelpers
  ],
  components: {
    LoadingMore,
    GymSmallCard,
    Spinner
  },

  metaInfo () {
    return {
      title: this.$t('meta.currentUser.favoriteGym')
    }
  },

  data () {
    return {
      loadingGyms: true,
      gyms: []
    }
  },

  mounted () {
    this.getFavoriteGyms()
  },

  methods: {
    getFavoriteGyms: function () {
      this.moreIsBeingLoaded()
      CurrentUserApi
        .favoriteGyms(this.page)
        .then(resp => {
          for (const follow of resp.data) {
            this.gyms.push(new Gym(follow.followable_object))
          }
          this.successLoadingMore(resp)
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'user')
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loadingGyms = false
          this.finallyMoreIsLoaded()
        })
    }
  }
}
</script>
