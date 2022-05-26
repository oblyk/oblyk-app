import OsmNominatim from '~/services/osm-nominatim'

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
    navigatorSupportLocation () {
      return (navigator.geolocation)
    },

    getCurrentLocation () {
      if (!this.navigatorSupportLocation()) { this.currentLocalizationError = true }

      this.localizationRequesting = true
      navigator.geolocation.getCurrentPosition(this.geolocationSuccess, this.geolocationError)
    },

    geolocationSuccess (position) {
      this.currentLatitude = position.coords.latitude
      this.currentLongitude = position.coords.longitude
      localStorage.setItem('currentLatitude', this.currentLatitude)
      localStorage.setItem('currentLongitude', this.currentLongitude)

      new OsmNominatim(this.$axios)
        .reverseGeocoding(this.currentLatitude, this.currentLongitude)
        .then((resp) => {
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

    geolocationError () {
      this.currentLocalizationError = true
    },

    geoDistance (lat1, lon1, lat2, lon2, unit = 'K') {
      if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0
      } else {
        const raLat1 = Math.PI * lat1 / 180
        const radLat2 = Math.PI * lat2 / 180
        const ta = lon1 - lon2
        const radTa = Math.PI * ta / 180
        let dist = Math.sin(raLat1) * Math.sin(radLat2) + Math.cos(raLat1) * Math.cos(radLat2) * Math.cos(radTa)
        if (dist > 1) {
          dist = 1
        }
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515
        if (unit === 'K') { dist = dist * 1.609344 }
        if (unit === 'N') { dist = dist * 0.8684 }
        return Math.round(dist)
      }
    }
  }
}
