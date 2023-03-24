<template>
  <v-container>
    <h1 class="text-h5 mt-4 mb-4">
      {{ $t('components.ascentCragRoute.addedAscentToLogbook') }}
    </h1>

    <v-skeleton-loader
      v-if="loadingCragFromQuery"
      type="text"
    />

    <!-- Search crag -->
    <v-card
      v-if="!crag && !loadingCragFromQuery"
      elevation="0"
    >
      <v-card-title>
        <v-icon left>
          {{ mdiTerrain }}
        </v-icon>
        {{ $t('components.ascentCragRoute.whichCrag') }}
      </v-card-title>
      <v-card-text>
        <crag-search-form
          :callback="cragFromSearch"
          :used-callback="searchUsed"
          :linkable-result="false"
          :around-me-btn="true"
        />
        <div v-if="addCragBtn">
          <p class="text-right mt-3">
            <strong class="text--disabled">
              {{ $t('components.ascentCragRoute.cragNotFound') }}
            </strong><br>
            <v-btn
              :to="`/crags/new?redirect_to=${$route.fullPath}&name=${query}`"
              text
              small
            >
              <v-icon left>
                {{ mdiPlus }}
              </v-icon>
              {{ $t('actions.addCrag') }}
            </v-btn>
          </p>
        </div>
      </v-card-text>
    </v-card>

    <!-- Crag selected -->
    <div v-if="crag">
      <!-- Selected alert -->
      <v-alert
        text
        prominent
        type="success"
        class="mb-3"
      >
        <v-row align="center">
          <v-col class="grow">
            <u>{{ $t('components.crag.type') }} :</u><br>
            <strong>{{ crag.name }}</strong>, {{ crag.city }}, {{ crag.region }} ({{ crag.country }})
          </v-col>
          <v-col class="shrink">
            <v-btn
              icon
              large
              color="black"
              :title="$t('actions.changeCrag')"
              @click="resetCrag"
            >
              <v-icon>
                {{ mdiClose }}
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-alert>

      <!-- Select crag routes -->
      <div
        v-if="!cragRoute"
        ref="cragRouteList"
      >
        <crag-routes
          :crag="crag"
          :card-elevation="0"
          :crag-route-callback="selectCragRoute"
          :sector-selector-is-filter="true"
          :show-route-sort="false"
          title-translate-key="components.ascentCragRoute.whichRoute"
        >
          <template #add-btn>
            <v-btn
              :to="cragRouteRedirectUrl"
              outlined
              small
            >
              <v-icon left>
                {{ mdiSourceBranchPlus }}
              </v-icon>
              {{ $t('actions.addRoute') }}
            </v-btn>
          </template>
        </crag-routes>
      </div>

      <div v-if="cragRoute">
        <v-alert
          text
          prominent
          type="success"
          class="mb-2"
        >
          <v-row align="center">
            <v-col class="grow">
              <u>{{ $t('models.ascentCragRoute.crag_route_id') }} :</u><br>
              <strong>{{ cragRoute.name }}</strong>
              {{ cragRoute.grade_to_s }}
              {{ $t(`models.climbs.${cragRoute.climbing_type}`) }}
            </v-col>
            <v-col class="shrink">
              <v-btn
                icon
                large
                color="black"
                :title="$t('actions.changeRoute')"
                @click="resetCragRoute"
              >
                <v-icon>
                  {{ mdiClose }}
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-alert>

        <!-- Ascent form -->
        <v-sheet
          v-if="!successAdded"
          ref="ascentCragRouteForm"
          class="rounded pa-4 mt-3"
        >
          <p>
            <v-icon left>
              {{ mdiCheckAll }}
            </v-icon>
            {{ $t('components.ascentCragRoute.new', { name: cragRoute.name } ) }}
          </p>
          <ascent-crag-route-form
            v-if="cragRoute"
            submit-methode="post"
            :crag-route="cragRoute"
            :callback="ascentAdded"
          />
        </v-sheet>

        <div v-if="successAdded">
          <v-alert
            text
            prominent
            type="success"
            class="mb-4"
          >
            <strong>
              {{ $t('components.ascentCragRoute.successAdd', { name: cragRoute.name } ) }}
            </strong>
          </v-alert>
          <v-row justify="center">
            <v-col cols="12" md="6" lg="5">
              <v-btn
                outlined
                text
                block
                color="primary"
                class="mb-2"
                @click="resetCragRoute"
              >
                <v-icon left>
                  {{ mdiPlus }}
                </v-icon>
                {{ $t('components.ascentCragRoute.addNewAscent') }}
              </v-btn>
              <v-btn
                outlined
                text
                block
                color="primary"
                to="/home/ascents/outdoor"
                class="mb-2"
              >
                <v-icon left>
                  {{ mdiBookOutline }}
                </v-icon>
                {{ $t('components.ascentCragRoute.seeLogbook') }}
              </v-btn>
              <v-btn
                outlined
                text
                block
                color="primary"
                :to="crag.path"
              >
                <v-icon left>
                  {{ mdiTerrain }}
                </v-icon>
                {{ $t('components.ascentCragRoute.goToCrag') }} : {{ crag.name }}
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mdiTerrain, mdiPlus, mdiSourceBranchPlus, mdiMagnify, mdiCheckAll, mdiClose, mdiBookOutline } from '@mdi/js'
import CragSearchForm from '~/components/crags/forms/CragSearchForm.vue'
import CragApi from '~/services/oblyk-api/CragApi'
import Crag from '~/models/Crag'
import CragRouteApi from '~/services/oblyk-api/CragRouteApi'
import CragRoute from '~/models/CragRoute'
import AscentCragRouteForm from '~/components/ascentCragRoutes/forms/AscentCragRouteForm.vue'
import CragRoutes from '~/components/cragRoutes/CragRoutes.vue'

export default {
  meta: { orphanRoute: true },
  components: {
    CragRoutes,
    AscentCragRouteForm,
    CragSearchForm
  },

  data () {
    return {
      cragId: null,
      crag: null,
      loadingCragFromQuery: false,
      addCragBtn: false,
      addCragRouteBtn: false,
      successCrag: false,
      query: null,
      cragRouteName: null,
      cragRoutes: [],
      cragRoute: null,
      grade: null,
      loadingGrade: false,
      successAdded: false,

      mdiTerrain,
      mdiPlus,
      mdiMagnify,
      mdiSourceBranchPlus,
      mdiCheckAll,
      mdiClose,
      mdiBookOutline
    }
  },

  computed: {
    cragRouteRedirectUrl () {
      const routeParams = []
      if (this.cragRouteName) {
        routeParams.push(`name=${this.cragRouteName}`)
      }
      if (this.grade) {
        routeParams.push(`grade=${this.grade}`)
      }
      return `/crags/${this.crag.id}/${this.crag.slug_name}/routes/new?redirect_to=${this.$route.path}&added_from_ascent=true&${routeParams.join('&')}`
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.cragId = urlParams.get('crag_id')
    const cragRouteId = urlParams.get('crag_route_id')
    if (this.cragId) {
      this.getCrag()
    }
    if (cragRouteId) {
      this.getCragRoute(cragRouteId)
    }
    this.$root.$on('searchCragRoutesResults', (results) => {
      this.haveCragRoutesResults(results)
    })
  },

  beforeDestroy () {
    this.$root.$off('searchCragRoutesResults')
  },

  methods: {
    cragFromSearch (crag) {
      this.crag = crag
    },

    searchUsed (query) {
      this.addCragBtn = true
      this.query = query
    },

    resetCrag () {
      this.crag = null
      this.resetCragRoute()
    },

    resetCragRoute () {
      this.cragRoutes = []
      this.cragRoute = null
      this.successAdded = false
    },

    getCrag () {
      this.loadingCragFromQuery = true
      new CragApi(this.$axios, this.$auth)
        .find(this.cragId)
        .then((resp) => {
          this.crag = new Crag({ attributes: resp.data })
          setTimeout(() => {
            this.$refs.cragRouteList.$el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 500)
        })
        .finally(() => {
          this.loadingCragFromQuery = false
        })
    },

    getCragRoute (cragRouteId) {
      this.loadingCragRoute = true
      new CragRouteApi(this.$axios, this.$auth)
        .find(this.cragId, cragRouteId)
        .then((resp) => {
          this.cragRoute = new CragRoute({ attributes: resp.data })
          setTimeout(() => {
            this.$refs.ascentCragRouteForm.$el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 500)
        })
        .finally(() => {
          this.loadingCragRoute = false
        })
    },

    haveCragRoutesResults (results) {
      this.cragRoutes = results
      this.addCragRouteBtn = true
    },

    selectCragRoute (cragRoute) {
      this.getCragRoute(cragRoute.id)
      this.addCragRouteBtn = false
    },

    ascentAdded () {
      this.successAdded = true
    }
  }
}
</script>
