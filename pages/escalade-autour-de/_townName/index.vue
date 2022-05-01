<template>
  <div>
    <v-container class="common-page-container climb-around-town">
      <div v-if="$fetchState.pending">
        <v-skeleton-loader
          class="mx-auto mt-7 mb-7"
          type="heading"
        />
        <v-skeleton-loader
          class="mx-auto"
          type="paragraph"
        />
      </div>

      <div v-else>
        <div>
          <v-btn
            text
            rounded
            :to="`/escalade-en/france/${town.department.department_number}/${town.department.slug_name}`"
          >
            <v-icon left>
              {{ mdiArrowLeft }}
            </v-icon>
            {{ town.department.name }}
          </v-btn>
        </div>

        <h1 class="mt-10 text-center">
          {{ $t('components.town.title', { name: town.name }) }}
        </h1>

        <!-- Search another city -->
        <div class="mb-10">
          <div class="text-center">
            <v-btn
              text
              elevation="0"
              color="primary"
              @click="showTownSearch = !showTownSearch"
            >
              <v-icon small left>
                {{ mdiMagnify }}
              </v-icon>
              {{ $t('components.town.searchAnotherCity') }}
            </v-btn>
          </div>
          <div v-if="showTownSearch">
            <town-search-form />
          </div>
        </div>

        <v-sheet class="pa-5" rounded>
          <town-description :town="town" />
        </v-sheet>

        <!-- Crags table -->
        <div
          v-if="town.crags.around.length > 0"
          class="mt-16"
        >
          <h2 class="mb-3">
            <v-icon left class="vertical-align-baseline mb-1">
              {{ mdiTerrain }}
            </v-icon>
            {{ $tc('components.town.cragsAround', town.crags.around.length, { count: town.crags.around.length, name: town.name }) }}
          </h2>
          <crags-table
            :crags-data="town.crags.crag_with_levels"
            :route-figures="town.crags.route_figures"
          />
        </div>

        <!-- Nearest crag -->
        <div
          v-else
          class="mt-16"
        >
          <h2 class="mb-3">
            <v-icon left class="vertical-align-baseline mb-1">
              {{ mdiTerrain }}
            </v-icon>
            {{ $t('components.town.nearestCrag', { name: town.name }) }}
          </h2>
          <p>
            Il n'y pas de site de grimpe naturel à moins de <strong>{{ town.dist }} km</strong> de {{ town.name }}.
            Le site le plus proche est <strong>{{ toCragObject(town.crags.nearest).name }}</strong> à {{ town.crags.nearest_dist }} km.
          </p>

          <crag-small-card
            :crag="toCragObject(town.crags.nearest)"
            small
            class="mb-2"
          />
        </div>

        <!-- Gym around -->
        <div
          v-if="town.gyms.around.length > 0"
          class="mt-16"
        >
          <h2 class="mb-3">
            <v-icon left class="vertical-align-baseline mb-1">
              {{ mdiOfficeBuildingMarker }}
            </v-icon>
            {{ $tc('components.town.gymsAround', town.gyms.around.length, { count: town.gyms.around.length, name: town.name }) }}
          </h2>

          <gym-small-card
            v-for="(gym, index) in town.gyms.around"
            :key="`gym-${index}`"
            :gym="toGymObject(gym)"
            small
            class="mb-2"
          />
        </div>

        <!-- Nearest gym -->
        <div
          v-else
          class="mt-16"
        >
          <h2 class="mb-3">
            <v-icon left class="vertical-align-baseline mb-1">
              {{ mdiOfficeBuildingMarker }}
            </v-icon>
            {{ $t('components.town.nearestGym', { name: town.name }) }}
          </h2>
          <p>
            Il n'y pas de salle à moins de <strong>{{ town.dist }} km</strong> de {{ town.name }},
            il faudra s'éloigner de {{ town.gyms.nearest_dist }} km pour trouver la salle <strong>{{ toGymObject(town.gyms.nearest).name }}</strong> à <strong>{{ town.gyms.nearest.city }}</strong>.
          </p>
          <gym-small-card
            :gym="toGymObject(town.gyms.nearest)"
            small
          />
        </div>

        <!-- Guide book papers -->
        <div
          v-if="town.guide_book_papers.length > 0"
          class="mt-16"
        >
          <h2 class="mb-3">
            <v-icon left class="vertical-align-baseline mb-1">
              {{ mdiBookshelf }}
            </v-icon>
            {{ $t('components.town.guideBooks', { name: town.name }) }}
          </h2>
          <v-sheet
            rounded
            class="pa-5"
          >
            <v-row>
              <v-col
                v-for="(guide, index) in town.guide_book_papers"
                :key="`guide-${index}`"
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

        <h2 class="mt-9">
          <v-icon left class="vertical-align-baseline mb-1">
            {{ mdiMap }}
          </v-icon>
          {{ $t('components.town.map', { name: town.name }) }}
        </h2>
        <client-only>
          <v-sheet
            rounded
            class="pa-4 mt-3"
          >
            <div class="town-map-area">
              <spinner v-if="loadingGeoJson" />
              <leaflet-map
                v-else
                :track-location="false"
                :clustered="false"
                :geo-jsons="geoJsons"
                map-style="outdoor"
              />
            </div>
          </v-sheet>
        </client-only>
      </div>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { mdiMagnify, mdiArrowLeft, mdiTerrain, mdiBookshelf, mdiOfficeBuildingMarker, mdiMap } from '@mdi/js'
import TownApi from '~/services/oblyk-api/TownApi'
import CragSmallCard from '~/components/crags/CragSmallCard'
import Crag from '~/models/Crag'
import Gym from '~/models/Gym'
import GymSmallCard from '~/components/gyms/GymSmallCard'
import GuideBookPaper from '~/models/GuideBookPaper'
import GuideBookPaperCoverCard from '~/components/guideBookPapers/GuideBookPaperCoverCard'
import AppFooter from '~/components/layouts/AppFooter'
import TownDescription from '~/components/towns/TownDescription'
import CragsTable from '~/components/crags/CragsTable'
import Spinner from '~/components/layouts/Spiner'
import TownSearchForm from '~/components/towns/forms/TownSearchForm'
const LeafletMap = () => import('~/components/maps/LeafletMap')

export default {
  components: {
    TownSearchForm,
    LeafletMap,
    Spinner,
    CragsTable,
    TownDescription,
    AppFooter,
    GuideBookPaperCoverCard,
    GymSmallCard,
    CragSmallCard
  },

  data () {
    return {
      town: {},
      dist: (this.town || {}).dist || 10,

      geoJsons: null,
      loadingGeoJson: true,

      showTownSearch: false,

      mdiMagnify,
      mdiArrowLeft,
      mdiTerrain,
      mdiBookshelf,
      mdiOfficeBuildingMarker,
      mdiMap
    }
  },

  async fetch () {
    await new TownApi(
      this.$axios,
      this.$store
    )
      .find(this.$route.params.townName)
      .then((resp) => {
        this.town = resp.data
      })
  },

  head () {
    return {
      title: this.$t('meta.climbingAround.town.title', { name: this.town.name }),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('meta.climbingAround.town.description', { name: this.town.name, department_number: (this.town.department || {}).department_number }) },
        { hid: 'og:title', property: 'og:title', content: this.$t('meta.climbingAround.town.title', { name: this.town.name }) },
        { hid: 'og:description', property: 'og:description', content: this.$t('meta.climbingAround.town.description', { name: this.town.name, department_number: (this.town.department || {}).department_number }) }
      ]
    }
  },

  mounted () {
    this.$store.commit('layout/LAYOUT_PADDING', true)
    this.getGeoJson()
  },

  methods: {
    toCragObject (crag) {
      return new Crag({ attributes: crag })
    },

    toGymObject (gym) {
      return new Gym({ attributes: gym })
    },

    toGuideObject (guide) {
      return new GuideBookPaper({ attributes: guide })
    },

    getGeoJson () {
      this.loadingGeoJson = true
      new TownApi(
        this.$axios,
        this.$store
      )
        .geoJson(this.$route.params.townName)
        .then((resp) => {
          this.geoJsons = { features: resp.data.features }
          setTimeout(() => {
            this.$root.$emit('fitMapOnGeoJsonBounds')
          }, 2000)
        })
        .finally(() => {
          this.loadingGeoJson = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.climb-around-town {
  h2 {
    font-size: 1.4em;
  }
  .town-map-area {
    height: 70vh;
  }
}
</style>
