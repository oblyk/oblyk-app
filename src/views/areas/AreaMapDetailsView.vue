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
import AreaApi from '@/services/oblyk-api/AreaApi'
import { SessionConcern } from '@/concerns/SessionConcern'
const LeafletMap = () => import('@/components/maps/LeafletMap')

export default {
  name: 'AreaMapDetailsView',
  components: { LeafletMap },
  mixins: [SessionConcern],
  props: {
    area: Object
  },

  data () {
    return {
      geoJsons: null,
      areaMapMetaTitle: `${this.$t('meta.generics.map')} ${this.$t('meta.crag.title', {
        name: (this.area || {}).name,
        region: (this.area || {}).region
      })}`,
      areaMapMetaDescription: `${this.$t('meta.generics.map')} ${this.$t('meta.crag.description', {
        name: (this.area || {}).name,
        region: (this.area || {}).region,
        city: (this.area || {}).city
      })}`
    }
  },

  metaInfo () {
    return {
      titleTemplate: this.areaMapMetaTitle,
      meta: [
        {
          vmid: 'og-title',
          property: 'og:title',
          content: this.areaMapMetaTitle
        },
        {
          vmid: 'description',
          name: 'description',
          content: this.areaMapMetaDescription
        },
        {
          vmid: 'og-description',
          property: 'og:description',
          content: this.areaMapMetaDescription
        },
        {
          vmid: 'og-url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.area.path('guide-books')}`
        }
      ]
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
