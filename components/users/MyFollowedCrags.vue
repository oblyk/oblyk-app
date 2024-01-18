<template>
  <div>
    <h3 class="mb-2">
      <v-icon
        class="mr-2 mb-2"
      >
        {{ mdiTerrain }}
      </v-icon>
      {{ $tc('components.user.myFollowedCrag', crags.length) }}
    </h3>
    <v-sheet class="rounded pa-1">
      <div class="row">
        <div
          v-for="(crag, index) in crags"
          :key="`crag-${index}`"
          class="col-12 col-md-6 col-lg-4 py-0 py-lg-3"
        >
          <crag-small-card
            :crag="crag"
            :callback="callback"
            small
          />
        </div>

        <loading-more
          :loading-more="loadingMoreData"
          :no-more-data="noMoreDataToLoad"
          :get-function="getCrags"
        />

        <p
          v-if="crags.length === 0 && loadingCrags === false"
          class="text-center text--disabled mt-5 mb-5"
        >
          {{ $t('components.user.myFavoriteCragsEmpty') }}
        </p>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import { mdiTerrain } from '@mdi/js'
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import LoadingMore from '~/components/layouts/LoadingMore'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import CragSmallCard from '~/components/crags/CragSmallCard'
import Crag from '~/models/Crag'

export default {
  name: 'MyFollowedCrags',
  components: { CragSmallCard, LoadingMore },
  mixins: [LoadingMoreHelpers],

  props: {
    callback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      crags: [],
      loadingCrags: true,

      mdiTerrain
    }
  },

  mounted () {
    this.getCrags()
  },

  methods: {
    getCrags () {
      this.loadingCrags = true
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
