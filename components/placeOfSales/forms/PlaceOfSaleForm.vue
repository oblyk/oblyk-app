<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.name"
      outlined
      :label="$t('models.placeOfSale.name')"
      required
    />

    <v-textarea
      v-model="data.description"
      outlined
      :label="$t('models.placeOfSale.description')"
    />

    <client-only>
      <map-input
        v-model="localization"
        :default-latitude="data.latitude"
        :default-longitude="data.longitude"
        :default-zoom="isEditingForm() ? 10 : 4"
        style-map="street"
        class="mb-3"
      />
    </client-only>

    <v-text-field
      v-model="data.address"
      outlined
      :label="$t('models.placeOfSale.address')"
    />

    <v-row>
      <v-col class="col-4">
        <v-text-field
          v-model="data.postal_code"
          outlined
          :label="$t('models.placeOfSale.postal_code')"
        />
      </v-col>
      <v-col class="col-8">
        <v-text-field
          v-model="data.city"
          outlined
          :label="$t('models.placeOfSale.city')"
        />
      </v-col>
    </v-row>

    <v-text-field
      v-model="data.url"
      outlined
      :label="$t('models.placeOfSale.url')"
    />

    <close-form />
    <submit-form :overlay="submitOverlay" />
  </v-form>
</template>
<script>
import PlaceOfSaleApi from '~/services/oblyk-api/PlaceOfSaleApi'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'
import { FormHelpers } from '@/mixins/FormHelpers'
const MapInput = () => import('@/components/forms/MapInput')

export default {
  name: 'PlaceOfSaleForm',
  components: { CloseForm, SubmitForm, MapInput },
  mixins: [FormHelpers],
  props: {
    placeOfSale: {
      type: Object,
      default: null
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

  watch: {
    localization: {
      handler () {
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

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new PlaceOfSaleApi(this.$axios, this.$auth).update(this.data) : new PlaceOfSaleApi(this.$axios, this.$auth).create(this.data)

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
