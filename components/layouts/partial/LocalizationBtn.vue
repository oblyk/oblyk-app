<template>
  <div class="d-inline-block">
    <v-btn
      aria-label="localization btn"
      icon
      @click="localizationPopup = !localizationPopup"
    >
      <v-icon v-if="!localizationActivated">
        {{ mdiMapMarkerOff }}
      </v-icon>
      <v-icon
        v-if="localizationActivated"
        color="primary"
      >
        {{ mdiMapMarker }}
      </v-icon>
    </v-btn>

    <v-dialog
      v-model="localizationPopup"
      max-width="600"
    >
      <v-card>
        <v-card-title class="text-h5">
          <v-icon
            v-if="!localizationActivated"
            class="mr-2"
          >
            {{ mdiMapMarkerOff }}
          </v-icon>
          <v-icon
            v-if="localizationActivated"
            class="mr-2"
          >
            {{ mdiMapMarker }}
          </v-icon>
          {{ $t('components.localization.title') }}
        </v-card-title>
        <v-card-text>
          <p class="mb-2">
            {{ $t('components.localization.explain') }}
          </p>

          <v-switch
            v-model="activatedLocalization"
            :label="activatedLocalization ? $t('components.localization.activated') : $t('components.localization.deactivated')"
            hide-details
            class="mt-0"
            @change="changeLocalizationStatus"
          />

          <div v-if="IAmGeolocated">
            <client-only>
              <div
                v-if="showMap"
                class="my-location-map mt-4"
              >
                <leaflet-map
                  class="my-location-map"
                  :latitude-force="latitude"
                  :longitude-force="longitude"
                  :clustered="false"
                  :track-location="false"
                  map-style="outdoor"
                  :show-localization="true"
                />
              </div>
            </client-only>
          </div>

          <v-alert
            class="mt-3 mb-0"
            dense
            text
            type="success"
            :icon="mdiLock"
          >
            {{ $t('components.localization.private') }}
          </v-alert>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiMapMarkerOff, mdiMapMarker, mdiLock } from '@mdi/js'
const LeafletMap = () => import('~/components/maps/LeafletMap')

export default {
  name: 'LocalizationBtn',
  components: { LeafletMap },

  data () {
    return {
      localizationPopup: false,
      showMap: false,
      loadingGetLocation: false,
      activatedLocalization: null,

      mdiMapMarkerOff,
      mdiMapMarker,
      mdiLock
    }
  },

  computed: {
    status () {
      return 'disabled'
    },

    IAmGeolocated () {
      return this.$store.getters['geolocation/IAmGeolocated']
    },

    localizationActivated () {
      return this.$store.state.geolocation.status === 'activate'
    },

    latitude () {
      return this.$store.state.geolocation.latitude
    },

    longitude () {
      return this.$store.state.geolocation.longitude
    }
  },

  watch: {
    localizationPopup () {
      if (this.localizationPopup === true) {
        setTimeout(() => {
          this.showMap = true
        }, 500)
      } else {
        this.showMap = false
      }
    }
  },

  mounted () {
    this.activatedLocalization = this.$store.state.geolocation.status === 'activate'
  },

  methods: {
    changeLocalizationStatus () {
      if (this.activatedLocalization) {
        this.$store.dispatch('geolocation/activateLocation')
      } else {
        this.$store.dispatch('geolocation/deactivateLocation')
      }
    }
  }
}
</script>

<style lang="scss">
.my-location-map {
  height: 400px;
  .vue2leaflet-map {
    &.leaflet-container {
      border-radius: 8px;
    }
  }
}
</style>
