<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      outlined
      v-model="data.name"
      :label="$t('models.gym.name')"
      required
    />

    <markdown-input
      v-model="data.description"
      :label="$t('models.gym.description')"
    />

    <climbing-type-input
      v-model="climbingTypes"
      environment="gym"
    />

    <map-input
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
      <v-col class="col-4">
        <v-text-field
          outlined
          v-model="data.postal_code"
          :label="$t('models.gym.postal_code')"
        />
      </v-col>
      <v-col class="col-8">
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
      :label="$t('models.gym.big_city')"
    />

    <v-row>
      <v-col class="col-12 col-md-6">
        <v-text-field
          outlined
          v-model="data.email"
          :label="$t('models.gym.email')"
        />
      </v-col>
      <v-col class="col-12 col-md-6">
        <v-text-field
          outlined
          v-model="data.phone_number"
          :label="$t('models.gym.phone_number')"
        />
      </v-col>
    </v-row>

    <v-text-field
      outlined
      v-model="data.web_site"
      :label="$t('models.gym.web_site')"
    />

    <close-form />
    <submit-form :overlay="overlay" />
  </v-form>
</template>
<script>
import GymApi from '@/services/oblyk-api/GymApi'
import Gym from '@/models/Gym'
import MapInput from '@/components/forms/MapInput'
import SubmitForm from '@/components/forms/SubmitForm'
import ClimbingTypeInput from '@/components/forms/ClimbingTypeInput'
import CloseForm from '@/components/forms/CloseForm'
import MarkdownInput from '@/components/forms/MarkdownInput'

export default {
  name: 'GymForm',
  components: { MarkdownInput, CloseForm, ClimbingTypeInput, SubmitForm, MapInput },
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
      climbingTypes: this.gym ? this.gym.climbingTypes() : [],
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
    },
    climbingTypes: {
      handler: function () {
        this.data.bouldering = this.climbingTypes.indexOf('bouldering') !== -1
        this.data.sport_climbing = this.climbingTypes.indexOf('sport_climbing') !== -1
        this.data.pan = this.climbingTypes.indexOf('pan') !== -1
        this.data.fun_climbing = this.climbingTypes.indexOf('fun_climbing') !== -1
        this.data.training_space = this.climbingTypes.indexOf('training_space') !== -1
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
          const gym = new Gym(resp.data)
          this.$router.push(gym.path())
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gym')
        }).then(() => {
          this.overlay = false
        })
    }
  }
}
</script>
