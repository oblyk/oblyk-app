<template>
  <div>
    <spinner v-if="loadingGeoJson" />

    <v-form
      v-if="!loadingGeoJson"
      @submit.prevent="submit()"
    >
      <v-text-field
        v-model="data.name"
        outlined
        required
        :label="$t('models.cragSector.name')"
      />

      <v-checkbox
        v-model="setLocalization"
        label="donner une localisation"
      />

      <client-only>
        <map-input
          v-if="setLocalization"
          v-model="localization"
          :default-latitude="data.latitude || crag.latitude"
          :default-longitude="data.longitude || crag.longitude"
          :geo-jsons="geoJsons"
          :default-zoom="15"
          style-map="outdoor"
          class="mb-3"
        />
      </client-only>

      <rain-input v-model="data.rain" />
      <sun-input v-model="data.sun" />
      <orientation-input v-model="orientations" />

      <close-form />
      <submit-form
        :overlay="submitOverlay"
        :submit-local-key="submitText()"
      />
    </v-form>
  </div>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import CragSectorApi from '~/services/oblyk-api/CragSectorApi'
import CloseForm from '@/components/forms/CloseForm'
import CragSector from '@/models/CragSector'
import RainInput from '@/components/forms/RainInput'
import SunInput from '@/components/forms/SunInput'
import OrientationInput from '@/components/forms/OrientationInput'
import Spinner from '@/components/layouts/Spiner'
const MapInput = () => import('@/components/forms/MapInput')

export default {
  name: 'CragSectorForm',
  components: {
    Spinner,
    OrientationInput,
    SunInput,
    RainInput,
    MapInput,
    CloseForm,
    SubmitForm
  },
  mixins: [FormHelpers],
  props: {
    crag: {
      type: Object,
      required: true
    },
    cragSector: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      loadingGeoJson: true,
      geoJsons: null,
      setLocalization: ((this.cragSector || {}).latitude),
      localization: {
        latitude: (this.cragSector || {}).latitude,
        longitude: (this.cragSector || {}).longitude
      },
      orientations: this.cragSector ? this.cragSector.orientations : [],
      data: {
        id: (this.cragSector || {}).id,
        name: (this.cragSector || {}).name,
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
      handler () {
        this.data.latitude = this.localization.latitude
        this.data.longitude = this.localization.longitude
      },
      deep: true
    },
    orientations: {
      handler () {
        this.data.north = this.orientations.includes('north')
        this.data.north_east = this.orientations.includes('north_east')
        this.data.east = this.orientations.includes('east')
        this.data.south_east = this.orientations.includes('south_east')
        this.data.south = this.orientations.includes('south')
        this.data.south_west = this.orientations.includes('south_west')
        this.data.west = this.orientations.includes('west')
        this.data.north_west = this.orientations.includes('north_west')
      },
      deep: true
    }
  },

  mounted () {
    this.getGeoJsonAround()
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new CragSectorApi(this.$axios, this.$auth).update(this.data) : new CragSectorApi(this.$axios, this.$auth).create(this.data)

      if (!this.setLocalization) {
        this.data.latitude = null
        this.data.longitude = null
      }

      promise
        .then((resp) => {
          const cragSector = new CragSector({ attributes: resp.data })
          this.$router.push(cragSector.path)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'cragSector')
        }).then(() => {
          this.submitOverlay = false
        })
    },

    getGeoJsonAround () {
      this.loadingGeoJson = true
      const cragSectorId = (this.isEditingForm() ? this.cragSector.id : null)
      new CragSectorApi(this.$axios, this.$auth)
        .geoJsonAround(
          this.data.crag_id,
          cragSectorId
        )
        .then((resp) => {
          this.geoJsons = { features: resp.data.features }
        })
        .finally(() => {
          this.loadingGeoJson = false
        })
    }
  }
}
</script>
