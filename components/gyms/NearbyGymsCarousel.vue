<template>
  <div>
    <div class="mb-1 d-flex">
      <div class="font-weight-medium mr-auto">
        <v-icon color="primary" left class="vertical-align-top">
          {{ mdiMapMarkerRadius }}
        </v-icon>
        {{ $t('components.indoor.nearbyClimbingGyms') }}
      </div>
      <v-btn
        small
        icon
        @click="openLocalizationPopup"
      >
        <v-icon
          small
          color="primary"
        >
          {{ mdiCog }}
        </v-icon>
      </v-btn>
    </div>

    <v-sheet
      v-if="!localizationActivated"
      class="rounded text-center pa-2"
    >
      <p class="mb-1">
        Activer la localisation pour voir les salles proches
      </p>
      <v-btn
        color="primary"
        elevation="0"
        @click="openLocalizationPopup"
      >
        <v-icon left>
          {{ mdiMapMarkerCheck }}
        </v-icon>
        {{ $t('actions.activate') }}
      </v-btn>
    </v-sheet>
    <div v-else>
      <div
        v-if="firstLoading"
        class="d-flex overflow-x-auto"
      >
        <v-skeleton-loader
          v-for="index in 3"
          :key="`gym-skeleton-${index}`"
          type="image"
          class="mr-4"
          height="170"
          min-width="250"
        />
      </div>
      <gym-carousel
        v-else
        :gyms="gyms"
        :loading-more="loadingMoreData"
        :no-more-data="noMoreDataToLoad"
        :get-function="getNearbyGyms"
        go-to-spaces
      />
    </div>
  </div>
</template>
<script>
import { mdiMapMarkerCheck, mdiMapMarkerRadius, mdiCog } from '@mdi/js'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import Gym from '~/models/Gym'
import GymCarousel from '~/components/gyms/GymCarousel'
import GymApi from '~/services/oblyk-api/GymApi'

export default {
  name: 'NearbyGymsCarousel',
  components: { GymCarousel },
  mixins: [LoadingMoreHelpers],

  data () {
    return {
      firstLoading: true,
      gyms: [],

      mdiMapMarkerCheck,
      mdiMapMarkerRadius,
      mdiCog
    }
  },

  computed: {
    localizationActivated () {
      return this.$store.getters['geolocation/localizationActivated']
    },

    IAmGeolocated () {
      return this.$store.getters['geolocation/IAmGeolocated']
    }
  },

  watch: {
    IAmGeolocated () {
      this.getNearbyGyms()
    }
  },

  mounted () {
    if (this.localizationActivated && this.localizationActivated) {
      this.getNearbyGyms()
    }
  },

  methods: {
    getNearbyGyms () {
      this.loadingMoreData = true
      let latitude = null
      let longitude = null
      if (this.IAmGeolocated) {
        latitude = this.$store.state.geolocation.latitude
        longitude = this.$store.state.geolocation.longitude
      }
      new GymApi(this.$axios, this.$auth)
        .all(
          null,
          this.page,
          5,
          { latitude, longitude }
        )
        .then((resp) => {
          for (const gym of resp.data) {
            this.gyms.push(new Gym({ attributes: gym }))
          }
          this.successLoadingMore(resp, 5)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gym')
          this.failureToLoadingMore()
        })
        .finally(() => {
          this.firstLoading = false
          this.finallyMoreIsLoaded()
        })
    },

    openLocalizationPopup () {
      this.$root.$emit('ShowLocalizationPopup', true)
    }
  }
}
</script>
