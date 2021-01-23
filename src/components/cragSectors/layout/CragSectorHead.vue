<template>
  <v-img
    dark
    height="400px"
    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
    :src="src"
  >
    <div
      class="crag-sector-header-title"
    >
      <h1 class="loved-by-king font-weight-medium ">
        {{ cragSector.name }}
      </h1>
      <div>
        <router-link
          class="discrete-link"
          :to="cragSector.Crag.path()"
        >
          <v-icon small>mdi-terrain</v-icon>
          {{ cragSector.crag.name }}
        </router-link>
      </div>
      <div>
        {{ cragSector.crag.country }}, {{ cragSector.crag.region }}, {{ cragSector.crag.city }}
        <v-btn
          :to="cragSector.path('edit')"
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

export default {
  name: 'CragSectorHead',
  mixins: [SessionConcern],
  props: {
    cragSector: Object
  },

  data () {
    return {
      src: this.cragSector.coverUrl()
    }
  },

  mounted () {
    this.$root.$on('updateCragSectorBannerSrc', (src) => {
      this.updateCragSectorBannerSrc(src)
    })
  },

  methods: {
    updateCragSectorBannerSrc: function (src) {
      this.src = src
    }
  }
}
</script>

<style lang="scss" scoped>
.crag-sector-header-title {
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
