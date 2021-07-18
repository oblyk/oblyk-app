<template>
  <div class="full-height">
    <leaflet-map
      map-style="outdoor"
      :geo-jsons="geoJsons"
      :latitude-force="latitude"
      :longitude-force="longitude"
      :zoom-force="zoom"
    />
    <partner-modal />
  </div>
</template>

<script>
import LeafletMap from '@/components/maps/LeafletMap'
import PartnerApi from '@/services/oblyk-api/PartnerApi'
import store from '@/store'
import PartnerModal from '@/components/partners/PartnerModal'

export default {
  name: 'PartnerMapView',
  components: { PartnerModal, LeafletMap },

  metaInfo () {
    return {
      title: this.$t('meta.partnerMap.title'),
      meta: [
        { vmid: 'description', name: 'description', content: this.$t('meta.partnerMap.description') },
        { vmid: 'og-title', property: 'og:title', content: this.$t('meta.partnerMap.title') },
        { vmid: 'og-description', property: 'og:description', content: this.$t('meta.partnerMap.description') },
        { vmid: 'og-url', property: 'og:url', content: `${process.env.VUE_APP_OBLYK_APP_URL}/maps/climbers` }
      ]
    }
  },

  data () {
    return {
      geoJsons: null,
      latitude: null,
      longitude: null,
      zoom: null
    }
  },

  mounted () {
    this.getGeoJson()
  },

  created () {
    const urlParams = new URLSearchParams(window.location.search)
    this.latitude = urlParams.get('lat')
    this.longitude = urlParams.get('lng')
    this.zoom = this.latitude !== null ? 15 : null
  },

  methods: {
    getGeoJson: function () {
      store.commit('loader/START_LOADING')
      PartnerApi
        .geoJson()
        .then(resp => {
          this.geoJsons = { features: resp.data.features }
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
</script>
