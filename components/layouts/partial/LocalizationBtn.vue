<template>
  <div class="d-inline-block">
    <v-btn
      aria-label="localization btn"
      icon
      @click="showLocalizationPopup"
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
  </div>
</template>

<script>
import { mdiMapMarkerOff, mdiMapMarker } from '@mdi/js'

export default {
  name: 'LocalizationBtn',

  data () {
    return {
      mdiMapMarkerOff,
      mdiMapMarker
    }
  },

  computed: {
    localizationActivated () {
      return this.$store.state.geolocation.status === 'activate'
    }
  },

  methods: {
    showLocalizationPopup () {
      this.$root.$emit('ShowLocalizationPopup', true)
    }
  }
}
</script>
