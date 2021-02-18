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
  name: 'MyProjectView',
  components: { CragRouteByCragList, CragRouteDrawer, Spinner },
  props: {
    user: Object
  },

  computed: {
    computedAscentCragRoutes: function () {
      return store.getters['auth/getAscentCragRoutes']
    }
  },

  watch: {
    computedAscentCragRoutes: function () {
      this.getProjects()
    }
  },

  data () {
    return {
      loadingProjects: true,
      projects: []
    }
  },

  mounted () {
    this.getProjects()
  },

  methods: {
    getProjects: function () {
      this.loadingProjects = true
      CurrentUserApi
        .projects()
        .then(resp => {
          const routes = []
          for (const route of resp.data) {
            routes.push(new CragRoute(route))
          }
          this.projects = routes
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'cragRoute')
        })
        .finally(() => {
          this.loadingProjects = false
        })
    }
  }
}
</script>
