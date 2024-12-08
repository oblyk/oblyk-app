<template>
  <div>
    <h3 class="mb-2">
      <v-icon
        class="mr-2 mb-2"
      >
        {{ mdiOfficeBuilding }}
      </v-icon>
      {{ $tc('components.user.myFollowedGym', gyms.length) }}
    </h3>
    <v-sheet class="rounded pa-1">
      <div class="row">
        <div
          v-for="(gym, index) in gyms"
          :key="`gym-${index}`"
          class="col-12 col-md-6 col-lg-4 py-0 py-lg-3"
        >
          <gym-small-card
            :gym="gym"
            :callback="callback ? callback : null"
            small
            go-to-spaces
          />
        </div>

        <loading-more
          :loading-more="loadingMoreData"
          :no-more-data="noMoreDataToLoad"
          :get-function="getGyms"
        />

        <p
          v-if="gyms.length === 0 && loadingGyms === false"
          class="text-center text--disabled mt-5 mb-5"
        >
          {{ $t('components.user.myFavoriteGymsEmpty') }}
        </p>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import { mdiOfficeBuilding } from '@mdi/js'
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import GymSmallCard from '~/components/gyms/GymSmallCard.vue'
import Gym from '~/models/Gym'
import LoadingMore from '~/components/layouts/LoadingMore.vue'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'

export default {
  name: 'MyFollowedGyms',
  components: { LoadingMore, GymSmallCard },
  mixins: [LoadingMoreHelpers],

  props: {
    callback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      gyms: [],
      loadingGyms: true,

      mdiOfficeBuilding
    }
  },

  mounted () {
    this.getGyms()
  },

  methods: {
    getGyms () {
      this.loadingGyms = true
      new CurrentUserApi(this.$axios, this.$auth)
        .favoriteGyms(this.page)
        .then((resp) => {
          for (const follow of resp.data) {
            this.gyms.push(new Gym({ attributes: follow.followable_object }))
          }
          this.successLoadingMore(resp)
        })
        .catch((err) => {
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
