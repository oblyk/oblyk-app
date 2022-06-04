<template>
  <div class="full-height">
    <client-only>
      <leaflet-map
        map-style="outdoor"
        :geo-jsons="geoJsons"
        :latitude-force="latitude"
        :longitude-force="longitude"
        :zoom-force="zoom"
        :show-localization="true"
      />
      <partner-modal />
    </client-only>
  </div>
</template>

<script>
import PartnerApi from '@/services/oblyk-api/PartnerApi'
import PartnerModal from '@/components/partners/PartnerModal'
const LeafletMap = () => import('@/components/maps/LeafletMap')

export default {
  name: 'PartnerMapView',
  components: {
    PartnerModal,
    LeafletMap
  },

  data () {
    return {
      geoJsons: null,
      latitude: null,
      longitude: null,
      zoom: null
    }
  },

  head () {
    return {
      title: this.$t('meta.partnerMap.title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('meta.partnerMap.description') },
        { hid: 'o:title', property: 'og:title', content: this.$t('meta.partnerMap.title') },
        { hid: 'o:description', property: 'og:description', content: this.$t('meta.partnerMap.description') },
        { hid: 'o:url', property: 'og:url', content: `${process.env.VUE_APP_OBLYK_APP_URL}/maps/climbers` }
      ]
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.latitude = urlParams.get('lat')
    this.longitude = urlParams.get('lng')
    if (urlParams.get('zoom')) {
      this.zoom = urlParams.get('zoom')
    } else {
      this.zoom = this.latitude !== null ? 15 : null
    }
    this.getGeoJson()
    this.$store.commit('layout/LAYOUT_PADDING', true)
  },

  methods: {
    getGeoJson () {
      new PartnerApi(this.$axios, this.$auth)
        .geoJson()
        .then((resp) => {
          this.geoJsons = { features: resp.data.features }
        })
        .finally(() => {})
    }
  }
}
</script>
