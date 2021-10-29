<template>
  <div>
    <v-container>
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

      <div class="mb-7" v-if="approaches.length > 0">
        <p class="mt-5">
          <v-icon small class="mr-1">mdi-walk</v-icon>
          {{ $t('components.approach.cardTitle') }}
        </p>
        <div
          v-for="(approach, index) in approaches"
          :key="`approach-${index}`"
        >
          <approach-card :approach="approach" />
        </div>
      </div>
    </v-container>

    <!-- Map -->
    <v-container>
      <p class="mb-2">
        <v-icon small class="mr-1">mdi-map</v-icon>
        {{ $t('components.map.title') }}
      </p>
      <div class="full-height">
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
    </v-container>
  </div>
</template>

<script>
import CragApi from '@/services/oblyk-api/CragApi'
import { SessionConcern } from '@/concerns/SessionConcern'
import ApproachApi from '@/services/oblyk-api/ApproachApi'
import Approach from '@/models/Approach'
import ApproachCard from '@/components/approaches/ApproachCard'
const LeafletMap = () => import('@/components/maps/LeafletMap')

export default {
  name: 'CragMapDetailsView',
  components: { ApproachCard, LeafletMap },
  mixins: [SessionConcern],
  props: {
    crag: Object
  },

  data () {
    return {
      geoJsons: null,
      approaches: [],
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
    this.getApproaches()
  },

  methods: {
    getGeoJson: function () {
      CragApi
        .geoJsonAround(this.crag.id)
        .then(resp => {
          this.geoJsons = { features: resp.data.features }
        })
    },

    getApproaches: function () {
      ApproachApi
        .all(this.crag.id)
        .then(resp => {
          for (const approach of resp.data) {
            this.approaches.push(new Approach(approach))
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.crag-map {
  border-radius: 5px;
  height: calc(100vh - 250px);
}
</style>
