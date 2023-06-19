<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.name"
      outlined
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

    <client-only>
      <map-input
        v-model="localization"
        :default-latitude="data.latitude"
        :default-longitude="data.longitude"
        :default-zoom="data.latitude === null || data.latitude === undefined ? 4 : 13"
        style-map="street"
        class="mb-3"
      />
    </client-only>

    <div v-if="gymsAround.length > 0">
      <p class="mb-2">
        <u>
          <v-icon color="warning" left>{{ mdiAlert }}</v-icon>
          {{ $tc('components.gym.gymAroundInCreate', gymsAround.length, { count: gymsAround.length }) }}
        </u>
      </p>
      <gym-small-card
        v-for="(gym, index) in gymsAround"
        :key="`gym-around-${index}`"
        :gym="gym"
        :small="true"
        class="mb-2"
      />
      <p class="mb-8 grey--text">
        {{ $t('components.gym.doNotCreateADuplicate') }}
      </p>
    </div>

    <v-text-field
      v-model="data.address"
      outlined
      :label="$t('models.gym.address')"
    />

    <v-row>
      <v-col class="col-4">
        <v-text-field
          v-model="data.postal_code"
          outlined
          :label="$t('models.gym.postal_code')"
        />
      </v-col>
      <v-col class="col-8">
        <v-text-field
          v-model="data.city"
          outlined
          :label="$t('models.gym.city')"
        />
      </v-col>
    </v-row>

    <v-text-field
      v-model="data.big_city"
      outlined
      :label="$t('models.gym.big_city')"
    />

    <v-row>
      <v-col class="col-12 col-md-6">
        <v-text-field
          v-model="data.email"
          outlined
          :label="$t('models.gym.email')"
        />
      </v-col>
      <v-col class="col-12 col-md-6">
        <v-text-field
          v-model="data.phone_number"
          outlined
          :label="$t('models.gym.phone_number')"
        />
      </v-col>
    </v-row>

    <v-text-field
      v-model="data.web_site"
      outlined
      :label="$t('models.gym.web_site')"
    />

    <close-form />
    <submit-form
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
    />
  </v-form>
</template>

<script>
import { mdiAlert } from '@mdi/js'
import { FormHelpers } from '@/mixins/FormHelpers'
import GymApi from '~/services/oblyk-api/GymApi'
import Gym from '@/models/Gym'
import SubmitForm from '@/components/forms/SubmitForm'
import ClimbingTypeInput from '@/components/forms/ClimbingTypeInput'
import CloseForm from '@/components/forms/CloseForm'
import MarkdownInput from '@/components/forms/MarkdownInput'
import GymSmallCard from '@/components/gyms/GymSmallCard'
const MapInput = () => import('@/components/forms/MapInput')

export default {
  name: 'GymForm',
  components: {
    GymSmallCard,
    MarkdownInput,
    CloseForm,
    ClimbingTypeInput,
    SubmitForm,
    MapInput
  },
  mixins: [FormHelpers],
  props: {
    gym: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      mdiAlert,
      gymsAround: [],
      redirectTo: null,
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
      climbingTypes: this.gym ? this.gym.climbingTypes : [],
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
      handler () {
        this.data.latitude = this.localization.latitude
        this.data.longitude = this.localization.longitude
        this.data.postal_code = this.localization.postal_code
        this.data.code_country = this.localization.country_code
        this.data.country = this.localization.country
        this.data.city = this.localization.city
        this.data.address = this.localization.address
        this.data.big_city = this.localization.big_city
        this.getGymAround()
      },
      deep: true
    },
    climbingTypes: {
      handler () {
        this.data.bouldering = this.climbingTypes.includes('bouldering')
        this.data.sport_climbing = this.climbingTypes.includes('sport_climbing')
        this.data.pan = this.climbingTypes.includes('pan')
        this.data.fun_climbing = this.climbingTypes.includes('fun_climbing')
        this.data.training_space = this.climbingTypes.includes('training_space')
      },
      deep: true
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')
    const nameParam = urlParams.get('name')
    const latitudeParam = urlParams.get('latitude')
    const longitudeParam = urlParams.get('longitude')
    const postalCodeParam = urlParams.get('postal_code')
    const codeCountryParam = urlParams.get('code_country')
    const countryParam = urlParams.get('country')
    const cityParam = urlParams.get('city')
    const addressParam = urlParams.get('address')
    const bigCityParam = urlParams.get('big_city')

    if (nameParam) { this.data.name = nameParam }
    if (latitudeParam) { this.data.latitude = latitudeParam }
    if (longitudeParam) { this.data.longitude = longitudeParam }
    if (postalCodeParam) { this.data.postal_code = postalCodeParam }
    if (codeCountryParam) { this.data.code_country = codeCountryParam }
    if (countryParam) { this.data.country = countryParam }
    if (cityParam) { this.data.city = cityParam }
    if (addressParam) { this.data.address = addressParam }
    if (bigCityParam) { this.data.big_city = bigCityParam }
  },

  methods: {
    getGymAround () {
      if (this.isEditingForm()) { return }

      new GymApi(this.$axios, this.$auth)
        .gymsAround(
          this.data.latitude,
          this.data.longitude,
          1
        ).then((resp) => {
          this.gymsAround = []
          for (const gym of resp.data) {
            this.gymsAround.push(new Gym({ attributes: gym }))
          }
        })
    },

    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new GymApi(this.$axios, this.$auth).update(this.data) : new GymApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          const gym = new Gym({ attributes: resp.data })
          if (this.redirectTo) {
            this.$router.push(`${this.redirectTo}?gym_id=${gym.id}`)
          } else {
            this.$router.push(gym.path)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gym')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
