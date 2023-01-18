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
          v-if="town.crags.crag_count_around > 0"
          class="mt-16"
        >
          <h2 class="mb-3">
            <v-icon left class="vertical-align-baseline mb-1">
              {{ mdiTerrain }}
            </v-icon>
            {{ $tc('components.town.cragsAround', town.crags.crag_count_around, { count: town.crag_count_around, name: town.name }) }}
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
            Il n'y a pas de site de grimpe naturel à moins de <strong>{{ town.dist }} km</strong> de {{ town.name }}.
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
            Il n'y a pas de salle à moins de <strong>{{ town.dist }} km</strong> de {{ town.name }},
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

        <div v-if="geoJsons && geoJsons.features.length > 0">
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
                  :circle-properties="circleProperties"
                />
              </div>
            </v-sheet>
          </client-only>
        </div>
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

  i18n: {
    messages: {
      fr: {
        metaTitle: "Escalade %{name} : falaises, topos et salles d'escalade",
        metaDescription: "Retrouve les informations sur les sites d'escalade autour de %{name} (%{department_number}) : voie, grande voie, bloc, via ferrata ..., les topos et les salles d'escalade sur Oblyk"
      },
      en: {
        metaTitle: 'Climbing %{name} : crags, guide book and climbing gyms',
        metaDescription: 'Find information on climbing sites around %{name} (%{department_number}) : routes, multi pitches, boulder, via ferrata ..., guide books and climbing gyms on Oblyk'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle', { name: this.town.name }),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('metaDescription', { name: this.town.name, department_number: this.town.department?.department_number }) },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle', { name: this.town.name }) },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription', { name: this.town.name, department_number: this.town.department?.department_number }) },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/meta-image-escalade-en-france.jpg` }
      ]
    }
  },

  computed: {
    circleProperties () {
      return {
        radius: this.town.dist * 1000,
        center: [this.town.latitude, this.town.longitude],
        color: '#43a047',
        weight: 1,
        fill: false,
        dashArray: [10, 5]
      }
    }
  },

  mounted () {
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
          if (resp.data.features.length > 0) {
            setTimeout(() => {
              this.$root.$emit('fitMapOnGeoJsonBounds')
            }, 2000)
          }
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
