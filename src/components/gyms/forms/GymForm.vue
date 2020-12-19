<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      outlined
      v-model="data.name"
      :label="$t('models.gym.name')"
      required
    />

    <v-textarea
      outlined
      v-model="data.description"
      :label="$t('models.gym.description')"
    />

    <map-selector
      v-model="localization"
      :default-latitude="data.latitude"
      :default-longitude="data.longitude"
      :default-zoom="isEditing() ? 10 : 4"
      style-map="street"
      class="mb-3"
    />

    <v-text-field
      outlined
      v-model="data.address"
      :label="$t('models.gym.address')"
    />

    <v-row>
      <v-col>
        <v-text-field
          outlined
          v-model="data.postal_code"
          :label="$t('models.gym.postalCode')"
        />
      </v-col>
      <v-col>
        <v-text-field
          outlined
          v-model="data.city"
          :label="$t('models.gym.city')"
        />
      </v-col>
    </v-row>

    <v-text-field
      outlined
      v-model="data.big_city"
      :label="$t('models.gym.bigCity')"
    />

    <v-row>
      <v-col>
        <v-text-field
          outlined
          v-model="data.email"
          :label="$t('models.gym.email')"
        />
      </v-col>
      <v-col>
        <v-text-field
          outlined
          v-model="data.phone_number"
          :label="$t('models.gym.phoneNumber')"
        />
      </v-col>
    </v-row>

    <v-text-field
      outlined
      v-model="data.web_site"
      :label="$t('models.gym.webSite')"
    />

    <submit-form :overlay="overlay" />
  </v-form>
</template>
<script>
import GymApi from '@/services/oblyk-api/gym'
import GymModel from '@/models/GymModel'
import MapSelector from '@/components/forms/MapSelector'
import SubmitForm from '@/components/forms/SubmitForm'

export default {
  name: 'GymForm',
  components: { SubmitForm, MapSelector },
  props: {
    gym: {
      type: Object,
      required: false
    },
    method: String
  },

  data () {
    return {
      overlay: false,
      localization: {
        latitude: (this.gym || {}).latitude,
        longitude: (this.gym || {}).longitude,
        postal_code: (this.gym || {}).postal_code,
        code_country: (this.gym || {}).code_country,
        country: (this.gym || {}).country,
        city: (this.gym || {}).city,
        big_city: (this.gym || {}).big_city,
        region: (this.gym || {}).region,
        address: (this.gym || {}).address
      },
      data: {
        id: (this.gym || {}).id,
        name: (this.gym || {}).name,
        description: (this.gym || {}).description,
        address: (this.gym || {}).address,
        postal_code: (this.gym || {}).postal_code,
        code_country: (this.gym || {}).code_country,
        country: (this.gym || {}).country,
        city: (this.gym || {}).city,
        big_city: (this.gym || {}).big_city,
        email: (this.gym || {}).email,
        phone_number: (this.gym || {}).phone_number,
        web_site: (this.gym || {}).web_site,
        bouldering: (this.gym || {}).bouldering,
        training_space: (this.gym || {}).training_space,
        latitude: (this.gym || {}).latitude,
        longitude: (this.gym || {}).longitude
      }
    }
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
        this.data.big_city = this.localization.big_city
      },
      deep: true
    }
  },

  methods: {
    isEditing: function () {
      return this.method === 'put'
    },

    submit: function () {
      this.overlay = true
      const promise = (this.isEditing()) ? GymApi.update(this.data) : GymApi.create(this.data)

      promise
        .then((resp) => {
          const gym = new GymModel(resp.data)
          this.$router.push(gym.url())
        })
        .catch((err) => {
          console.error(err)
        }).then(() => {
          this.overlay = false
        })
    }
  }
}
</script>
