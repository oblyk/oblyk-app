<template>
  <div class="leaflet-bar">
    <a @click="centerMap">
      <v-icon light small :color="IAmGeolocated ? 'primary' : 'rgb(117, 117, 117)'">
        {{ mdiTarget }}
      </v-icon>
    </a>
  </div>
</template>

<script>
import { mdiTarget } from '@mdi/js'

export default {
  name: 'LeafletLocalizationCenter',

  props: {
    setMapView: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      mdiTarget
    }
  },

  computed: {
    IAmGeolocated () {
      return this.$store.getters['geolocation/IAmGeolocated']
    }
  },

  methods: {
    centerMap () {
      if (this.IAmGeolocated) {
        this.setMapView({
          latitude: this.$store.state.geolocation.latitude,
          longitude: this.$store.state.geolocation.longitude,
          zoom: 15
        })
      } else {
        this.$root.$emit('ShowLocalizationPopup', true)
      }
    }
  }
}
</script>
