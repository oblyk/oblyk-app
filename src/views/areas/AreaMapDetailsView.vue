<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        mdi-map
      </v-icon>
      {{ $t('components.area.cragsMap') }}
    </v-card-title>
    <v-card-text>
      <leaflet-map
        class="area-map"
        :track-location="false"
        :geo-jsons="geoJsons"
        :zoom-force="10"
        map-style="outdoor"
        :clustered="false"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import LeafletMap from '@/components/maps/LeafletMap'
import AreaApi from '@/services/oblyk-api/AreaApi'
import { SessionConcern } from '@/concerns/SessionConcern'

export default {
  name: 'AreaMapDetailsView',
  components: { LeafletMap },
  mixins: [SessionConcern],
  props: {
    area: Object
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
      AreaApi
        .geoJson(this.area.id)
        .then(resp => {
          this.geoJsons = { features: resp.data.features }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.area-map {
  height: calc(100vh - 250px);
}
</style>
