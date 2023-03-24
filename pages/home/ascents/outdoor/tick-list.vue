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
    <client-only>
      <crag-route-drawer />
    </client-only>
  </v-container>
</template>

<script>
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import Spinner from '~/components/layouts/Spiner.vue'
import CragRoute from '~/models/CragRoute'
import CragRouteByCragList from '~/components/cragRoutes/CragRouteByCragList.vue'
const CragRouteDrawer = () => import('~/components/cragRoutes/CragRouteDrawer.vue')

export default {
  components: { CragRouteByCragList, CragRouteDrawer, Spinner },
  props: {
    user: { type: Object, required: true }
  },

  data () {
    return {
      loadingTickList: true,
      tickList: []
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Ma tick-list'
      },
      en: {
        metaTitle: 'My tick-list'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  computed: {
    computedTickList () {
      return this.$auth.user.tick_list
    }
  },

  watch: {
    computedTickList () {
      this.getTickList()
    }
  },

  mounted () {
    this.getTickList()
  },

  methods: {
    getTickList () {
      this.loadingTickList = true
      new CurrentUserApi(this.$axios, this.$auth)
        .tickList()
        .then((resp) => {
          const routes = []
          for (const route of resp.data) {
            routes.push(new CragRoute({ attributes: route }))
          }
          this.tickList = routes
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'tickList')
        })
        .finally(() => {
          this.loadingTickList = false
        })
    }
  }
}
</script>
