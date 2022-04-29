<template>
  <div>
    <spinner v-if="loadingGeoJson" />

    <v-form
      v-if="!loadingGeoJson"
      @submit.prevent="submit()"
    >
      <v-textarea
        v-model="data.description"
        outlined
        required
        hide-details
        :label="$t('models.park.description')"
      />

      <client-only>
        <map-input
          v-model="localization"
          :default-latitude="data.latitude || crag.latitude"
          :default-longitude="data.longitude || crag.longitude"
          :geo-jsons="geoJsons"
          :default-zoom="15"
          style-map="outdoor"
          class="mb-3"
        />
      </client-only>

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
import ParkApi from '~/services/oblyk-api/ParkApi'
import CloseForm from '@/components/forms/CloseForm'
import Spinner from '@/components/layouts/Spiner'
const MapInput = () => import('@/components/forms/MapInput')

export default {
  name: 'ParkForm',
  components: { Spinner, MapInput, CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    crag: {
      type: Object,
      default: null
    },
    park: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      geoJsons: null,
      loadingGeoJson: true,
      localization: {
        latitude: (this.park || {}).latitude,
        longitude: (this.park || {}).longitude
      },
      data: {
        id: (this.park || {}).id,
        description: (this.park || {}).description,
        latitude: (this.park || {}).latitude,
        longitude: (this.park || {}).longitude,
        crag_id: (this.park || {}).crag_id || this.crag.id
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
    }
  },

  mounted () {
    this.getGeoJsonAround()
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new ParkApi(this.$axios, this.$auth).update(this.data) : new ParkApi(this.$axios, this.$auth).create(this.data)

      promise
        .then(() => {
          this.$router.push(`${this.crag.path}/maps`)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'park')
        })
        .then(() => {
          this.submitOverlay = false
        })
    },

    getGeoJsonAround () {
      this.loadingGeoJson = true
      const parkId = (this.isEditingForm() ? this.park.id : null)
      new ParkApi(this.$axios, this.$auth)
        .geoJsonAround(
          this.data.crag_id,
          parkId
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
