<template>
  <div class="full-height d-flex flex-column">
    <div class="flex-shrink-0">
      <page-header
        :title="gym ? gym.name : $t('components.layout.appDrawer.mapGyms')"
        :back-to=" gym ? gym.path : '/indoor'"
        fluid-container
      />
    </div>
    <div class="flex-grow-1">
      <client-only>
        <leaflet-map
          map-style="indoor"
          :geo-jsons="geoJsons"
          :latitude-force="latitude"
          :longitude-force="longitude"
          :zoom-force="zoom"
          :clustered="false"
        />
      </client-only>
    </div>
  </div>
</template>

<script>
import GymApi from '@/services/oblyk-api/GymApi'
import PageHeader from '~/components/layouts/PageHeader'
import Gym from '~/models/Gym'
const LeafletMap = () => import('@/components/maps/LeafletMap')

export default {
  name: 'GymMapView',
  components: { PageHeader, LeafletMap },

  data () {
    return {
      geoJsons: null,
      latitude: null,
      longitude: null,
      gymId: null,
      gym: null,
      zoom: null
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Carte des salle d'escalade en France et ailleurs",
        metaDescription: 'Voir la carte interactive des salle de grimpe sur Oblyk, que ce soit en France, ou dans le Monde, et voir leurs informations détaillées'
      },
      en: {
        metaTitle: 'Map of climbing gyms in France and elsewhere',
        metaDescription: 'See the interactive map of climbing gyms on Oblyk, either in France, or in the World, and see their detailed information'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('metaDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription') },
        { hid: 'og:url', property: 'og:url', content: `${process.env.VUE_APP_OBLYK_APP_URL}/maps/gyms` }
      ]
    }
  },

  mounted () {
    this.$store.dispatch('oblykEnvironment/clearHubs')
    this.$store.dispatch('oblykEnvironment/pushHubs', { hub: this.$route.path, page: this.$route.path })
    const urlParams = new URLSearchParams(window.location.search)
    this.latitude = urlParams.get('lat')
    this.longitude = urlParams.get('lng')
    this.gymId = urlParams.get('gym_id')
    this.zoom = this.latitude !== null ? 15 : null
    this.getGeoJson()
    if (this.gymId) {
      this.getGym()
    }
  },

  methods: {
    getGeoJson () {
      new GymApi(this.$axios, this.$auth)
        .geoJson()
        .then((resp) => {
          this.geoJsons = { features: resp.data.features }
        })
        .finally(() => {})
    },

    getGym () {
      new GymApi(this.$axios, this.$auth)
        .find(this.gymId)
        .then((resp) => {
          this.gym = new Gym({ attributes: resp.data })
        })
    }
  }
}
</script>
