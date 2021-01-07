import OsmNominatim from '@/services/osm-nominatim'

export const LocalizationHelpers = {
  data () {
    return {
      currentLatitude: null,
      currentLongitude: null,
      currentLocalization: null,
      currentLocalizationError: false,
      localizationRequesting: false
    }
  },

  methods: {
    navigatorSupportLocation: function () {
      return (navigator.geolocation)
    },

    acceptLocalization: function () {
      return (localStorage.getItem('answerForLocalization') !== 'no')
    },

    getCurrentLocation: function () {
      if (!this.navigatorSupportLocation()) this.currentLocalizationError = true

      this.localizationRequesting = true
      navigator.geolocation.getCurrentPosition(this.geolocationSuccess, this.geolocationError)
    },

    geolocationSuccess: function (position) {
      this.currentLatitude = position.coords.latitude
      this.currentLongitude = position.coords.longitude
      OsmNominatim
        .reverseGeocoding(this.currentLatitude, this.currentLongitude)
        .then(resp => {
          const address = resp.data.address
          const city = address.city || address.town || address.village
          const country = address.country
          const postalCode = address.postcode

          this.currentLocalization = `${postalCode} ${city}, ${country}`
        })
        .catch(() => {
          this.$root.$emit('alertSimpleError', 'Une erreur s\'est produite lors de la récupération le la localisation')
        })
        .finally(() => {

        })
    },

    geolocationError: function () {
      this.currentLocalizationError = true
    }
  }
}
