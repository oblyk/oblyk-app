<template>
  <div>
    <p class="mb-1 font-weight-medium">
      <v-icon
        left
        color="primary"
      >
        {{ mdiTrendingUp }}
      </v-icon>
      Salles populaires
    </p>
    <gym-cover-card
      v-for="(gym, gymIndex) in gyms"
      :key="`gym-index-${gymIndex}`"
      :gym="gym"
    />
    <loading-more
      :get-function="getGyms"
      :loading-more="loadingMoreData"
      :no-more-data="noMoreDataToLoad"
    />
  </div>
</template>

<script>
import { mdiTrendingUp } from '@mdi/js'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import LoadingMore from '~/components/layouts/LoadingMore'
import GymCoverCard from '~/components/gyms/GymCoverCard'
import GymApi from '~/services/oblyk-api/GymApi'
import Gym from '~/models/Gym'

export default {
  name: 'GymsByPopularity',
  components: { GymCoverCard, LoadingMore },
  mixins: [LoadingMoreHelpers],

  data () {
    return {
      loading: true,
      gyms: [],

      mdiTrendingUp
    }
  },

  mounted () {
    this.getGyms()
  },

  methods: {
    getGyms () {
      new GymApi(this.$axios, this.$auth)
        .all(null, this.page, null, { order: 'popularity' })
        .then((resp) => {
          for (const gym of resp.data) {
            this.gyms.push(new Gym({ attributes: gym }))
          }
          this.successLoadingMore(resp)
        })
        .catch(() => {
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loading = false
          this.finallyMoreIsLoaded()
        })
    }
  }
}
</script>
