<template>
  <div>
    <v-img
      v-if="cragRoute.havingPicture"
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
      <crag-route-title
        :crag-route="cragRoute"
        class="crag-route-header-title-in-picture"
      />
    </v-img>
    <div
      v-else
      class="crag-route-header-title-without-picture"
    >
      <crag-route-title :crag-route="cragRoute" />
    </div>
  </div>
</template>

<script>
import CragRouteTitle from '~/components/cragRoutes/shared/CragRouteTitle'

export default {
  name: 'CragRouteHead',
  components: { CragRouteTitle },
  props: {
    cragRoute: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
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

<style lang="scss">
.crag-route-header-title-in-picture {
  position: absolute;
  width: 100%;
  padding: 0.5em 0.5em 1em 1em;
  bottom: 0;
  h1 {
    font-size: 2.5rem;
    margin-bottom: -5px;
  }
}
.crag-route-header-title-without-picture {
  padding: 1em;
  h1 {
    font-size: 2.5rem;
  }
}
</style>
