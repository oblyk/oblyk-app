<template>
  <v-list class="rounded-sm">
    <contest-item-list
      v-for="(contest, contestIndex) in contests"
      :key="`is-coming-contest-index-${contestIndex}`"
      :contest="contest"
      :public-path="true"
    />
    <loading-more
      :get-function="getContests"
      :loading-more="loadingMoreData"
      :no-more-data="noMoreDataToLoad"
    />
  </v-list>
</template>

<script>
import OblykApi from '~/services/oblyk-api/OblykApi'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import ContestItemList from '~/components/contests/ContestItemList'
import LoadingMore from '~/components/layouts/LoadingMore'

export default {
  name: 'ContestPublicList',
  components: { LoadingMore, ContestItemList },
  mixins: [LoadingMoreHelpers],
  props: {
    projection: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      contests: []
    }
  },

  mounted () {
    this.getContests()
  },

  methods: {
    getContests () {
      this.moreIsBeingLoaded()
      new OblykApi(this.$axios, this.$auth)
        .get('/contests/publics', { projection: this.projection, page: this.page })
        .then((resp) => {
          for (const contest of resp.data) {
            this.contests.push(contest)
          }
          this.successLoadingMore(resp)
        })
        .catch(() => {
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.finallyMoreIsLoaded()
        })
    }
  }
}
</script>
