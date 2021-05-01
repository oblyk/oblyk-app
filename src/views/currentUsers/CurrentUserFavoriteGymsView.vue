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

      <loading-more :get-function="getFavoriteGyms" />

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
import Spinner from '@/components/layouts/Spiner'
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import Gym from '@/models/Gym'
import GymSmallCard from '@/components/gyms/GymSmallCard'
import LoadingMore from '@/components/layouts/LoadingMore'

export default {
  name: 'CurrentUserFavoriteGymsView',
  mixins: [CurrentUserConcern],
  components: {
    LoadingMore,
    GymSmallCard,
    Spinner
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
    getFavoriteGyms: function (page) {
      CurrentUserApi
        .favoriteGyms(page)
        .then(resp => {
          for (const follow of resp.data) {
            this.gyms.push(new Gym(follow.followable_object))
          }
          if (resp.data.length < 25) this.$root.$emit('nothingMoreToLoad')
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'user')
          this.$root.$emit('nothingMoreToLoad')
        })
        .finally(() => {
          this.loadingGyms = false
          this.$root.$emit('moreIsLoaded')
        })
    }
  }
}
</script>
