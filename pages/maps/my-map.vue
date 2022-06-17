<template>
  <client-only>
    <leaflet-map
      map-style="outdoor"
      :geo-jsons="geoJsons"
      :track-location="false"
      :clustered="false"
    />
  </client-only>
</template>

<script>
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
const LeafletMap = () => import('@/components/maps/LeafletMap')

export default {
  components: { LeafletMap },

  data () {
    return {
      geoJsons: null
    }
  },

  head () {
    return {
      title: this.$t('meta.currentUser.map')
    }
  },

  mounted () {
    this.getGeoJson()
  },

  methods: {
    getGeoJson () {
      new CurrentUserApi(this.$axios, this.$auth)
        .ascendedCragsGeoJson()
        .then((resp) => {
          this.geoJsons = { features: resp.data.features }
          if (resp.data.features.length > 0) {
            setTimeout(() => {
              this.$root.$emit('fitMapOnGeoJsonBounds')
            }, 1000)
          }
        })
    }
  }
}
</script>
