<template>
  <v-container>
    <spinner v-if="loadingProjects" />
    <crag-route-by-crag-list
      v-if="!loadingProjects"
      :crag-routes="projects"
    />
    <p
      v-if="!loadingProjects && projects.length === 0"
      class="text-center text--disabled mt-4 mb-4"
    >
      {{ $t('components.logBook.emptyProject') }}
    </p>
    <client-only>
      <crag-route-drawer />
    </client-only>
  </v-container>
</template>

<script>
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import Spinner from '@/components/layouts/Spiner'
import CragRoute from '@/models/CragRoute'
import CragRouteByCragList from '@/components/cragRoutes/CragRouteByCragList'
const CragRouteDrawer = () => import('@/components/cragRoutes/CragRouteDrawer')

export default {
  components: {
    CragRouteByCragList,
    CragRouteDrawer,
    Spinner
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingProjects: true,
      projects: []
    }
  },

  head () {
    return {
      title: this.$t('meta.currentUser.project')
    }
  },

  computed: {
    computedAscentCragRoutes () {
      return this.$auth.user.ascent_crag_routes
    }
  },

  watch: {
    computedAscentCragRoutes () {
      this.getProjects()
    }
  },

  mounted () {
    this.getProjects()
  },

  methods: {
    getProjects () {
      this.loadingProjects = true
      new CurrentUserApi(this.$axios, this.$auth)
        .projects()
        .then((resp) => {
          const routes = []
          for (const route of resp.data) {
            routes.push(new CragRoute({ attributes: route }))
          }
          this.projects = routes
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'cragRoute')
        })
        .finally(() => {
          this.loadingProjects = false
        })
    }
  }
}
</script>
