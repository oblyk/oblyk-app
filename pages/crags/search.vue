<template>
  <v-container>
    <h1 class="text-center mt-5 mb-10">
      {{ $t('common.pages.cragSearch.title') }}
    </h1>

    <!-- City -->
    <v-card class="mb-3">
      <v-card-title class="pb-2">
        {{ $t('common.pages.cragSearch.localisation') }}
      </v-card-title>
      <v-card-text>
        <search-place-input v-model="localisation" />
        <p
          v-if="localisation"
          class="mb-0 mt-3 pl-1"
        >
          <v-icon class="mr-1 vertical-align-top">
            {{ mdiTarget }}
          </v-icon>
          {{ distance }}{{ $t('common.pages.cragSearch.kmAround') }} {{ localisation.postCode }} {{ localisation.city }}
          <cite class="text--disabled">
            ({{ localisation.regions }}, {{ localisation.country }})
          </cite>
        </p>
      </v-card-text>
    </v-card>

    <!-- Climbing type -->
    <v-card
      v-if="climbingTypeFilter"
      class="mb-3"
    >
      <v-card-title class="pb-1 pt-2 text-body-1 font-weight-medium">
        <v-icon small left>
          {{ mdiTerrain }}
        </v-icon>
        {{ $t('common.pages.cragSearch.whichType') }}
        <v-spacer />
        <v-btn
          icon
          left
          @click="closeFilter('climbingTypeFilter')"
        >
          <v-icon>
            {{ mdiWindowClose }}
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-chip-group
          v-model="climbingTypes"
          column
          multiple
        >
          <v-chip
            v-for="(climbingType, climbingTypeIndex) in availableClimbingTypes"
            :key="`climbing-type-${climbingTypeIndex}`"
            filter
            outlined
            :value="climbingType.value"
          >
            {{ climbingType.text }}
          </v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card>

    <!-- Grade min / max -->
    <v-card
      v-if="gradeFilter"
      class="mb-3"
    >
      <v-card-title class="pb-1 pt-2 text-body-1 font-weight-medium">
        <v-icon small left>
          {{ mdiNumeric7BoxMultipleOutline }}
        </v-icon>
        {{ $t('common.pages.cragSearch.whichLevel') }}
        <v-spacer />
        <v-btn
          icon
          left
          @click="closeFilter('gradeFilter')"
        >
          <v-icon>
            {{ mdiWindowClose }}
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="8" md="3" class="pt-5 text-right" v-html="$t('common.pages.cragSearch.cragMustContain')" />
          <v-col cols="4" md="2">
            <v-select
              v-model="minGrade"
              :items="gradeWithoutWeightings"
              dense
              outlined
              hide-details
            />
          </v-col>
          <v-col
            cols="8"
            md="1"
            class="pt-5 text-right font-weight-bold"
          >
            {{ $t('common.and') }} :
          </v-col>
          <v-col
            cols="4"
            md="2"
          >
            <v-select
              v-model="maxGrade"
              :items="gradeWithoutWeightings"
              dense
              outlined
              hide-details
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Orientation -->
    <v-card
      v-if="orientationFilter"
      class="mb-3"
    >
      <v-card-title class="pb-1 pt-2 text-body-1 font-weight-medium">
        <v-icon small left>
          {{ mdiCompass }}
        </v-icon>
        {{ $t('common.pages.cragSearch.whichOrientation') }}
        <v-spacer />
        <v-btn
          icon
          left
          @click="closeFilter('orientationFilter')"
        >
          <v-icon>
            {{ mdiWindowClose }}
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-chip-group
          v-model="orientations"
          column
          multiple
        >
          <v-chip
            v-for="(orientation, orientationIndex) in availableOrientations"
            :key="`orientation-${orientationIndex}`"
            filter
            outlined
            :value="orientation.value"
            :filter-icon="orientation.icon"
          >
            {{ orientation.text }}
          </v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card>

    <!-- Approach time -->
    <v-card
      v-if="approachTimeFilter"
      class="mb-3"
    >
      <v-card-title class="pb-1 pt-2 text-body-1 font-weight-medium">
        <v-icon small left>
          {{ mdiFlower }}
        </v-icon>
        {{ $t('common.pages.cragSearch.approachMaxTime') }}
        <v-spacer />
        <v-btn
          icon
          left
          @click="closeFilter('approachTimeFilter')"
        >
          <v-icon>
            {{ mdiWindowClose }}
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="3" md="1" class="pr-0">
            <v-text-field
              v-model="maxApproachTime"
              dense
              outlined
              hide-details
            />
          </v-col>
          <v-col cols="9" md="10" class="pt-lg-5" v-html="$t('common.pages.cragSearch.minutesToReach')" />
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Season -->
    <v-card
      v-if="seasonFilter"
      class="mb-3"
    >
      <v-card-title class="pb-1 pt-2 text-body-1 font-weight-medium">
        <v-icon small left>
          {{ mdiFlower }}
        </v-icon>
        {{ $t('common.pages.cragSearch.whichSeason') }}
        <v-spacer />
        <v-btn
          icon
          left
          @click="closeFilter('seasonFilter')"
        >
          <v-icon>
            {{ mdiWindowClose }}
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-chip-group
          v-model="seasons"
          column
          multiple
        >
          <v-chip
            v-for="(season, seasonIndex) in availableSeasons"
            :key="`season-${seasonIndex}`"
            filter
            outlined
            :value="season.value"
            :filter-icon="season.icon"
          >
            {{ season.text }}
          </v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card>

    <div class="text-right mt-2 mb-3">
      <v-dialog
        v-model="filterModal"
        width="400"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            text
            color="primary"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon left>
              {{ mdiFilterPlus }}
            </v-icon>
            {{ $t('actions.addFilters') }}
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            {{ $t('common.pages.cragSearch.chooseYourFilters') }}
          </v-card-title>
          <v-list
            flat
            subheader
            three-line
          >
            <v-list-item-group
              v-model="filters"
              multiple
            >
              <v-list-item>
                <template #default="{ active }">
                  <v-list-item-action>
                    <v-checkbox :input-value="active" />
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon left>
                        {{ mdiTerrain }}
                      </v-icon>
                      {{ $t('common.pages.cragSearch.filters.climbingType.title') }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ $t('common.pages.cragSearch.filters.climbingType.subtitle') }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-list-item>

              <v-list-item>
                <template #default="{ active }">
                  <v-list-item-action>
                    <v-checkbox :input-value="active" />
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon left>
                        {{ mdiNumeric7BoxMultipleOutline }}
                      </v-icon>
                      {{ $t('common.pages.cragSearch.filters.grade.title') }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ $t('common.pages.cragSearch.filters.grade.subtitle') }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-list-item>

              <v-list-item>
                <template #default="{ active }">
                  <v-list-item-action>
                    <v-checkbox :input-value="active" />
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon left small>
                        {{ mdiCompass }}
                      </v-icon>
                      {{ $t('common.pages.cragSearch.filters.orientation.title') }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ $t('common.pages.cragSearch.filters.orientation.subtitle') }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-list-item>

              <v-list-item>
                <template #default="{ active }">
                  <v-list-item-action>
                    <v-checkbox :input-value="active" />
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon left>
                        {{ mdiWalk }}
                      </v-icon>
                      {{ $t('common.pages.cragSearch.filters.approach.title') }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ $t('common.pages.cragSearch.filters.approach.subtitle') }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-list-item>

              <v-list-item>
                <template #default="{ active }">
                  <v-list-item-action>
                    <v-checkbox :input-value="active" />
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon left>
                        {{ mdiFlower }}
                      </v-icon>
                      {{ $t('common.pages.cragSearch.filters.season.title') }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ $t('common.pages.cragSearch.filters.season.subtitle') }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-card-actions>
            <v-spacer />
            <v-btn
              elevation="0"
              color="primary"
              @click="filterModal = false"
            >
              {{ $t('actions.close') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn
        :loading="loading"
        color="primary"
        elevation="0"
        @click="search"
      >
        {{ $t('actions.search') }}
      </v-btn>
    </div>
    <div v-if="crags">
      <crags-table
        v-if="Object.keys(crags.crag_with_levels).length > 0"
        :crags-data="crags.crag_with_levels"
        :route-figures="crags.route_figures"
        :centre-coordinate="[latitude, longitude]"
      />
      <p
        v-else
        class="text-center mt-5 mb-5 text--disabled"
      >
        {{ $t('common.pages.cragSearch.noResults', { distance: distance, city: localisation.city }) }}
      </p>
      <div>
        <p class="mt-4 mb-0">
          <u>
            {{ $t('common.pages.cragSearch.expandTo') }}
          </u>
        </p>
        <v-chip-group
          v-if="!loading"
          v-model="distance"
          mandatory
          active-class="primary--text"
        >
          <v-chip :value="10">
            10km
          </v-chip>
          <v-chip :value="20">
            20km
          </v-chip>
          <v-chip :value="30">
            30km
          </v-chip>
          <v-chip :value="40">
            40km
          </v-chip>
        </v-chip-group>
        <p
          v-else
          class="text--disabled mt-2"
        >
          {{ $t('common.loading') }}
        </p>
      </div>
    </div>
  </v-container>
</template>

<script>
import {
  mdiFilterPlus,
  mdiCompass,
  mdiWalk,
  mdiTerrain,
  mdiFlower,
  mdiNumeric7BoxMultipleOutline,
  mdiWhiteBalanceSunny,
  mdiSnowflake,
  mdiLeafMaple,
  mdiArrowUpThick,
  mdiArrowRightThick,
  mdiArrowLeftThick,
  mdiArrowDownThick,
  mdiTarget,
  mdiWindowClose
} from '@mdi/js'
import CragApi from '~/services/oblyk-api/CragApi'
import SearchPlaceInput from '~/components/forms/SearchPlaceInput'
import { GradeMixin } from '~/mixins/GradeMixin'
import CragsTable from '~/components/crags/CragsTable'

export default {
  components: { CragsTable, SearchPlaceInput },
  mixins: [GradeMixin],
  data () {
    return {
      loading: false,
      filterModal: false,
      crags: null,
      filters: [],
      climbingTypes: [],
      seasons: [],
      orientations: [],
      localisation: null,
      minGrade: 0,
      maxGrade: 52,
      maxApproachTime: 60,
      firstSearch: true,
      latitude: null,
      longitude: null,
      distance: 20,

      availableClimbingTypes: [
        { value: 'sport_climbing', text: this.$t('models.climbs.sport_climbing') },
        { value: 'bouldering', text: this.$t('models.climbs.bouldering') },
        { value: 'multi_pitch', text: this.$t('models.climbs.multi_pitch') },
        { value: 'trad_climbing', text: this.$t('models.climbs.trad_climbing') },
        { value: 'aid_climbing', text: this.$t('models.climbs.aid_climbing') },
        { value: 'deep_water', text: this.$t('models.climbs.deep_water') },
        { value: 'via_ferrata', text: this.$t('models.climbs.via_ferrata') }
      ],

      availableOrientations: [
        { value: 'north', text: this.$t('models.orientations.north'), icon: mdiArrowUpThick },
        { value: 'south', text: this.$t('models.orientations.south'), icon: mdiArrowDownThick },
        { value: 'east', text: this.$t('models.orientations.east'), icon: mdiArrowRightThick },
        { value: 'west', text: this.$t('models.orientations.west'), icon: mdiArrowLeftThick }
      ],

      availableSeasons: [
        { value: 'summer', text: this.$t('models.seasons.summer'), icon: mdiWhiteBalanceSunny },
        { value: 'autumn', text: this.$t('models.seasons.autumn'), icon: mdiLeafMaple },
        { value: 'winter', text: this.$t('models.seasons.winter'), icon: mdiSnowflake },
        { value: 'spring', text: this.$t('models.seasons.spring'), icon: mdiFlower }
      ],

      filtersType: [
        'climbingTypeFilter',
        'gradeFilter',
        'orientationFilter',
        'approachTimeFilter',
        'seasonFilter'
      ],

      mdiFilterPlus,
      mdiCompass,
      mdiWalk,
      mdiTerrain,
      mdiFlower,
      mdiNumeric7BoxMultipleOutline,
      mdiWhiteBalanceSunny,
      mdiSnowflake,
      mdiLeafMaple,
      mdiArrowUpThick,
      mdiArrowRightThick,
      mdiArrowLeftThick,
      mdiArrowDownThick,
      mdiTarget,
      mdiWindowClose
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Recherche avancée de sites d'escalades : trouver des sites d'escalades en France et dans le monde",
        metaDescription: "Trouver exactement le site d'escalade que vous chercher, filter avec le niveau du site, l'orientation, le temps de marche, etc."
      },
      en: {
        metaTitle: 'Advanced climbing crag search : find climbing crags in France and in the world',
        metaDescription: 'Find exactly the climbing crag you are looking for, filter with the level of the crag, the orientation, the walking time, etc.'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('metaDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/meta-advanced-search.jpg` }
      ]
    }
  },

  computed: {
    climbingTypeFilter () {
      return this.filters.includes(this.filtersType.indexOf('climbingTypeFilter'))
    },

    gradeFilter () {
      return this.filters.includes(this.filtersType.indexOf('gradeFilter'))
    },

    orientationFilter () {
      return this.filters.includes(this.filtersType.indexOf('orientationFilter'))
    },

    approachTimeFilter () {
      return this.filters.includes(this.filtersType.indexOf('approachTimeFilter'))
    },

    seasonFilter () {
      return this.filters.includes(this.filtersType.indexOf('seasonFilter'))
    }
  },

  watch: {
    localisation () {
      if (this.firstSearch) {
        this.filterModal = true
        this.firstSearch = false
      }
      this.latitude = this.localisation.lat
      this.longitude = this.localisation.lng
    },

    distance () {
      this.search()
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    const latitudeParam = urlParams.get('latitude')
    const longitudeParam = urlParams.get('longitude')
    const postalCodeParam = urlParams.get('postal_code')
    const codeCountryParam = urlParams.get('code_country')
    const countryParam = urlParams.get('country')
    const cityParam = urlParams.get('city')
    const regionParam = urlParams.get('region')
    const addressParam = urlParams.get('address')
    const bigCityParam = urlParams.get('big_city')
    if (latitudeParam) {
      this.latitude = latitudeParam
      this.longitude = longitudeParam
      this.localisation = {
        lat: latitudeParam,
        lng: longitudeParam,
        postal_code: postalCodeParam,
        code_country: codeCountryParam,
        country: countryParam,
        city: cityParam,
        big_city: bigCityParam,
        region: regionParam,
        address: addressParam
      }
      this.search()
    }
  },

  methods: {
    closeFilter (filter) {
      this.filters.splice(this.filters.indexOf(this.filtersType.indexOf(filter)), 1)
    },

    search () {
      if (this.localisation === null) {
        return false
      }

      this.loading = true
      const filterParams = {}

      filterParams.latitude = this.latitude
      filterParams.longitude = this.longitude
      filterParams.distance = this.distance

      if (this.seasonFilter) {
        filterParams.season = {}
        filterParams.season.summer = this.seasons.includes('summer')
        filterParams.season.autumn = this.seasons.includes('autumn')
        filterParams.season.winter = this.seasons.includes('winter')
        filterParams.season.spring = this.seasons.includes('spring')
      }

      if (this.climbingTypeFilter) {
        filterParams.climbing_type = {}
        filterParams.climbing_type.sport_climbing = this.climbingTypes.includes('sport_climbing')
        filterParams.climbing_type.bouldering = this.climbingTypes.includes('bouldering')
        filterParams.climbing_type.multi_pitch = this.climbingTypes.includes('multi_pitch')
        filterParams.climbing_type.trad_climbing = this.climbingTypes.includes('trad_climbing')
        filterParams.climbing_type.aid_climbing = this.climbingTypes.includes('aid_climbing')
        filterParams.climbing_type.deep_water = this.climbingTypes.includes('deep_water')
        filterParams.climbing_type.via_ferrata = this.climbingTypes.includes('via_ferrata')
      }

      if (this.orientationFilter) {
        filterParams.orientation = {}
        filterParams.orientation.north = this.orientations.includes('north')
        filterParams.orientation.south = this.orientations.includes('south')
        filterParams.orientation.east = this.orientations.includes('east')
        filterParams.orientation.west = this.orientations.includes('west')
      }

      if (this.approachTimeFilter) {
        filterParams.max_approach_time = this.maxApproachTime
      }

      if (this.gradeFilter) {
        filterParams.grade = {}
        filterParams.grade.min = this.gradeByValue[this.minGrade]
        filterParams.grade.max = this.gradeByValue[this.maxGrade]
      }

      new CragApi(this.$axios, this.$auth)
        .advancedSearch(filterParams)
        .then((resp) => {
          this.crags = resp.data
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
