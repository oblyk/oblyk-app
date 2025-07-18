<template>
  <div class="full-height d-flex flex-column">
    <div class="flex-shrink-0">
      <page-header
        :title="$t('components.layout.appDrawer.user.myMap')"
        back-to="/outdoor"
      />
    </div>
    <div class="flex-grow-1">
      <client-only>
        <leaflet-map
          map-style="outdoor"
          :geo-jsons="geoJsons"
          :track-location="false"
          :clustered="false"
          :search-place="false"
        />
      </client-only>
    </div>
  </div>
</template>

<script>
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
import PageHeader from '~/components/layouts/PageHeader'
const LeafletMap = () => import('@/components/maps/LeafletMap')

export default {
  components: { PageHeader, LeafletMap },
  mixins: [CurrentUserConcern],
  middleware: ['auth'],

  data () {
    return {
      geoJsons: null
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Ma carte'
      },
      en: {
        metaTitle: 'My map'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  mounted () {
    this.getGeoJson()
  },

  methods: {
    getGeoJson () {
      new CurrentUserApi(this.$axios, this.$auth)
        .ascendedCragsGeoJson()
        .then((resp) => {
          this.geoJsons = { features: resp.data.features }
          if (resp.data.features.length > 0) {
            setTimeout(() => {
              this.$root.$emit('fitMapOnGeoJsonBounds')
            }, 1000)
          }
        })
    }
  }
}
</script>
