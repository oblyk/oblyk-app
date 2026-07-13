<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        {{ mdiMap }}
      </v-icon>
      {{ $t('components.area.cragsMap') }}
    </v-card-title>
    <v-card-text>
      <client-only>
        <leaflet-map
          class="area-map"
          :track-location="false"
          :geo-jsons="geoJsons"
          :zoom-force="10"
          map-style="outdoor"
          :clustered="false"
        />
      </client-only>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiMap } from '@mdi/js'
import OblykApi from '~/services/oblyk-api/OblykApi'
const LeafletMap = () => import('@/components/maps/LeafletMap')

export default {
  name: 'AreaMap',
  components: { LeafletMap },
  props: {
    area: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiMap,
      geoJsons: null
    }
  },

  mounted () {
    this.getGeoJson()
  },

  methods: {
    getGeoJson () {
      new OblykApi(this.$axios, this.$auth)
        .get(
          `/public/areas/${this.area.id}/geo_json`,
          { minimalistic: true }
        )
        .then((resp) => {
          this.geoJsons = { features: resp.data.features }
          setTimeout(() => {
            this.$root.$emit('fitMapOnGeoJsonBounds')
          }, 1000)
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
