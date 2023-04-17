<template>
  <div class="full-height">
    <client-only>
      <leaflet-map
        map-style="outdoor"
        :geo-jsons="geoJsons"
        :latitude-force="latitude"
        :longitude-force="longitude"
        :zoom-force="zoom"
        :clustered="true"
        :locality-users="localityUsers"
      />
      <locality-user-drawer />
      <partner-modal />
    </client-only>
  </div>
</template>

<script>
import PartnerModal from '@/components/partners/PartnerModal'
import LocalityApi from '~/services/oblyk-api/LocalityApi'
import { AddLocalityUserToMap } from '~/mixins/AddLocalityUserToMap'
import LocalityUserDrawer from '~/components/localityUsers/LocalityUsersDrawer.vue'
const LeafletMap = () => import('@/components/maps/LeafletMap')

export default {
  name: 'PartnerMapView',
  components: {
    LocalityUserDrawer,
    PartnerModal,
    LeafletMap
  },
  mixins: [AddLocalityUserToMap],

  data () {
    return {
      geoJsons: null,
      latitude: null,
      longitude: null,
      zoom: null
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "La carte des grimpeur·euse·s d'Oblyk",
        metaDescription: "La carte des grimpeur·euse·s te permet de trouver un·e partenaire d'escalade près de chez toi. localise toi, trouve un·e grimpeur·euse, contact le·la et allez grimper ensemble !"
      },
      en: {
        metaTitle: 'Map of Oblyk climbers',
        metaDescription: 'The climber map allows you to find a climbing partner near you. Locate yourself, find a climber, contact him and go climbing together!'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('metaDescription') },
        { hid: 'o:title', property: 'og:title', content: this.$t('metaTitle') },
        { hid: 'o:description', property: 'og:description', content: this.$t('metaDescription') },
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
  },

  methods: {
    getGeoJson () {
      new LocalityApi(this.$axios, this.$auth)
        .geoJson()
        .then((resp) => {
          this.geoJsons = { features: resp.data.features }
        })
        .finally(() => {})
    }
  }
}
</script>
