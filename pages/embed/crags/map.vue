<template>
  <client-only>
    <div style="width: 100%; height: 100%;">
      <leaflet-map
        map-style="outdoor"
        :geo-jsons="geoJsons"
        :latitude-force="latitude"
        :longitude-force="longitude"
        :zoom-force="zoom"
        :magic-card="false"
        :search-place="false"
        :crag-add-fetching="true"
        :load-add-features="loadAddFeatures"
        :crag-map-filter="false"
        :filter-callback="getGeoJson"
        :options="{ openOnNewTab: true }"
      />
      <a
        href="https://oblyk.org/maps/crags"
        target="_blank"
        style="position: fixed; bottom: 0; left: 0; z-index: 1000; background-color: rgba(255, 255, 255, 0.8); padding: 1px 10px; text-decoration: none"
      >
        <img src="/svg/logo-black.svg" style="height: 20px; width: 20px; vertical-align: text-bottom; margin-right: 4px" alt="logo oblyk">
        Voir sur oblyk.org
      </a>
    </div>
  </client-only>
</template>
<script>
import CragApi from '~/services/oblyk-api/CragApi'

const LeafletMap = () => import('~/components/maps/LeafletMap')

export default {
  components: { LeafletMap },
  layout: 'blank',

  data () {
    return {
      geoJsons: null,
      latitude: null,
      longitude: null,
      zoom: null,
      loadAddFeatures: true
    }
  },

  mounted () {
    this.getGeoJson()
    const urlParams = new URLSearchParams(window.location.search)
    this.latitude = urlParams.get('lat')
    this.longitude = urlParams.get('lng')
  },

  methods: {
    getGeoJson (params = null) {
      new CragApi(this.$axios, this.$auth)
        .geoJson(true, params)
        .then((resp) => {
          this.geoJsons = { features: resp.data.features }
          setTimeout(() => {
            this.loadAddFeatures = true
          }, 1000)
        })
    }
  }
}
</script>
