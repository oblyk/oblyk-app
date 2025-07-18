<template>
  <div>
    <p class="mb-1 font-weight-medium">
      <v-icon
        left
        color="primary"
      >
        {{ mdiTrendingUp }}
      </v-icon>
      Falaises les plus grimpées
    </p>
    <crag-cover-card
      v-for="(crag, cragIndex) in crags"
      :key="`crag-index-${cragIndex}`"
      :crag="crag"
    />
    <loading-more
      :get-function="getCrags"
      :loading-more="loadingMoreData"
      :no-more-data="noMoreDataToLoad"
    />
  </div>
</template>

<script>
import { mdiTrendingUp } from '@mdi/js'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import LoadingMore from '~/components/layouts/LoadingMore'
import CragApi from '~/services/oblyk-api/CragApi'
import Crag from '~/models/Crag'
import CragCoverCard from '~/components/crags/CragCoverCard'

export default {
  name: 'CragsByPopularity',
  components: { CragCoverCard, LoadingMore },
  mixins: [LoadingMoreHelpers],

  data () {
    return {
      loading: true,
      crags: [],

      mdiTrendingUp
    }
  },

  mounted () {
    this.getCrags()
  },

  methods: {
    getCrags () {
      new CragApi(this.$axios, this.$auth)
        .all(null, this.page, null, { order: 'popularity' })
        .then((resp) => {
          for (const crag of resp.data) {
            this.crags.push(new Crag({ attributes: crag }))
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
