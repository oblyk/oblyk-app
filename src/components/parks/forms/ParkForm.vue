<template>
  <v-form @submit.prevent="submit()">
    <v-textarea
      outlined
      required
      hide-details
      v-model="data.description"
      :label="$t('models.park.description')"
    />

    <map-input
      v-model="localization"
      :default-latitude="data.latitude || crag.latitude"
      :default-longitude="data.longitude || crag.longitude"
      :default-zoom="15"
      style-map="outdoor"
      class="mb-3"
    />

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
import ParkApi from '@/services/oblyk-api/ParkApi'
import CloseForm from '@/components/forms/CloseForm'
import MapInput from '@/components/forms/MapInput'

export default {
  name: 'ParkForm',
  components: { MapInput, CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    crag: Object,
    park: {
      type: Object,
      required: false
    }
  },

  data () {
    return {
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
      handler: function () {
        this.data.latitude = this.localization.latitude
        this.data.longitude = this.localization.longitude
      },
      deep: true
    }
  },

  methods: {
    submit: function () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? ParkApi.update(this.data) : ParkApi.create(this.data)

      promise
        .then((resp) => {
          this.$router.push(this.crag.path('maps'))
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'park')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
