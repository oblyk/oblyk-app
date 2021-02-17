<template>
  <v-container>
    <spinner v-if="loadingTickList" />
    <tick-list-crag-route
      v-if="!loadingTickList"
      :crag-routes="tickList"
    />
    <crag-route-drawer />
  </v-container>
</template>

<script>
import TickListCragRoute from '@/components/tickLists/TickListCragRouteList'
import UserApi from '@/services/oblyk-api/UserApi'
import Spinner from '@/components/layouts/Spiner'
import CragRoute from '@/models/CragRoute'
import CragRouteDrawer from '@/components/cragRoutes/CragRouteDrawer'
import store from '@/store'

export default {
  name: 'MyTickListView',
  components: { CragRouteDrawer, Spinner, TickListCragRoute },
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
    this.$root.$on('getTickListInTickListView', () => {
      this.getTickList()
    })

    this.getTickList()
  },

  beforeDestroy () {
    this.$root.$off('getTickListInTickListView')
  },

  methods: {
    getTickList: function () {
      this.loadingTickList = true
      UserApi
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
