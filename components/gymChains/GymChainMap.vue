<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        {{ mdiMap }}
      </v-icon>
      {{ $t('components.gymChain.map') }}
    </v-card-title>
    <v-card-text>
      <client-only>
        <leaflet-map
          class="gym-chain-map"
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
import GymChainApi from '~/services/oblyk-api/GymChainApi'
const LeafletMap = () => import('@/components/maps/LeafletMap')

export default {
  name: 'GymChainMap',
  components: { LeafletMap },
  props: {
    gymChain: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      geoJsons: null,

      mdiMap
    }
  },

  mounted () {
    this.getGeoJson()
  },

  methods: {
    getGeoJson () {
      new GymChainApi(this.$axios, this.$auth)
        .geoJson(this.gymChain.slug_name)
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
.gym-chain-map {
  height: calc(100vh - 250px);
}
</style>
