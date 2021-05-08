<template>
  <div class="full-height">
    <div
      v-if="isLoggedIn"
      class="mt-2 mb-2"
    >
      <v-btn
        text
        small
        color="primary"
        :to="crag.path('parks/new')"
      >
        <v-icon left>
          mdi-parking
        </v-icon>
        {{ $t('actions.addPark') }}
      </v-btn>
      <v-btn
        text
        small
        color="primary"
        :to="crag.path('approaches/new')"
      >
        <v-icon left>
          mdi-walk
        </v-icon>
        {{ $t('actions.addApproach') }}
      </v-btn>
    </div>
    <leaflet-map
      class="crag-map"
      :track-location="false"
      :geo-jsons="geoJsons"
      :zoom-force="16"
      :latitude-force="parseFloat(crag.latitude)"
      :longitude-force="parseFloat(crag.longitude)"
      :scroll-wheel-zoom="true"
      map-style="outdoor"
    />
  </div>
</template>

<script>
import LeafletMap from '@/components/maps/LeafletMap'
import CragApi from '@/services/oblyk-api/CragApi'
import { SessionConcern } from '@/concerns/SessionConcern'

export default {
  name: 'CragMapDetailsView',
  components: { LeafletMap },
  mixins: [SessionConcern],
  props: {
    crag: Object
  },

  data () {
    return {
      geoJsons: null,
      cragMapMetaTitle: `${this.$t('meta.generics.map')} ${this.$t('meta.crag.title', {
        name: (this.crag || {}).name,
        region: (this.crag || {}).region
      })}`,
      cragMapMetaDescription: `${this.$t('meta.generics.map')} ${this.$t('meta.crag.description', {
        name: (this.crag || {}).name,
        region: (this.crag || {}).region,
        city: (this.crag || {}).city
      })}`
    }
  },

  metaInfo () {
    return {
      titleTemplate: this.cragMapMetaTitle,
      meta: [
        {
          vmid: 'og-title',
          property: 'og:title',
          content: this.cragMapMetaTitle
        },
        {
          vmid: 'description',
          name: 'description',
          content: this.cragMapMetaDescription
        },
        {
          vmid: 'og-description',
          property: 'og:description',
          content: this.cragMapMetaDescription
        },
        {
          vmid: 'og-url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.crag.path('maps')}`
        }
      ]
    }
  },

  mounted () {
    this.getGeoJson()
  },

  methods: {
    getGeoJson: function () {
      CragApi
        .geoJsonAround(this.crag.id)
        .then(resp => {
          this.geoJsons = { features: resp.data.features }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.crag-map {
  height: calc(100vh - 250px);
}
</style>
