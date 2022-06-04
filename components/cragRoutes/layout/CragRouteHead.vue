<template>
  <v-img
    dark
    height="400px"
    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
    :lazy-src="cragRoute.thumbnailCoverUrl"
    :src="croppedSrc"
    :srcset="`${croppedSrc} 500w, ${largeSrc} 600w`"
  >
    <p
      v-if="cragRoute.coverFrom"
      class="text-right pr-5"
    >
      <small>{{ $t(`components.${cragRoute.coverFrom}.coverFrom`) }}</small>
    </p>
    <div
      class="crag-route-header-title"
    >
      <h1 class="font-weight-medium ">
        <crag-route-avatar :crag-route="cragRoute" />
        {{ cragRoute.name }}
      </h1>
      <div>
        <nuxt-link
          class="discrete-link"
          :to="cragRoute.Crag.path"
        >
          <v-icon small>
            {{ mdiTerrain }}
          </v-icon>
          {{ cragRoute.crag.name }}
        </nuxt-link>
      </div>
      <div>
        {{ cragRoute.crag.country }}, {{ cragRoute.crag.region }}, {{ cragRoute.crag.city }}
        <client-only>
          <v-btn
            v-if="isLoggedIn"
            :to="`/a${cragRoute.aPath}/edit`"
            small
            icon
            :title="$t('actions.edit')"
            class="ml-1"
          >
            <v-icon small>
              {{ mdiPencil }}
            </v-icon>
          </v-btn>
        </client-only>
      </div>
    </div>
  </v-img>
</template>

<script>
import { mdiTerrain, mdiPencil } from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
import CragRouteAvatar from '@/components/cragRoutes/partial/CragRouteAvatar'

export default {
  name: 'CragRouteHead',
  components: { CragRouteAvatar },
  mixins: [SessionConcern],
  props: {
    cragRoute: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiTerrain,
      mdiPencil,
      croppedSrc: this.cragRoute.croppedCoverUrl,
      largeSrc: this.cragRoute.coverUrl
    }
  },

  mounted () {
    this.$root.$on('updateCragRouteBannerSrc', (src) => {
      this.updateCragRouteBannerSrc(src)
    })
  },

  beforeDestroy () {
    this.$root.$off('updateCragRouteBannerSrc')
  },

  methods: {
    updateCragRouteBannerSrc (src) {
      this.croppedSrc = src
      this.largeSrc = src
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
