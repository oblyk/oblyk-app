<template>
  <v-container>
    <spinner v-if="loadingTickList" />
    <crag-route-by-crag-list
      v-if="!loadingTickList"
      :crag-routes="tickList"
    />
    <p
      v-if="!loadingTickList && tickList.length === 0"
      class="text-center text--disabled mt-4 mb-4"
    >
      {{ $t('components.logBook.emptyTickList') }}
    </p>
    <crag-route-drawer />
  </v-container>
</template>

<script>
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import Spinner from '@/components/layouts/Spiner'
import CragRoute from '@/models/CragRoute'
import CragRouteDrawer from '@/components/cragRoutes/CragRouteDrawer'
import store from '@/store'
import CragRouteByCragList from '@/components/cragRoutes/CragRouteByCragList'

export default {
  name: 'CurrentUserTickListView',
  components: { CragRouteByCragList, CragRouteDrawer, Spinner },
  props: {
    user: Object
  },

  computed: {
    computedTickList: function () {
      return store.getters['auth/getTickList']
    }
  },

  watch: {
    computedTickList: function () {
      this.getTickList()
    }
  },

  data () {
    return {
      loadingTickList: true,
      tickList: []
    }
  },

  mounted () {
    this.getTickList()
  },

  methods: {
    getTickList: function () {
      this.loadingTickList = true
      CurrentUserApi
        .tickList()
        .then(resp => {
          const routes = []
          for (const route of resp.data) {
            routes.push(new CragRoute(route))
          }
          this.tickList = routes
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'tickList')
        })
        .finally(() => {
          this.loadingTickList = false
        })
    }
  }
}
</script>
