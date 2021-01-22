<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      outlined
      v-model="data.name"
      required
      :label="$t('models.cragSector.name')"
    />

    <v-textarea
      outlined
      required
      hide-details
      v-model="data.description"
      :label="$t('models.cragSector.description')"
    />

    <v-checkbox
      v-model="setLocalization"
      label="donner une localisation"
    />

    <map-input
      v-if="setLocalization"
      v-model="localization"
      :default-latitude="data.latitude || crag.latitude"
      :default-longitude="data.longitude || crag.longitude"
      :default-zoom="15"
      style-map="outdoor"
      class="mb-3"
    />

    <rain-input v-model="data.rain" />
    <sun-input v-model="data.sun" />
    <orientation-input v-model="orientations" />

    <close-form />
    <submit-form
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
    />
  </v-form>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import CragSectorApi from '@/services/oblyk-api/CragSectorApi'
import CloseForm from '@/components/forms/CloseForm'
import CragSector from '@/models/CragSector'
import MapInput from '@/components/forms/MapInput'
import RainInput from '@/components/forms/RainInput'
import SunInput from '@/components/forms/SunInput'
import OrientationInput from '@/components/forms/OrientationInput'

export default {
  name: 'CragSectorForm',
  components: { OrientationInput, SunInput, RainInput, MapInput, CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    crag: Object,
    cragSector: {
      type: Object,
      required: false
    }
  },

  data () {
    return {
      setLocalization: ((this.cragSector || {}).latitude),
      localization: {
        latitude: (this.cragSector || {}).latitude,
        longitude: (this.cragSector || {}).longitude
      },
      orientations: this.cragSector ? this.cragSector.orientations() : [],
      data: {
        id: (this.cragSector || {}).id,
        name: (this.cragSector || {}).name,
        description: (this.cragSector || {}).description,
        latitude: (this.cragSector || {}).latitude,
        longitude: (this.cragSector || {}).longitude,
        rain: (this.cragSector || {}).rain,
        sun: (this.cragSector || {}).sun,
        north: (this.cragSector || {}).north,
        north_east: (this.cragSector || {}).north_east,
        east: (this.cragSector || {}).east,
        south_east: (this.cragSector || {}).south_east,
        south: (this.cragSector || {}).south,
        south_west: (this.cragSector || {}).south_west,
        west: (this.cragSector || {}).west,
        north_west: (this.cragSector || {}).north_west,
        crag_id: (this.cragSector || {}).crag_id || this.crag.id
      }
    }
  },

  watch: {
    localization: {
      handler: function () {
        this.data.latitude = this.localization.latitude
        this.data.longitude = this.localization.longitude
      },
      deep: true
    },
    orientations: {
      handler: function () {
        this.data.north = this.orientations.indexOf('north') !== -1
        this.data.north_east = this.orientations.indexOf('north_east') !== -1
        this.data.east = this.orientations.indexOf('east') !== -1
        this.data.south_east = this.orientations.indexOf('south_east') !== -1
        this.data.south = this.orientations.indexOf('south') !== -1
        this.data.south_west = this.orientations.indexOf('south_west') !== -1
        this.data.west = this.orientations.indexOf('west') !== -1
        this.data.north_west = this.orientations.indexOf('north_west') !== -1
      },
      deep: true
    }
  },

  methods: {
    submit: function () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? CragSectorApi.update(this.data) : CragSectorApi.create(this.data)

      if (!this.setLocalization) {
        this.data.latitude = null
        this.data.longitude = null
      }

      promise
        .then((resp) => {
          const cragSector = new CragSector(resp.data)
          this.$router.push(cragSector.path())
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'cragSector')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
