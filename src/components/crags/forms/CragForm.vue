<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      outlined
      v-model="data.name"
      required
      :label="$t('models.crag.name')"
    />

    <climbing-type-input
      v-model="climbingTypes"
      environment="crag"
    />

    <map-input
      v-model="localization"
      :default-latitude="data.latitude"
      :default-longitude="data.longitude"
      :default-zoom="isEditingForm() ? 10 : 4"
      style-map="outdoor"
      class="mb-3"
    />

    <v-row>
      <v-col>
        <v-text-field
          outlined
          v-model="data.city"
          :label="$t('models.crag.city')"
        />
      </v-col>
      <v-col>
        <v-text-field
          outlined
          v-model="data.region"
          :label="$t('models.crag.region')"
        />
      </v-col>
    </v-row>

    <rock-input v-model="data.rocks" />
    <rain-input v-model="data.rain" />
    <sun-input v-model="data.sun" />
    <season-input v-model="seasons" />
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
import CragApi from '@/services/oblyk-api/cragApi'
import CloseForm from '@/components/forms/CloseForm'
import Crag from '@/models/Crag'
import ClimbingTypeInput from '@/components/forms/ClimbingTypeInput'
import MapInput from '@/components/forms/MapInput'
import RockInput from '@/components/forms/RockInput'
import RainInput from '@/components/forms/RainInput'
import SunInput from '@/components/forms/SunInput'
import SeasonInput from '@/components/forms/SeasonInput'
import OrientationInput from '@/components/forms/OrientationInput'

export default {
  name: 'CragForm',
  components: { OrientationInput, SeasonInput, SunInput, RainInput, RockInput, MapInput, ClimbingTypeInput, CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    crag: {
      type: Object,
      required: false
    }
  },

  data () {
    return {
      localization: {
        latitude: (this.crag || {}).latitude,
        longitude: (this.crag || {}).longitude,
        code_country: (this.crag || {}).code_country,
        country: (this.crag || {}).country,
        city: (this.crag || {}).city,
        region: (this.crag || {}).region
      },
      climbingTypes: this.crag ? this.crag.climbingTypes() : [],
      seasons: this.crag ? this.crag.seasons() : [],
      orientations: this.crag ? this.crag.orientations() : [],
      data: {
        id: (this.crag || {}).id,
        name: (this.crag || {}).name,
        code_country: (this.crag || {}).code_country,
        country: (this.crag || {}).country,
        city: (this.crag || {}).city,
        region: (this.crag || {}).region,
        rocks: (this.crag || {}).rocks,
        rain: (this.crag || {}).rain,
        sun: (this.crag || {}).sun,
        bouldering: (this.crag || {}).bouldering,
        sport_climbing: (this.crag || {}).sport_climbing,
        multi_pitch: (this.crag || {}).multi_pitch,
        trad_climbing: (this.crag || {}).trad_climbing,
        aid_climbing: (this.crag || {}).aid_climbing,
        deep_water: (this.crag || {}).deep_water,
        via_ferrata: (this.crag || {}).via_ferrata,
        summer: (this.crag || {}).summer,
        autumn: (this.crag || {}).autumn,
        winter: (this.crag || {}).winter,
        spring: (this.crag || {}).spring,
        north: (this.crag || {}).north,
        north_east: (this.crag || {}).north_east,
        east: (this.crag || {}).east,
        south_east: (this.crag || {}).south_east,
        south: (this.crag || {}).south,
        south_west: (this.crag || {}).south_west,
        west: (this.crag || {}).west,
        north_west: (this.crag || {}).north_west
      }
    }
  },

  watch: {
    localization: {
      handler: function () {
        this.data.latitude = this.localization.latitude
        this.data.longitude = this.localization.longitude
        this.data.country_code = this.localization.country_code
        this.data.country = this.localization.country
        this.data.city = this.localization.city
        this.data.region = this.localization.region
      },
      deep: true
    },
    climbingTypes: {
      handler: function () {
        this.data.bouldering = this.climbingTypes.indexOf('bouldering') !== -1
        this.data.sport_climbing = this.climbingTypes.indexOf('sport_climbing') !== -1
        this.data.multi_pitch = this.climbingTypes.indexOf('multi_pitch') !== -1
        this.data.trad_climbing = this.climbingTypes.indexOf('trad_climbing') !== -1
        this.data.aid_climbing = this.climbingTypes.indexOf('aid_climbing') !== -1
        this.data.deep_water = this.climbingTypes.indexOf('deep_water') !== -1
        this.data.via_ferrata = this.climbingTypes.indexOf('via_ferrata') !== -1
      },
      deep: true
    },
    seasons: {
      handler: function () {
        this.data.summer = this.seasons.indexOf('summer') !== -1
        this.data.autumn = this.seasons.indexOf('autumn') !== -1
        this.data.winter = this.seasons.indexOf('winter') !== -1
        this.data.spring = this.seasons.indexOf('spring') !== -1
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
      const promise = (this.isEditingForm()) ? CragApi.update(this.data) : CragApi.create(this.data)

      promise
        .then((resp) => {
          const crag = new Crag(resp.data)
          this.$router.push(crag.url())
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'crag')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
