<template>
  <client-only>
    <leaflet-map
      v-if="cragSector"
      class="crag-sector-map"
      :track-location="false"
      :geo-jsons="geoJsons"
      :zoom-force="16"
      :latitude-force="parseFloat(cragSector.latitude || cragSector.Crag.latitude)"
      :longitude-force="parseFloat(cragSector.longitude || cragSector.Crag.longitude)"
      :scroll-wheel-zoom="false"
      map-style="outdoor"
    />
  </client-only>
</template>

<script>
import CragApi from '~/services/oblyk-api/CragApi'
const LeafletMap = () => import('@/components/maps/LeafletMap')

export default {
  name: 'CragSectorMapView',
  components: { LeafletMap },
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

  i18n: {
    messages: {
      fr: {
        metaTitle: "La carte de %{name}, secteur d'escalade de %{crag}",
        metaDescription: "La carte de  %{name}, secteur d'escalade %{crag} situé à %{city} en %{region}."
      },
      en: {
        metaTitle: 'Map of %{name}, climbing sector of %{crag}',
        metaDescription: 'Map of %{name}, climbing sector of %{crag} located at %{city} in %{region}'
      }
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

  computed: {
    cragSectorMetaTitle () {
      if (this.cragSector) {
        return this.$t('metaTitle', {
          name: this.cragSector.name,
          crag: this.cragSector.Crag.name
        })
      }
      return ''
    },
    cragSectorMetaDescription () {
      if (this.cragSector) {
        return this.$t('metaDescription', {
          name: this.cragSector.name,
          crag: this.cragSector.Crag.name,
          region: this.cragSector.Crag.region,
          city: this.cragSector.Crag.city
        })
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

  mounted () {
    this.getGeoJson()
  },

  methods: {
    getGeoJson () {
      new CragApi(this.$axios, this.$auth)
        .geoJsonAround(this.cragSector.Crag.id)
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
