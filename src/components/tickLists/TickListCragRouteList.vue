<template>
  <div>
    <div
      class="crag-route-tick-list mb-3"
      v-for="(cragRoute, index) in cragRoutes"
      :key="`crag-route-${index}`"
    >
      <div class="crag-route-card">
        <crag-route-small-card :crag-route="cragRoute"/>
      </div>
      <div class="tick-list-remove text-center">
        <v-btn
          :title="$t('actions.removeFromMyTickList')"
          icon
          @click="removeFromTickList(cragRoute)"
        >
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import CragRouteSmallCard from '@/components/cragRoutes/CragRouteSmallCard'
import TickListApi from '@/services/oblyk-api/TickListApi'
import store from '@/store'

export default {
  name: 'TickListCragRoute',
  components: { CragRouteSmallCard },
  props: {
    cragRoutes: Array
  },

  methods: {
    removeFromTickList: function (cragRoute) {
      TickListApi
        .delete(cragRoute.id)
        .then(resp => {
          store.dispatch('auth/updateTickList', { tick_list: resp.data })
          this.$root.$emit('getTickListInTickListView')
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'tickList')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.crag-route-tick-list {
  .crag-route-card, .tick-list-remove {
    display: inline-block;
  }

  .crag-route-card {
    width: calc(100% - 100px);
  }

  .tick-list-remove {
    width: 90px;
    height: 100px;
    vertical-align: top;
    line-height: 80px;
  }
}
</style>
