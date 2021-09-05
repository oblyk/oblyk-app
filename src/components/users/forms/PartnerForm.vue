<template>
  <div>
    <v-form @submit.prevent="submit()">

      <v-checkbox
        v-model="data.partner_search"
        :label="$t('models.user.partner_search')"
      />

      <div
        v-if="data.partner_search"
      >
        <p class="mt-5">
          {{ $t('components.user.whatClimbingType') }}
        </p>
        <climbing-type-input
          v-model="climbingTypes"
          environment="user"
        />

        <p class="mt-5">
          {{ $t('components.user.whichLevel') }}
        </p>
        <v-row>
          <v-col>
            <v-select
              v-model="data.grade_min"
              :items="gradesList"
              item-value="value"
              item-text="text"
              :label="$t('models.user.grade_min')"
              outlined
            />
          </v-col>
          <v-col>
            <v-select
              v-model="data.grade_max"
              :items="gradesList"
              item-value="value"
              item-text="text"
              :label="$t('models.user.grade_max')"
              outlined
            />
          </v-col>
        </v-row>

        <p class="mt-5">
          {{ $t('components.user.completeBio') }}
        </p>
        <!-- Bio -->
        <markdown-input
          v-model="data.description"
          :label="$t('models.user.description')"
        />

        <!-- Partner map -->
        <map-input
          v-model="partnerLocalization"
          :default-latitude="data.partner_latitude"
          :default-longitude="data.partner_longitude"
          :default-zoom="data.partner_latitude ? 10 : 4"
          title-key="components.user.partnerMapTitle"
          style-map="outdoor"
          class="mb-3"
        />
      </div>

      <submit-form
        :overlay="submitOverlay"
        submit-local-key="actions.save"
      />
    </v-form>
  </div>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import SubmitForm from '@/components/forms/SubmitForm'
import ClimbingTypeInput from '@/components/forms/ClimbingTypeInput'
import MarkdownInput from '@/components/forms/MarkdownInput'
import MapInput from '@/components/forms/MapInput'

export default {
  name: 'PartnerForm',
  mixins: [FormHelpers],
  components: { MapInput, MarkdownInput, ClimbingTypeInput, SubmitForm },
  props: {
    user: Object
  },

  data () {
    return {
      climbingTypes: this.user ? this.user.climbingTypes() : [],
      partnerLocalization: {
        latitude: (this.user || {}).partner_latitude || (this.user || {}).latitude,
        longitude: (this.user || {}).partner_longitude || (this.user || {}).longitude
      },
      gradesList: [
        { text: '3a', value: 13 },
        { text: '3b', value: 15 },
        { text: '3c', value: 17 },
        { text: '4a', value: 19 },
        { text: '4b', value: 21 },
        { text: '4c', value: 23 },
        { text: '5a', value: 25 },
        { text: '5b', value: 27 },
        { text: '5c', value: 29 },
        { text: '6a', value: 31 },
        { text: '6b', value: 33 },
        { text: '6c', value: 35 },
        { text: '7a', value: 37 },
        { text: '7b', value: 39 },
        { text: '7c', value: 41 },
        { text: '8a', value: 43 },
        { text: '8b', value: 45 },
        { text: '8c', value: 47 },
        { text: '9a', value: 49 },
        { text: '9b', value: 51 },
        { text: '9c', value: 53 }
      ],
      data: {
        partner_search: (this.user || {}).partner_search || false,
        bouldering: (this.user || {}).bouldering,
        sport_climbing: (this.user || {}).sport_climbing,
        multi_pitch: (this.user || {}).multi_pitch,
        trad_climbing: (this.user || {}).trad_climbing,
        aid_climbing: (this.user || {}).aid_climbing,
        deep_water: (this.user || {}).deep_water,
        via_ferrata: (this.user || {}).via_ferrata,
        pan: (this.user || {}).pan,
        grade_min: (this.user || {}).grade_min,
        grade_max: (this.user || {}).grade_max,
        description: (this.user || {}).description,
        partner_latitude: (this.user || {}).partner_latitude || (this.user || {}).latitude,
        partner_longitude: (this.user || {}).partner_longitude || (this.user || {}).longitude
      }
    }
  },

  watch: {
    partnerLocalization: {
      handler: function () {
        this.data.partner_latitude = this.partnerLocalization.latitude
        this.data.partner_longitude = this.partnerLocalization.longitude
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
        this.data.pan = this.climbingTypes.indexOf('pan') !== -1
      },
      deep: true
    }
  },

  methods: {
    submit: function () {
      this.submitOverlay = true

      CurrentUserApi
        .update(this.data)
        .then(() => {
          if (this.data.partner_latitude !== null) {
            localStorage.setItem('map-latitude', this.data.partner_latitude)
            localStorage.setItem('map-longitude', this.data.partner_longitude)
            localStorage.setItem('map-zoom', '12')
          }
          this.$router.push('/maps/climbers')
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
