<template>
  <leaflet-map
    v-if="crag"
    class="crag-sector-map"
    :track-location="false"
    :geo-jsons="geoJsons"
    :zoom-force="16"
    :latitude-force="parseFloat(cragSector.latitude || crag.latitude)"
    :longitude-force="parseFloat(cragSector.longitude || crag.longitude)"
    :scroll-wheel-zoom="false"
    map-style="outdoor"
  />
</template>

<script>
import { CragConcern } from '@/concerns/CragConcern'
import CragApi from '@/services/oblyk-api/CragApi'
const LeafletMap = () => import('@/components/maps/LeafletMap')

export default {
  name: 'CragSectorMapView',
  components: { LeafletMap },
  mixins: [CragConcern],
  props: {
    cragSector: Object
  },

  computed: {
    cragSectorMetaTitle: function () {
      if (this.cragSector) {
        return `
        ${this.$t('meta.generics.map')}
        ${this.$t('meta.cragSector.title', {
          name: this.cragSector.name,
          crag: this.cragSector.Crag.name
        })}
        `
      }
      return ''
    },
    cragSectorMetaDescription: function () {
      if (this.cragSector) {
        return `
        ${this.$t('meta.generics.map')}
        ${this.$t('meta.cragSector.description', {
          name: this.cragSector.name,
          crag: this.cragSector.Crag.name,
          region: this.cragSector.Crag.region,
          city: this.cragSector.Crag.city
        })}
        `
      }
      return ''
    },
    cragSectorMetaUrl: function () {
      if (this.cragSector) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.cragSector.path('map')}`
      }
      return ''
    }
  },

  metaInfo () {
    return {
      title: this.cragSectorMetaTitle,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: this.cragSectorMetaDescription
        },
        {
          vmid: 'og-title',
          property: 'og:title',
          content: this.cragSectorMetaTitle
        },
        {
          vmid: 'og-description',
          property: 'og:description',
          content: this.cragSectorMetaDescription
        },
        {
          vmid: 'og-url',
          property: 'og:url',
          content: this.cragSectorMetaUrl
        }
      ]
    }
  },

  data () {
    return {
      geoJsons: null
    }
  },

  mounted () {
    this.getGeoJson()
  },

  methods: {
    getGeoJson: function () {
      CragApi
        .geoJsonAround(this.crag.id)
        .then(resp => {
          this.geoJsons = { features: resp.data.features }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.crag-sector-map {
  height: 600px;
}
</style>
