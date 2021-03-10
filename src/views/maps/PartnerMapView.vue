<template>
  <div class="full-height">
    <leaflet-map
      map-style="outdoor"
      :geo-jsons="geoJsons"
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
