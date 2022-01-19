<template>
  <client-only>
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
  </client-only>
</template>

<script>
import { CragConcern } from '~/concerns/CragConcern'
import CragApi from '~/services/oblyk-api/CragApi'
const LeafletMap = () => import('@/components/maps/LeafletMap')

export default {
  name: 'CragSectorMapView',
  components: { LeafletMap },
  mixins: [CragConcern],
  props: {
    cragSector: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      geoJsons: null
    }
  },

  computed: {
    cragSectorMetaTitle () {
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
    cragSectorMetaDescription () {
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
    cragSectorMetaUrl () {
      if (this.cragSector) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.cragSector.path}/maps`
      }
      return ''
    }
  },

  head () {
    return {
      title: this.cragSectorMetaTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.cragSectorMetaDescription
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.cragSectorMetaTitle
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.cragSectorMetaDescription
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.cragSectorMetaUrl
        }
      ]
    }
  },

  mounted () {
    this.getGeoJson()
    this.$store.commit('layout/LAYOUT_PADDING', true)
  },

  methods: {
    getGeoJson () {
      new CragApi(this.$axios, this.$auth)
        .geoJsonAround(this.crag.id)
        .then((resp) => {
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
