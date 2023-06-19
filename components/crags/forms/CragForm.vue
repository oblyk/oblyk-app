<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.name"
      outlined
      required
      :label="$t('models.crag.name')"
    />

    <climbing-type-input
      v-model="climbingTypes"
      environment="crag"
    />

    <client-only>
      <map-input
        v-model="localization"
        :default-latitude="data.latitude"
        :default-longitude="data.longitude"
        :default-zoom="data.latitude === null || data.latitude === undefined ? 4 : 13"
        style-map="outdoor"
        class="mb-3"
      />
    </client-only>

    <div v-if="cragsAround.length > 0">
      <p class="mb-2">
        <u>
          <v-icon color="warning" left>{{ mdiAlert }}</v-icon>
          {{ $tc('components.crag.cragAroundInCreate', cragsAround.length, { count: cragsAround.length }) }}
        </u>
      </p>
      <crag-small-card
        v-for="(crag, index) in cragsAround"
        :key="`crag-around-${index}`"
        :crag="crag"
        :small="true"
        class="mb-2"
      />
      <p class="mb-8 grey--text">
        {{ $t('components.crag.doNotCreateADuplicate') }}
      </p>
    </div>

    <v-row>
      <v-col>
        <v-text-field
          v-model="data.city"
          outlined
          :label="$t('models.crag.city')"
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="data.region"
          outlined
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
import { mdiAlert } from '@mdi/js'
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import CragApi from '~/services/oblyk-api/CragApi'
import CloseForm from '@/components/forms/CloseForm'
import Crag from '@/models/Crag'
import ClimbingTypeInput from '@/components/forms/ClimbingTypeInput'
import RockInput from '@/components/forms/RockInput'
import RainInput from '@/components/forms/RainInput'
import SunInput from '@/components/forms/SunInput'
import SeasonInput from '@/components/forms/SeasonInput'
import OrientationInput from '@/components/forms/OrientationInput'
import CragSmallCard from '@/components/crags/CragSmallCard'
const MapInput = () => import('@/components/forms/MapInput')

export default {
  name: 'CragForm',
  components: {
    CragSmallCard,
    OrientationInput,
    SeasonInput,
    SunInput,
    RainInput,
    RockInput,
    MapInput,
    ClimbingTypeInput,
    CloseForm,
    SubmitForm
  },
  mixins: [FormHelpers],
  props: {
    crag: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      cragsAround: [],
      redirectTo: null,
      localization: {
        latitude: (this.crag || {}).latitude,
        longitude: (this.crag || {}).longitude,
        code_country: (this.crag || {}).code_country,
        country: (this.crag || {}).country,
        city: (this.crag || {}).city,
        region: (this.crag || {}).region
      },
      climbingTypes: this.crag ? this.crag.climbingTypes : [],
      seasons: this.crag ? this.crag.seasons : [],
      orientations: this.crag ? this.crag.orientations : [],
      data: {
        id: (this.crag || {}).id,
        name: (this.crag || {}).name,
        code_country: (this.crag || {}).code_country,
        country: (this.crag || {}).country,
        city: (this.crag || {}).city,
        region: (this.crag || {}).region,
        latitude: (this.crag || {}).latitude,
        longitude: (this.crag || {}).longitude,
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
      },

      mdiAlert
    }
  },

  watch: {
    localization: {
      handler () {
        this.data.latitude = this.localization.latitude
        this.data.longitude = this.localization.longitude
        if (!this.isEditingForm()) {
          this.data.country_code = this.localization.country_code
          this.data.country = this.localization.country
          this.data.city = this.localization.city
          this.data.region = this.localization.region
          this.getCragAround()
        }
      },
      deep: true
    },
    climbingTypes: {
      handler () {
        this.data.bouldering = this.climbingTypes.includes('bouldering')
        this.data.sport_climbing = this.climbingTypes.includes('sport_climbing')
        this.data.multi_pitch = this.climbingTypes.includes('multi_pitch')
        this.data.trad_climbing = this.climbingTypes.includes('trad_climbing')
        this.data.aid_climbing = this.climbingTypes.includes('aid_climbing')
        this.data.deep_water = this.climbingTypes.includes('deep_water')
        this.data.via_ferrata = this.climbingTypes.includes('via_ferrata')
      },
      deep: true
    },
    seasons: {
      handler () {
        this.data.summer = this.seasons.includes('summer')
        this.data.autumn = this.seasons.includes('autumn')
        this.data.winter = this.seasons.includes('winter')
        this.data.spring = this.seasons.includes('spring')
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
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')
    const nameParam = urlParams.get('name')
    const latitudeParam = urlParams.get('latitude')
    const longitudeParam = urlParams.get('longitude')
    const codeCountryParam = urlParams.get('code_country')
    const countryParam = urlParams.get('country')
    const cityParam = urlParams.get('city')
    const regionParam = urlParams.get('region')

    if (nameParam) { this.data.name = nameParam }
    if (latitudeParam) { this.data.latitude = latitudeParam }
    if (longitudeParam) { this.data.longitude = longitudeParam }
    if (codeCountryParam) { this.data.code_country = codeCountryParam }
    if (countryParam) { this.data.country = countryParam }
    if (cityParam) { this.data.city = cityParam }
    if (regionParam) { this.data.region = regionParam }
  },

  methods: {
    getCragAround () {
      if (this.isEditingForm()) { return }

      new CragApi(this.$axios, this.$auth)
        .cragsAround(
          this.data.latitude,
          this.data.longitude,
          1
        ).then((resp) => {
          this.cragsAround = []
          for (const crag of resp.data) {
            this.cragsAround.push(new Crag({ attributes: crag }))
          }
        })
    },

    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new CragApi(this.$axios, this.$auth).update(this.data) : new CragApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          const crag = new Crag({ attributes: resp.data })
          if (this.redirectTo) {
            this.$router.push(`${this.redirectTo}?crag_id=${crag.id}`)
          } else {
            this.$router.push(crag.path)
          }
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
