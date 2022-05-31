<template>
  <div>
    <v-container class="common-page-container climb-around-department">
      <!-- Loading -->
      <div v-if="$fetchState.pending" class="mt-5">
        <v-skeleton-loader
          class="mx-auto mt-7 mb-7"
          type="heading"
        />
        <v-skeleton-loader
          class="mx-auto"
          type="paragraph"
        />
      </div>

      <!-- Content -->
      <div v-else>
        <div>
          <v-btn
            text
            rounded
            exact-path
            to="/escalade-en/france"
          >
            <v-icon left>
              {{ mdiArrowLeft }}
            </v-icon>
            France
          </v-btn>
        </div>

        <h1 class="mb-10 mt-10 text-center">
          {{ $t('components.department.climbing') }} {{ $t(`components.department.inSentencePrefixType.${department.in_sentence_prefix_type}`) }} {{ department.name }}
        </h1>

        <v-sheet
          class="pa-4"
          rounded
        >
          <department-description :department="department" />
        </v-sheet>

        <v-row class="mt-10">
          <!-- Grade chart -->
          <v-col cols="12" md="6">
            <h2 class="mb-3">
              <v-icon left class="vertical-align-baseline mb-1">
                {{ mdiPoll }}
              </v-icon>
              {{ $t(`components.department.namePrefixType.${department.name_prefix_type}`) }} {{ department.name }} {{ $t('components.department.gradeOf') }}
            </h2>
            <v-sheet
              rounded
              class="pa-3"
            >
              <spinner v-if="loadingGradeData" />
              <locality-grade-chart
                v-else
                :data="gradeData"
                height-class="height-250"
              />
            </v-sheet>
          </v-col>

          <!-- Map -->
          <v-col cols="12" md="6">
            <h2 class="mb-3">
              <v-icon left class="vertical-align-baseline mb-1">
                {{ mdiTable }}
              </v-icon>
              {{ $t(`components.department.namePrefixType.${department.name_prefix_type}`) }} {{ department.name }} {{ $t('components.department.inFigures') }}
            </h2>

            <v-sheet
              class="pa-4"
              rounded
            >
              <v-row>
                <!-- Author -->
                <v-col cols="6">
                  <description-line
                    :icon="mdiSourceBranch"
                    item-title="Nombre de lignes"
                    :item-value="`${department.figures.crag_routes.count.all} ligne(s)`"
                  />
                </v-col>
                <v-col cols="6">
                  <description-line
                    :icon="mdiTerrain"
                    item-title="Site naturels"
                    :item-value="`${department.figures.crags.count.all} site(s)`"
                  />
                </v-col>
                <v-col cols="6">
                  <description-line
                    :icon="mdiOfficeBuildingMarkerOutline"
                    item-title="Salles"
                    :item-value="`${department.figures.gyms.count.all} salle(s)`"
                  />
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>

        <v-toolbar
          flat
          class="mt-10 rounded-tl-lg rounded-tr-lg"
        >
          <v-toolbar-title class="font-weight-bold">
            {{ $t('components.department.mapTitle') }}
          </v-toolbar-title>

          <v-spacer />

          <v-checkbox
            v-model="showMapGym"
            :disabled="loadingGeoJson"
            hide-details
            label="SAE"
          />

          <div class="ml-4" />

          <v-checkbox
            v-model="showMapCrag"
            hide-details
            :disabled="loadingGeoJson"
            label="Falaises"
          />

          <div class="ml-4" />

          <v-select
            v-model="mapClimbingType"
            :items="climbingStyles"
            label="Style d'escalade"
            outlined
            :disabled="loadingGeoJson"
            hide-details
            dense
          />
        </v-toolbar>

        <client-only>
          <div class="department-map-area">
            <spinner v-if="loadingGeoJson" />
            <leaflet-map
              v-else
              :track-location="false"
              :clustered="false"
              :geo-jsons="geoJsons"
              map-style="outdoor"
              :options="{ department: { clickable: false } }"
            />
          </div>
        </client-only>

        <div v-if="department.guide_book_papers.length > 0">
          <h2 class="mt-10 mb-4">
            <v-icon left class="vertical-align-baseline mb-1">
              {{ mdiBookshelf }}
            </v-icon>
            {{ $tc('components.department.bookCovering', department.guide_book_papers.length, { count: department.guide_book_papers.length }) }}
            {{ $t(`components.department.namePrefixType.${department.name_prefix_type}`) }} {{ department.name }}
          </h2>

          <v-sheet
            class="pa-5"
            rounded
          >
            <v-row>
              <v-col
                v-for="(guide, index) in department.guide_book_papers"
                :key="`guide-book-${index}`"
                cols="12"
                md="6"
                lg="3"
              >
                <guide-book-paper-cover-card
                  :guide-book-paper="toGuideObject(guide)"
                />
              </v-col>
            </v-row>
          </v-sheet>
        </div>

        <h2 class="mt-10 mb-2">
          <v-icon left class="vertical-align-baseline mb-1">
            {{ mdiCityVariantOutline }}
          </v-icon>
          {{ $t('components.department.towns') }}
        </h2>

        <v-sheet
          class="pa-5"
          rounded
        >
          <v-text-field
            v-model="townFiltre"
            outlined
            hide-details
            :label="`Chercher une ville de ${department.name}`"
            :prepend-inner-icon="mdiMagnify"
          />
          <div v-for="(town, index) in filteredTowns" :key="`town-${index}`">
            <p
              v-if="index === 0 || (firstTownLetter(department.towns[index - 1].name) !== firstTownLetter(town.name))"
            >
              <v-alert
                dense
                text
                class="d-block mb-0 mt-5"
              >
                {{ firstTownLetter(town.name) }}
              </v-alert>
            </p>
            <p>
              <nuxt-link :to="`/escalade-autour-de/${town.slug_name}`">
                {{ town.name }}, {{ town.zipcode }}
              </nuxt-link>
            </p>
          </div>
        </v-sheet>
      </div>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import {
  mdiMagnify,
  mdiSourceBranch,
  mdiTerrain,
  mdiArrowLeft,
  mdiOfficeBuildingMarkerOutline,
  mdiCityVariantOutline,
  mdiPoll,
  mdiTable,
  mdiBookshelf
} from '@mdi/js'
import { TextHelpers } from '~/mixins/TextHelpers'
import DepartmentApi from '~/services/oblyk-api/DepartmentApi'
import AppFooter from '~/components/layouts/AppFooter'
import LocalityGradeChart from '~/components/localities/charts/LocalityGradeChart'
import Spinner from '~/components/layouts/Spiner'
import DescriptionLine from '~/components/ui/DescriptionLine'
import GuideBookPaperCoverCard from '~/components/guideBookPapers/GuideBookPaperCoverCard'
import GuideBookPaper from '~/models/GuideBookPaper'
import DepartmentDescription from '~/components/departments/DepartmentDescription'
const LeafletMap = () => import('~/components/maps/LeafletMap')

export default {
  components: {
    DepartmentDescription,
    GuideBookPaperCoverCard,
    LeafletMap,
    DescriptionLine,
    Spinner,
    LocalityGradeChart,
    AppFooter
  },
  mixins: [TextHelpers],

  data () {
    return {
      department: {},
      townFiltre: '',

      gradeData: [],
      loadingGradeData: true,

      geoJsons: null,
      loadingGeoJson: true,

      showMapGym: true,
      showMapCrag: true,

      mapClimbingType: 'all',

      climbingStyles: [
        {
          text: 'Tous les styles',
          value: 'all'
        },
        {
          text: 'Voie',
          value: 'sport_climbing'
        },
        {
          text: 'Bloc',
          value: 'bouldering'
        },
        {
          text: 'Grande voie',
          value: 'multi_pitch'
        },
        {
          text: 'Trad',
          value: 'trad_climbing'
        },
        {
          text: 'Artif',
          value: 'aid_climbing'
        },
        {
          text: 'Deep Water',
          value: 'deep_water'
        },
        {
          text: 'Via ferrata',
          value: 'via_ferrata'
        }
      ],

      mdiMagnify,
      mdiSourceBranch,
      mdiTerrain,
      mdiArrowLeft,
      mdiOfficeBuildingMarkerOutline,
      mdiCityVariantOutline,
      mdiPoll,
      mdiTable,
      mdiBookshelf
    }
  },

  async fetch () {
    await new DepartmentApi(
      this.$axios,
      this.$store
    )
      .find(
        'fr',
        this.$route.params.departmentNumber
      )
      .then((resp) => {
        this.department = resp.data
      })
  },

  head () {
    return {
      title: this.$t('meta.climbingAround.department.title', { name: this.metaTitleName }),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('meta.climbingAround.department.description', { name: this.metaDescriptionName }) },
        { hid: 'og:title', property: 'og:title', content: this.$t('meta.climbingAround.department.title', { name: this.metaTitleName }) },
        { hid: 'og:description', property: 'og:description', content: this.$t('meta.climbingAround.department.description', { name: this.metaDescriptionName }) }
      ]
    }
  },

  computed: {
    metaTitleName () {
      return `${this.$t(`components.department.inSentencePrefixType.${this.department.in_sentence_prefix_type}`)} ${this.department.name}`
    },

    metaDescriptionName () {
      return `${this.$t(`components.department.namePrefixType.${this.department.name_prefix_type}`)} ${this.department.name}`
    },

    filteredTowns () {
      const towns = []
      for (const town of this.department.towns) {
        const townName = this.removeAccented(town.name.toLowerCase())
        const query = this.removeAccented(this.townFiltre.toLowerCase())
        if (this.townFiltre === '' || townName.includes(query)) {
          towns.push(town)
        }
      }
      return towns
    }
  },

  watch: {
    showMapGym () {
      this.getGeoJson()
    },
    showMapCrag () {
      this.getGeoJson()
    },
    mapClimbingType () {
      this.getGeoJson()
    }
  },

  mounted () {
    this.getRouteFigures()
    this.getGeoJson(true)
  },

  methods: {
    firstTownLetter (name) {
      return name.charAt(0).replace('É', 'E').toUpperCase()
    },

    getRouteFigures () {
      this.loadingGradeData = true
      new DepartmentApi(
        this.$axios,
        this.$store
      )
        .routeFigures(
          'fr',
          this.$route.params.departmentNumber
        )
        .then((resp) => {
          this.gradeData = resp.data
        })
        .finally(() => {
          this.loadingGradeData = false
        })
    },

    getGeoJson (fit = false) {
      this.loadingGeoJson = true
      new DepartmentApi(
        this.$axios,
        this.$store
      )
        .geoJson(
          'fr',
          this.$route.params.departmentNumber,
          {
            gyms: this.showMapGym,
            crags: this.showMapCrag,
            climbing_type: this.mapClimbingType
          }
        )
        .then((resp) => {
          this.geoJsons = { features: resp.data.features }
          if (fit) {
            setTimeout(() => {
              this.$root.$emit('fitMapOnGeoJsonBounds')
            }, 2000)
          }
        })
        .finally(() => {
          this.loadingGeoJson = false
        })
    },

    toGuideObject (guide) {
      return new GuideBookPaper({ attributes: guide })
    }
  }
}
</script>

<style scoped lang="scss">
.climb-around-department {
  h2 {
    font-size: 1.4em;
  }
  .department-map-area {
    height: 70vh;
  }
}
</style>
