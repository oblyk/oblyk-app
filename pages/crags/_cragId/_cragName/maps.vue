<template>
  <div>
    <div>
      <div
        v-if="isLoggedIn"
        class="mt-2 mb-2"
      >
        <v-btn
          text
          small
          color="primary"
          :to="`/a${crag.path}/parks/new`"
        >
          <v-icon left>
            {{ mdiParking }}
          </v-icon>
          {{ $t('actions.addPark') }}
        </v-btn>
        <v-btn
          text
          small
          color="primary"
          :to="`/a${crag.path}/approaches/new`"
        >
          <v-icon left>
            {{ mdiWalk }}
          </v-icon>
          {{ $t('actions.addApproach') }}
        </v-btn>
      </div>

      <div v-if="approaches.length > 0" class="mb-7">
        <p class="mt-5">
          <v-icon small class="mr-1">
            {{ mdiWalk }}
          </v-icon>
          {{ $t('components.approach.cardTitle') }}
        </p>
        <div
          v-for="(approach, index) in approaches"
          :key="`approach-${index}`"
        >
          <approach-card :approach="approach" />
        </div>
      </div>
    </div>

    <!-- Map -->
    <div>
      <p class="mb-2">
        <v-icon small class="mr-1">
          {{ mdiMap }}
        </v-icon>
        {{ $t('components.map.title') }}
      </p>
      <div class="full-height">
        <client-only>
          <leaflet-map
            class="crag-map"
            :track-location="false"
            :geo-jsons="geoJsons"
            :zoom-force="16"
            :latitude-force="parseFloat(crag.latitude)"
            :longitude-force="parseFloat(crag.longitude)"
            :scroll-wheel-zoom="true"
            :clustered="false"
            map-style="outdoor"
          />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiParking, mdiWalk, mdiMap } from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
import CragApi from '@/services/oblyk-api/CragApi'
import ApproachApi from '@/services/oblyk-api/ApproachApi'
import Approach from '@/models/Approach'
import ApproachCard from '@/components/approaches/ApproachCard'
const LeafletMap = () => import('@/components/maps/LeafletMap')

export default {
  name: 'CragMapDetailsView',
  components: { ApproachCard, LeafletMap },
  mixins: [SessionConcern],
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiParking,
      mdiWalk,
      mdiMap,
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

  head () {
    return {
      titleTemplate: this.cragMapMetaTitle,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.cragMapMetaTitle
        },
        {
          hid: 'description',
          name: 'description',
          content: this.cragMapMetaDescription
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.cragMapMetaDescription
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.crag.path}/maps`
        }
      ]
    }
  },

  mounted () {
    this.getGeoJson()
    this.getApproaches()
  },

  methods: {
    getGeoJson () {
      new CragApi(this.$axios, this.$auth)
        .geoJsonAround(this.crag.id)
        .then((resp) => {
          this.geoJsons = { features: resp.data.features }
        })
    },

    getApproaches () {
      new ApproachApi(this.$axios, this.$auth)
        .all(this.crag.id)
        .then((resp) => {
          for (const approach of resp.data) {
            this.approaches.push(new Approach({ attributes: approach }))
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
