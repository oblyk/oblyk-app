<template>
  <div>
    <v-img
      v-if="cragSector.havingPicture"
      dark
      height="400px"
      class="rounded"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      :lazy-src="cragSector.thumbnailCoverUrl"
      :src="croppedSrc"
      :srcset="`${croppedSrc} 500w, ${largeSrc} 600w`"
    >
      <p
        v-if="cragSector.coverFrom"
        class="text-right pr-5"
      >
        <small>{{ $t(`components.${cragSector.coverFrom}.coverFrom`) }}</small>
      </p>
      <crag-sector-head-title
        :crag-sector="cragSector"
        class="crag-sector-header-title-in-picture"
      />
    </v-img>
    <div v-else>
      <crag-sector-head-title
        :crag-sector="cragSector"
        class="crag-sector-header-title-without-picture"
      />
    </div>
  </div>
</template>

<script>
import CragSectorHeadTitle from '~/components/cragSectors/layout/CragSectorHeadTitle'

export default {
  name: 'CragSectorHead',
  components: { CragSectorHeadTitle },
  props: {
    cragSector: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      croppedSrc: this.cragSector.croppedCoverUrl,
      largeSrc: this.cragSector.coverUrl
    }
  },

  mounted () {
    this.$root.$on('updateCragSectorBannerSrc', (src) => {
      this.updateCragSectorBannerSrc(src)
    })
  },

  beforeDestroy () {
    this.$root.$off('updateCragSectorBannerSrc')
  },

  methods: {
    updateCragSectorBannerSrc (src) {
      this.croppedSrc = src
      this.largeSrc = src
    }
  }
}
</script>

<style lang="scss">
.crag-sector-header-title-in-picture {
  position: absolute;
  width: 100%;
  padding: 0.5em 0.5em 1em 1em;
  bottom: 0;
  h1 {
    font-size: 3rem;
    margin-bottom: -15px;
  }
}
.crag-sector-header-title-without-picture {
  padding: 1em;
  h1 {
    font-size: 3rem;
    margin-bottom: -10px;
  }
}
</style>
