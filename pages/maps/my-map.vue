<template>
  <div class="full-height">
    <user-accents-tabs :user="currentUser" />
    <div style="height: calc(100% - 50px)">
      <client-only>
        <leaflet-map
          map-style="outdoor"
          :geo-jsons="geoJsons"
          :track-location="false"
          :clustered="false"
          :search-place="true"
        />
      </client-only>
    </div>
  </div>
</template>

<script>
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import UserAccentsTabs from '~/components/users/layouts/UserAscentsTabs'
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
const LeafletMap = () => import('@/components/maps/LeafletMap')

export default {
  components: { UserAccentsTabs, LeafletMap },
  mixins: [CurrentUserConcern],

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
