<template>
  <v-container>
    <spinner v-if="loadingTickList" />
    <tick-list-crag-route
      v-if="!loadingTickList"
      :crag-routes="tickList"
    />
  </v-container>
</template>

<script>
import TickListCragRoute from '@/components/tickLists/TickListCragRouteList'
import UserApi from '@/services/oblyk-api/UserApi'
import Spinner from '@/components/layouts/Spiner'
import CragRoute from '@/models/CragRoute'

export default {
  name: 'MyTickList',
  components: { Spinner, TickListCragRoute },
  props: {
    user: Object
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
