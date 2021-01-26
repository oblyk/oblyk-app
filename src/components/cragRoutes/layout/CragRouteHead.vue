<template>
  <v-img
    dark
    height="400px"
    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
    :src="src"
  >
    <p
      class="text-right pr-5"
      v-if="cragRoute.coverFrom"
    >
      <small>{{ $t(`components.${cragRoute.coverFrom}.coverFrom`) }}</small>
    </p>
    <div
      class="crag-route-header-title"
    >
      <h1 class="loved-by-king font-weight-medium ">
        <crag-route-avatar :crag-route="cragRoute" />
        {{ cragRoute.name }}
      </h1>
      <div>
        <router-link
          class="discrete-link"
          :to="cragRoute.Crag.path()"
        >
          <v-icon small>mdi-terrain</v-icon>
          {{ cragRoute.crag.name }}
        </router-link>
      </div>
      <div>
        {{ cragRoute.crag.country }}, {{ cragRoute.crag.region }}, {{ cragRoute.crag.city }}
        <v-btn
          :to="cragRoute.path('edit')"
          small
          icon
          :title="$t('actions.edit')"
          class="ml-1"
          v-if="isLoggedIn"
        >
          <v-icon small>
            mdi-pencil
          </v-icon>
        </v-btn>
      </div>
    </div>
  </v-img>
</template>
<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import CragRouteAvatar from '@/components/cragRoutes/partial/CragRouteAvatar'

export default {
  name: 'CragRouteHead',
  components: { CragRouteAvatar },
  mixins: [SessionConcern],
  props: {
    cragRoute: Object
  },

  data () {
    return {
      src: this.cragRoute.coverUrl()
    }
  }
}
</script>

<style lang="scss" scoped>
.crag-route-header-title {
  position: absolute;
  width: 100%;
  padding: 0.5em 0.5em 1em 1em;
  bottom: 0;
  h1 {
    font-size: 3rem;
    margin-bottom: -15px;
  }
}
</style>
