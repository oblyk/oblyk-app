<template>
  <div>
    <spinner v-if="loadingCrags" />

    <div v-if="!loadingCrags">
      <div class="row">
        <div
          v-for="(crag, index) in crags"
          :key="`crag-${index}`"
          class="col-12 col-md-6 col-lg-4"
        >
          <crag-small-card :crag="crag" />
        </div>
      </div>

      <loading-more
        :loading-more="loadingMoreData"
        :no-more-data="noMoreDataToLoad"
        :get-function="getFavoriteCrags"
      />

      <p
        v-if="crags.length === 0"
        class="text-center text--disabled mt-5 mb-5"
      >
        {{ $t('components.user.myFavoriteCragsEmpty') }}
      </p>
    </div>
  </div>
</template>

<script>
import { CurrentUserConcern } from '@/concerns/CurrentUserConcern'
import { LoadingMoreHelpers } from '@/mixins/LoadingMoreHelpers'
import Spinner from '@/components/layouts/Spiner'
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import Crag from '@/models/Crag'
import CragSmallCard from '@/components/crags/CragSmallCard'
import LoadingMore from '@/components/layouts/LoadingMore'

export default {
  components: {
    LoadingMore,
    CragSmallCard,
    Spinner
  },
  mixins: [
    CurrentUserConcern,
    LoadingMoreHelpers
  ],

  data () {
    return {
      loadingCrags: true,
      crags: []
    }
  },

  head () {
    return {
      title: this.$t('meta.currentUser.favoriteCrag')
    }
  },

  mounted () {
    this.getFavoriteCrags()
  },

  methods: {
    getFavoriteCrags () {
      this.moreIsBeingLoaded()
      new CurrentUserApi(this.$axios, this.$auth)
        .favoriteCrags(this.page)
        .then((resp) => {
          for (const follow of resp.data) {
            this.crags.push(new Crag({ attributes: follow.followable_object }))
          }
          this.successLoadingMore(resp)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.loadingCrags = false
          this.finallyMoreIsLoaded()
        })
    }
  }
}
</script>
