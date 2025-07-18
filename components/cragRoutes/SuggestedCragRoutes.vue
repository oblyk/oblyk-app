<template>
  <div>
    <p class="mb-2 font-weight-medium">
      <v-icon
        left
        color="primary"
      >
        {{ mdiCreation }}
      </v-icon>
      Apprécié par les grimpeurs et grimpeuses
    </p>
    <div v-if="cragRoutes.length > 0 || loading">
      <div
        v-for="(cragRoute, cragRouteIndex) in cragRoutes"
        :key="`crag-route-index-${cragRouteIndex}`"
        class="mb-1"
        @click="clickCallback(cragRoute)"
      >
        <crag-route-small-card
          :crag-route="cragRoute"
          :linkable="false"
          small
        />
      </div>
      <loading-more
        :get-function="getSuggestedCragRoutes"
        :loading-more="loadingMoreData"
        :no-more-data="noMoreDataToLoad"
      />
    </div>
    <v-sheet
      v-else
      class="text-center border rounded pa-4 missing-background"
    >
      Ajouter des <strong>falaises à vos favoris</strong> et complétez votre <strong>carnet de croix</strong> pour que nous puissions vous présenter des voies 🙂
    </v-sheet>
  </div>
</template>
<script>
import { mdiCreation } from '@mdi/js'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import LoadingMore from '~/components/layouts/LoadingMore'
import CragRouteSmallCard from '~/components/cragRoutes/CragRouteSmallCard'
import CragRouteApi from '~/services/oblyk-api/CragRouteApi'
import CragRoute from '~/models/CragRoute'

export default {
  name: 'SuggestedCragRoutes',
  components: {
    CragRouteSmallCard,
    LoadingMore
  },
  mixins: [LoadingMoreHelpers],
  props: {
    clickCallback: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      loading: true,
      cragRoutes: [],

      mdiCreation
    }
  },

  mounted () {
    this.getSuggestedCragRoutes()
  },

  methods: {
    getSuggestedCragRoutes () {
      new CragRouteApi(this.$axios, this.$auth)
        .suggestedRoutes(this.page, 25)
        .then((resp) => {
          for (const cragRoute of resp.data) {
            this.cragRoutes.push(new CragRoute({ attributes: cragRoute }))
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
