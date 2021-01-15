<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      outlined
      v-model="data.name"
      :label="$t('models.placeOfSale.name')"
      required
    />

    <v-textarea
      outlined
      v-model="data.description"
      :label="$t('models.placeOfSale.description')"
    />

    <map-input
      v-model="localization"
      :default-latitude="data.latitude"
      :default-longitude="data.longitude"
      :default-zoom="isEditingForm() ? 10 : 4"
      style-map="street"
      class="mb-3"
    />

    <v-text-field
      outlined
      v-model="data.address"
      :label="$t('models.placeOfSale.address')"
    />

    <v-row>
      <v-col class="col-4">
        <v-text-field
          outlined
          v-model="data.postal_code"
          :label="$t('models.placeOfSale.postal_code')"
        />
      </v-col>
      <v-col class="col-8">
        <v-text-field
          outlined
          v-model="data.city"
          :label="$t('models.placeOfSale.city')"
        />
      </v-col>
    </v-row>

    <v-text-field
      outlined
      v-model="data.url"
      :label="$t('models.placeOfSale.url')"
    />

    <close-form />
    <submit-form :overlay="submitOverlay" />
  </v-form>
</template>
<script>
import PlaceOfSaleApi from '@/services/oblyk-api/PlaceOfSaleApi'
import MapInput from '@/components/forms/MapInput'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'
import { FormHelpers } from '@/mixins/FormHelpers'

export default {
  name: 'PlaceOfSaleForm',
  components: { CloseForm, SubmitForm, MapInput },
  mixins: [FormHelpers],
  props: {
    placeOfSale: {
      type: Object,
      required: false
    }
  },

  data () {
    return {
      redirectTo: null,
      localization: {
        latitude: (this.placeOfSale || {}).latitude,
        longitude: (this.placeOfSale || {}).longitude,
        postal_code: (this.placeOfSale || {}).postal_code,
        code_country: (this.placeOfSale || {}).code_country,
        country: (this.placeOfSale || {}).country,
        city: (this.placeOfSale || {}).city,
        region: (this.placeOfSale || {}).region,
        address: (this.placeOfSale || {}).address
      },
      data: {
        id: (this.placeOfSale || {}).id,
        guide_book_paper_id: (this.placeOfSale || {}).guide_book_paper_id || this.$route.params.guideBookPaperId,
        name: (this.placeOfSale || {}).name,
        description: (this.placeOfSale || {}).description,
        address: (this.placeOfSale || {}).address,
        postal_code: (this.placeOfSale || {}).postal_code,
        code_country: (this.placeOfSale || {}).code_country,
        country: (this.placeOfSale || {}).country,
        city: (this.placeOfSale || {}).city,
        url: (this.placeOfSale || {}).url,
        latitude: (this.placeOfSale || {}).latitude,
        longitude: (this.placeOfSale || {}).longitude
      }
    }
  },

  created () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')
  },

  watch: {
    localization: {
      handler: function () {
        this.data.latitude = this.localization.latitude
        this.data.longitude = this.localization.longitude
        this.data.postal_code = this.localization.postal_code
        this.data.country_code = this.localization.country_code
        this.data.country = this.localization.country
        this.data.city = this.localization.city
        this.data.address = this.localization.address
      },
      deep: true
    }
  },

  methods: {
    submit: function () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? PlaceOfSaleApi.update(this.data) : PlaceOfSaleApi.create(this.data)

      promise
        .then(() => {
          this.$router.push(this.redirectTo)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'placeOfSale')
        })
        .then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
